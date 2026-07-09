import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  // Setup Routes
  { path: 'setup/company', loadComponent: () => import('./modules/setup/company/company.component').then(m => m.CompanyComponent) },
  { path: 'setup/locations', loadComponent: () => import('./modules/setup/locations/locations.component').then(m => m.LocationsComponent) },
  { path: 'setup/cost-centers', loadComponent: () => import('./modules/setup/cost-centers/cost-centers.component').then(m => m.CostCentersComponent) },
  { path: 'setup/suppliers', loadComponent: () => import('./modules/setup/suppliers/suppliers.component').then(m => m.SuppliersComponent) },
  { path: 'setup/customers', loadComponent: () => import('./modules/setup/customers/customers.component').then(m => m.CustomersComponent) },
  { path: 'setup/materials', loadComponent: () => import('./modules/setup/materials/materials.component').then(m => m.MaterialsComponent) },
  { path: 'setup/equipment', loadComponent: () => import('./modules/setup/equipment/equipment.component').then(m => m.EquipmentComponent) },
  { path: 'setup/banks', loadComponent: () => import('./modules/setup/banks/banks.component').then(m => m.BanksComponent) },
  { path: 'setup/treasuries', loadComponent: () => import('./modules/setup/treasuries/treasuries.component').then(m => m.TreasuriesComponent) },
  { path: 'setup/settings', loadComponent: () => import('./modules/setup/settings/settings.component').then(m => m.SettingsComponent) },

  // Transactions Routes
  { path: 'transactions/supplies/daily-supplies', loadComponent: () => import('./modules/transactions/supplies/daily-supplies/daily-supplies.component').then(m => m.DailySuppliesComponent) },
  { path: 'transactions/supplies/monthly-statements', loadComponent: () => import('./modules/transactions/supplies/monthly-statements/monthly-statements.component').then(m => m.MonthlyStatementsComponent) },
  { path: 'transactions/equipment-rental/rentals', loadComponent: () => import('./modules/transactions/equipment-rental/rentals/rentals.component').then(m => m.RentalsComponent) },
  { path: 'transactions/purchases/invoices', loadComponent: () => import('./modules/transactions/purchases/invoices/invoices.component').then(m => m.InvoicesComponent) },
  { path: 'transactions/sales/invoices', loadComponent: () => import('./modules/transactions/sales/invoices/invoices.component').then(m => m.InvoicesComponent) },
  { path: 'transactions/treasury/vouchers', loadComponent: () => import('./modules/transactions/treasury/vouchers/vouchers.component').then(m => m.VouchersComponent) },
  { path: 'transactions/banks/deposits', loadComponent: () => import('./modules/transactions/banks/deposits/deposits.component').then(m => m.DepositsComponent) },
  { path: 'transactions/expenses', loadComponent: () => import('./modules/transactions/expenses/expenses.component').then(m => m.ExpensesComponent) },
  { path: 'transactions/revenues', loadComponent: () => import('./modules/transactions/revenues/revenues.component').then(m => m.RevenuesComponent) },

  // Reports Routes
  { path: 'reports/supplier-statement', loadComponent: () => import('./modules/reports/supplier-statement/supplier-statement.component').then(m => m.SupplierStatementComponent) },
  { path: 'reports/customer-statement', loadComponent: () => import('./modules/reports/customer-statement/customer-statement.component').then(m => m.CustomerStatementComponent) },
  { path: 'reports/financial', loadComponent: () => import('./modules/reports/financial/financial.component').then(m => m.FinancialComponent) },
  { path: 'reports/profitability', loadComponent: () => import('./modules/reports/profitability/profitability.component').then(m => m.ProfitabilityComponent) }
];
