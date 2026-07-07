import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations.component.html',

})
export class LocationsComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  items = [
    { id: 'LOC-001', name: 'Main Site - Cairo',      description: 'Downtown Cairo branch',     status: 'نشط',   date: '2026-01-01' },
    { id: 'LOC-002', name: 'Site B - Giza',           description: 'Giza Plateau project',      status: 'نشط',   date: '2026-02-10' },
    { id: 'LOC-003', name: 'Warehouse - Alexandria',  description: 'Northern storage facility', status: 'غير نشط', date: '2026-03-15' }
  ];
}
