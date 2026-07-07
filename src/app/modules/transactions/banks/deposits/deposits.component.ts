import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent {
  items = [
    { id: 'A001', name: 'سجل تجريبي 1', description: 'تفاصيل إضافية هنا', status: 'نشط',   date: '2026-07-01' },
    { id: 'A002', name: 'سجل تجريبي 2', description: 'تفاصيل إضافية هنا', status: 'غير نشط', date: '2026-07-02' },
    { id: 'A003', name: 'سجل تجريبي 3', description: 'تفاصيل إضافية هنا', status: 'نشط',   date: '2026-07-03' }
  ];
}
