import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-statement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-statement.component.html',
  styleUrls: ['./supplier-statement.component.css']
})
export class SupplierStatementComponent {
  items = [
    { id: 'A001', name: 'Sample Record 1', description: 'Additional info here', status: 'Active',   date: '2026-07-01' },
    { id: 'A002', name: 'Sample Record 2', description: 'Additional info here', status: 'Inactive', date: '2026-07-02' },
    { id: 'A003', name: 'Sample Record 3', description: 'Additional info here', status: 'Active',   date: '2026-07-03' }
  ];
}
