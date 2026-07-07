import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplies-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplies-comparison.component.html',
  styleUrls: ['./supplies-comparison.component.css']
})
export class SuppliesComparisonComponent {
  items = [
    { id: 'CMP-001', name: 'Sand - July vs June',    details: 'Monthly comparison report', status: 'Active', date: '2026-07-01' },
    { id: 'CMP-002', name: 'Cement - Q1 vs Q2',      details: 'Quarterly comparison',      status: 'Active', date: '2026-07-02' },
    { id: 'CMP-003', name: 'Gravel - Site A vs B',   details: 'Site-level comparison',     status: 'Active', date: '2026-07-03' }
  ];
}
