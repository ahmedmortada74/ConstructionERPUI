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
    { id: 'A001', name: 'سجل تجريبي 1', description: 'تفاصيل إضافية هنا', status: 'نشط',   date: '2026-07-01' },
    { id: 'A002', name: 'سجل تجريبي 2', description: 'تفاصيل إضافية هنا', status: 'غير نشط', date: '2026-07-02' },
    { id: 'A003', name: 'سجل تجريبي 3', description: 'تفاصيل إضافية هنا', status: 'نشط',   date: '2026-07-03' }
  ];
}
