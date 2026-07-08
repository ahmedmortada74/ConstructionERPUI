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
          icon: '⌂',
          route: '/dashboard'
        }
      ]
    },

    {
      groupLabel: 'الإعدادات',
      items: [
        {
          label: 'بيانات الشركة',
          icon: '□',
          route: '/setup/company'
        },
        {
          label: 'المشروعات',
          icon: '▣',
          route: '/setup/projects'
        },
        {
          label: 'مراكز التكلفة',
          icon: '◈',
          route: '/setup/cost-centers'
        },
        {
          label: 'المواد ووحدات القياس',
          icon: '◩',
          route: '/setup/materials'
        },
        {
          label: 'المعدات',
          icon: '⌘',
          route: '/setup/equipment'
        },
        {
          label: 'البنوك',
          icon: '◫',
          route: '/setup/banks'
        },
        {
          label: 'الخزائن',
          icon: '◉',
          route: '/setup/treasuries'
        },
        {
          label: 'الإعدادات العامة',
          icon: '⚙',
          route: '/setup/settings'
        }
      ]
    },

    {
      groupLabel: 'الأطراف',
      items: [
        {
          label: 'الموردون',
          icon: '◌',
          route: '/setup/suppliers'
        },
        {
          label: 'العملاء',
          icon: '◎',
          route: '/setup/customers'
        }
      ]
    },

    {
      groupLabel: 'الحركات',
      items: [
        {
          label: 'توريدات يومية',
          icon: '→',
          route: '/transactions/supplies/daily-supplies'
        },
        {
          label: 'الكشوف الشهرية',
          icon: '≣',
          route: '/transactions/supplies/monthly-statements'
        },
        {
          label: 'تأجير المعدات',
          icon: '⌗',
          route: '/transactions/equipment-rental/rentals'
        },
        {
          label: 'المشتريات',
          icon: '+',
          route: '/transactions/purchases/invoices'
        },
        {
          label: 'المبيعات',
          icon: '−',
          route: '/transactions/sales/invoices'
        },
        {
          label: 'الخزينة',
          icon: '◍',
          route: '/transactions/treasury/vouchers'
        },
        {
          label: 'إيداعات البنوك',
          icon: '◫',
          route: '/transactions/banks/deposits'
        },
        {
          label: 'المصروفات',
          icon: '↘',
          route: '/transactions/expenses'
        },
        {
          label: 'الإيرادات',
          icon: '↗',
          route: '/transactions/revenues'
        }
      ]
    },

    {
      groupLabel: 'التقارير',
      items: [
        {
          label: 'كشف حساب المورد',
          icon: '☰',
          route: '/reports/supplier-statement'
        },
        {
          label: 'كشف حساب العميل',
          icon: '☰',
          route: '/reports/customer-statement'
        },
        {
          label: 'التقارير المالية',
          icon: '◬',
          route: '/reports/financial'
        },
        {
          label: 'ربحية المشروعات',
          icon: '△',
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