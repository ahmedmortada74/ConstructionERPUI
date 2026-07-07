import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-statement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-statement.component.html',
  styleUrls: ['./customer-statement.component.css']
})
export class CustomerStatementComponent {
  items = [
    { id: 'A001', name: 'Sample Record 1', details: 'Additional info here', status: 'Active',   date: '2026-07-01' },
    { id: 'A002', name: 'Sample Record 2', details: 'Additional info here', status: 'Inactive', date: '2026-07-02' },
    { id: 'A003', name: 'Sample Record 3', details: 'Additional info here', status: 'Active',   date: '2026-07-03' }
  ];
}
