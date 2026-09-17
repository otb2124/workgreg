import argparse
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "mode": "sidecar" if "--port" in sys.argv else "cloud"}

@app.get("/api/vacancies")
def get_vacancies():
    return [
        {"id": 1, "title": "Angular Developer", "source": "LinkedIn", "location": "Remote"},
        {"id": 2, "title": "Python Engineer", "source": "Indeed", "location": "Hybrid"}
    ]

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000, help="Port to run server on")
    args = parser.parse_args()

    uvicorn.run(app, host="127.0.0.1", port=args.port, log_level="info")