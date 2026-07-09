// sidebar.component.ts
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
        {
          label: 'لوحة التحكم',
          icon: 'bi bi-speedometer2',
          route: '/dashboard'
        }
      ]
    },
    {
      groupLabel: 'الإعدادات',
      items: [
        {
          label: 'بيانات الشركة',
          icon: 'bi bi-building',
          route: '/setup/company'
        },
        {
          label: 'المشروعات',
          icon: 'bi bi-kanban',
          route: '/setup/projects'
        },
        {
          label: 'مراكز التكلفة',
          icon: 'bi bi-diagram-3',
          route: '/setup/cost-centers'
        },
        {
          label: 'المواد',
          icon: 'bi bi-box-seam',
          route: '/setup/materials'
        },
        {
          label: 'المعدات',
          icon: 'bi bi-tools',
          route: '/setup/equipment'
        },
        {
          label: 'البنوك',
          icon: 'bi bi-bank',
          route: '/setup/banks'
        },
        {
          label: 'الخزائن',
          icon: 'bi bi-safe2',
          route: '/setup/treasuries'
        },
        {
          label: 'الإعدادات العامة',
          icon: 'bi bi-gear',
          route: '/setup/settings'
        }
      ]
    },
    {
      groupLabel: 'الأطراف',
      items: [
        {
          label: 'الموردون',
          icon: 'bi bi-truck',
          route: '/setup/suppliers'
        },
        {
          label: 'العملاء',
          icon: 'bi bi-people',
          route: '/setup/customers'
        }
      ]
    },
    {
      groupLabel: 'الحركات',
      items: [
        {
          label: 'التوريدات اليومية',
          icon: 'bi bi-box-arrow-in-down',
          route: '/transactions/supplies/daily-supplies'
        },
        {
          label: 'الكشوف الشهرية',
          icon: 'bi bi-file-earmark-text',
          route: '/transactions/supplies/monthly-statements'
        },
        {
          label: 'تأجير المعدات',
          icon: 'bi bi-truck-flatbed',
          route: '/transactions/equipment-rental/rentals'
        },
        {
          label: 'المشتريات',
          icon: 'bi bi-cart-check',
          route: '/transactions/purchases/invoices'
        },
        {
          label: 'المبيعات',
          icon: 'bi bi-receipt',
          route: '/transactions/sales/invoices'
        },
        {
          label: 'الخزينة',
          icon: 'bi bi-cash-stack',
          route: '/transactions/treasury/vouchers'
        },
        {
          label: 'إيداعات البنوك',
          icon: 'bi bi-piggy-bank',
          route: '/transactions/banks/deposits'
        },
        {
          label: 'المصروفات',
          icon: 'bi bi-wallet2',
          route: '/transactions/expenses'
        },
        {
          label: 'الإيرادات',
          icon: 'bi bi-graph-up-arrow',
          route: '/transactions/revenues'
        }
      ]
    },
    {
      groupLabel: 'التقارير',
      items: [
        {
          label: 'كشف حساب المورد',
          icon: 'bi bi-file-earmark-person',
          route: '/reports/supplier-statement'
        },
        {
          label: 'كشف حساب العميل',
          icon: 'bi bi-file-earmark-person',
          route: '/reports/customer-statement'
        },
        {
          label: 'التقارير المالية',
          icon: 'bi bi-file-earmark-bar-graph',
          route: '/reports/financial'
        },
        {
          label: 'ربحية المشروعات',
          icon: 'bi bi-bar-chart-line',
          route: '/reports/profitability'
        }
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