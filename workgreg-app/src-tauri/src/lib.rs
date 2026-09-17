use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::{CommandChild, CommandEvent};
use tauri::Manager;
use std::sync::Mutex;

struct SidecarState(Mutex<Option<CommandChild>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(SidecarState(Mutex::new(None)))
        .setup(|app| {
            let handle = app.handle().clone();

            let sidecar_command = handle.shell().sidecar("workgreg-api");

            match sidecar_command {
                Ok(cmd) => {
                    let (mut rx, child) = cmd
                        .args(["--port", "8000"])
                        .spawn()
                        .expect("Failed to spawn Python sidecar process");

                    let state = app.state::<SidecarState>();
                    *state.0.lock().unwrap() = Some(child);

                    tauri::async_runtime::spawn(async move {
                        while let Some(event) = rx.recv().await {
                            match event {
                                CommandEvent::Stdout(line) => {
                                    println!("[PYTHON STDOUT] {}", String::from_utf8_lossy(&line));
                                }
                                CommandEvent::Stderr(line) => {
                                    eprintln!("[PYTHON STDERR] {}", String::from_utf8_lossy(&line));
                                }
                                _ => {}
                            }
                        }
                    });
                }
                Err(err) => eprintln!("Failed to initialize sidecar command: {:?}", err),
            }

            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::Destroyed = event {
                let state = window.state::<SidecarState>();
                
                // Explicitly acquire and release the lock in a single statement
                let child_option = {
                    let mut lock = state.0.lock().unwrap();
                    lock.take()
                };

                // Kill child process after the lock is safely released
                if let Some(child) = child_option {
                    let _ = child.kill();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}