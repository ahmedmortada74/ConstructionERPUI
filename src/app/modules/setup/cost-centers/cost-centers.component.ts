import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cost-centers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-centers.component.html',
  styleUrls: ['./cost-centers.component.css']
})
export class CostCentersComponent {
  items = [
    { id: 'A001', name: 'Sample Record 1', details: 'Additional info here', status: 'Active',   date: '2026-07-01' },
    { id: 'A002', name: 'Sample Record 2', details: 'Additional info here', status: 'Inactive', date: '2026-07-02' },
    { id: 'A003', name: 'Sample Record 3', details: 'Additional info here', status: 'Active',   date: '2026-07-03' }
  ];
}
