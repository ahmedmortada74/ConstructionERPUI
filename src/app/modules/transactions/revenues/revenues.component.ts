import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.css']
})
export class RevenuesComponent {
  items = [
    { id: 'A001', name: 'Sample Record 1', details: 'Additional info here', status: 'Active',   date: '2026-07-01' },
    { id: 'A002', name: 'Sample Record 2', details: 'Additional info here', status: 'Inactive', date: '2026-07-02' },
    { id: 'A003', name: 'Sample Record 3', details: 'Additional info here', status: 'Active',   date: '2026-07-03' }
  ];
}
