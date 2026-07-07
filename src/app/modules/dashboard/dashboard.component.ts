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
  // Sample data for the dashboard
  stats = [
    { label: 'Active Projects', value: '12', icon: '🏗️', trend: '+2', positive: true },
    { label: 'Total Suppliers', value: '45', icon: '🏭', trend: '+5', positive: true },
    { label: 'Daily Supplies (Current Month)', value: '1,250', icon: '🚚', trend: '-50', positive: false },
    { label: 'Equipment Rentals', value: '28', icon: '🚜', trend: '+4', positive: true }
  ];

  recentTransactions = [
    { id: 'DS-2026-001', type: 'Sand Supply', project: 'Nile Tower', amount: '5,000 EGP', date: '2026-07-06' },
    { id: 'ER-2026-014', type: 'Excavator Rental', project: 'Cairo Mall', amount: '12,000 EGP', date: '2026-07-05' },
    { id: 'DS-2026-002', type: 'Cement Supply', project: 'Nile Tower', amount: '25,000 EGP', date: '2026-07-05' },
    { id: 'DS-2026-003', type: 'Gravel Supply', project: 'Giza Plaza', amount: '8,500 EGP', date: '2026-07-04' }
  ];

  topProjects = [
    { name: 'Nile Tower', profit: '450,000 EGP', status: 'نشط' },
    { name: 'Cairo Mall', profit: '320,000 EGP', status: 'نشط' },
    { name: 'Giza Plaza', profit: '210,000 EGP', status: 'نشط' }
  ];
}
