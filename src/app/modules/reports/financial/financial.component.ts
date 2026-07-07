import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent {
  items = [
    { id: 'A001', name: 'Sample Record 1', details: 'Additional info here', status: 'Active',   date: '2026-07-01' },
    { id: 'A002', name: 'Sample Record 2', details: 'Additional info here', status: 'Inactive', date: '2026-07-02' },
    { id: 'A003', name: 'Sample Record 3', details: 'Additional info here', status: 'Active',   date: '2026-07-03' }
  ];
}
