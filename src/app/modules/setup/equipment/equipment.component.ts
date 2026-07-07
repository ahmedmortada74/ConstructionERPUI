import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  items = [
    { id: 'A001', name: 'Sample Record 1', description: 'Additional info here', status: 'Active',   date: '2026-07-01' },
    { id: 'A002', name: 'Sample Record 2', description: 'Additional info here', status: 'Inactive', date: '2026-07-02' },
    { id: 'A003', name: 'Sample Record 3', description: 'Additional info here', status: 'Active',   date: '2026-07-03' }
  ];
}
