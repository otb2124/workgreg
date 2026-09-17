import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthStatus, Vacancy, VacancyService } from '../../services/vacancy.service';

@Component({
  selector: 'app-vacancy-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacancy.component.html'
})
export class VacancyComponent implements OnInit {
  status = 'Connecting...';
  mode = '';
  vacancies: any[] = [];

  constructor(
    private readonly vacancyService: VacancyService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.vacancyService.getHealth().subscribe({
      next: (res: HealthStatus) => {
        this.status = res.status;
        this.mode = res.mode;
        this.cdr.detectChanges();
      },
      error: () => {
        this.status = 'Disconnected';
        this.cdr.detectChanges();
      }
    });

    this.vacancyService.getVacancies().subscribe({
      next: (data: any[]) => {
        this.vacancies = data;
        this.cdr.detectChanges();
      }
    });
  }
}