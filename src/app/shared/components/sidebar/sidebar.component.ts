import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  expanded?: boolean;
  children?: NavItem[];
}

export interface NavGroup {
  groupLabel?: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;

  navGroups: NavGroup[] = [
    {
      items: [
        { label: 'Dashboard', icon: '⊞', route: '/dashboard' }
      ]
    },
    {
      groupLabel: 'SETUP',
      items: [
        { label: 'Company Settings', icon: '🏢', route: '/setup/company' },
        { label: 'Projects', icon: '📁', route: '/setup/projects' },
        { label: 'Cost Centers', icon: '◎', route: '/setup/cost-centers' },
        { label: 'Materials & Units', icon: '📦', route: '/setup/materials' },
        { label: 'Equipment', icon: '🔧', route: '/setup/equipment' },
        { label: 'Banks', icon: '🏦', route: '/setup/banks' },
        { label: 'Treasuries', icon: '💰', route: '/setup/treasuries' },
        { label: 'General Settings', icon: '⚙', route: '/setup/settings' }
      ]
    },
    {
      groupLabel: 'PARTIES',
      items: [
        { label: 'Suppliers', icon: '🏭', route: '/setup/suppliers' },
        { label: 'Customers', icon: '👥', route: '/setup/customers' }
      ]
    },
    {
      groupLabel: 'TRANSACTIONS',
      items: [
        { label: 'Daily Supplies', icon: '🚚', route: '/transactions/supplies/daily-supplies' },
        { label: 'Monthly Statements', icon: '📄', route: '/transactions/supplies/monthly-statements' },
        { label: 'Equipment Rental', icon: '🚜', route: '/transactions/equipment-rental/rentals' },
        { label: 'Purchases', icon: '🛒', route: '/transactions/purchases/invoices' },
        { label: 'Sales', icon: '💳', route: '/transactions/sales/invoices' },
        { label: 'Treasury', icon: '🏧', route: '/transactions/treasury/vouchers' },
        { label: 'Bank Deposits', icon: '🏦', route: '/transactions/banks/deposits' },
        { label: 'Expenses', icon: '💸', route: '/transactions/expenses' },
        { label: 'Revenues', icon: '📈', route: '/transactions/revenues' }
      ]
    },
    {
      groupLabel: 'REPORTS',
      items: [
        { label: 'Supplier Statement', icon: '📋', route: '/reports/supplier-statement' },
        { label: 'Customer Statement', icon: '📋', route: '/reports/customer-statement' },
        { label: 'Financial Statements', icon: '📊', route: '/reports/financial' },
        { label: 'Project Profitability', icon: '📈', route: '/reports/profitability' }
      ]
    }
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubMenu(item: NavItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
