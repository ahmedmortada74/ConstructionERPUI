import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // بطاقات الإحصائيات
  stats = [
    {
      label: 'المشاريع النشطة',
      value: '12',
      icon: '🏗️',
      trend: '+2',
      positive: true
    },
    {
      label: 'إجمالي الموردين',
      value: '45',
      icon: '🏭',
      trend: '+5',
      positive: true
    },
    {
      label: 'توريدات الشهر الحالي',
      value: '1,250',
      icon: '🚚',
      trend: '-50',
      positive: false
    },
    {
      label: 'معدات مؤجرة',
      value: '28',
      icon: '🚜',
      trend: '+4',
      positive: true
    }
  ];

  // آخر الحركات
  recentTransactions = [
    {
      id: 'TR-2026-001',
      type: 'توريد أسمنت',
      project: 'برج النيل',
      amount: '25,000 ج.م',
      date: '06/07/2026'
    },
    {
      id: 'TR-2026-002',
      type: 'توريد رمل',
      project: 'مول القاهرة',
      amount: '5,000 ج.م',
      date: '05/07/2026'
    },
    {
      id: 'TR-2026-003',
      type: 'تأجير حفار',
      project: 'مدينة الجيزة',
      amount: '12,000 ج.م',
      date: '05/07/2026'
    },
    {
      id: 'TR-2026-004',
      type: 'توريد زلط',
      project: 'كمبوند الياسمين',
      amount: '8,500 ج.م',
      date: '04/07/2026'
    }
  ];

  // أفضل المشاريع
  topProjects = [
    {
      name: 'برج النيل',
      profit: '450,000 ج.م',
      status: 'نشط'
    },
    {
      name: 'مول القاهرة',
      profit: '320,000 ج.م',
      status: 'نشط'
    },
    {
      name: 'كمبوند الياسمين',
      profit: '210,000 ج.م',
      status: 'نشط'
    },
    {
      name: 'مستشفى العاصمة',
      profit: '180,000 ج.م',
      status: 'قيد التنفيذ'
    },
    {
      name: 'الحي الإداري',
      profit: '160,000 ج.م',
      status: 'جديد'
    }
  ];

}