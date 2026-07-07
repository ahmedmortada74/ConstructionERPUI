import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent {
  items = [
    { id: 'A001', name: 'سجل تجريبي 1', description: 'تفاصيل إضافية هنا', status: 'نشط',   date: '2026-07-01' },
    { id: 'A002', name: 'سجل تجريبي 2', description: 'تفاصيل إضافية هنا', status: 'غير نشط', date: '2026-07-02' },
    { id: 'A003', name: 'سجل تجريبي 3', description: 'تفاصيل إضافية هنا', status: 'نشط',   date: '2026-07-03' }
  ];
}
