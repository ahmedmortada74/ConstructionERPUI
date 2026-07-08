import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent {

  dialogVisible = false;

  bankForm: FormGroup;

  items = [
    {
      id: 'A001',
      name: 'البنك الأهلي المصري',
      description: 'الفرع الرئيسي',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'A002',
      name: 'بنك مصر',
      description: 'فرع القاهرة',
      status: 'غير نشط',
      date: '2026-07-02'
    },
    {
      id: 'A003',
      name: 'البنك التجاري الدولي',
      description: 'فرع الجيزة',
      status: 'نشط',
      date: '2026-07-03'
    }
  ];

  currencyOptions = [
    {
      id: 'EGP',
      name: 'EGP'
    },
    {
      id: 'USD',
      name: 'USD'
    },
    {
      id: 'EUR',
      name: 'EUR'
    }
  ];

  statusOptions = [
    {
      id: true,
      name: 'Active'
    },
    {
      id: false,
      name: 'Inactive'
    }
  ];

  constructor(private fb: FormBuilder) {

    this.bankForm = this.fb.group({

      bankName: [
        '',
        Validators.required
      ],

      bankCode: [
        '',
        Validators.required
      ],

      accountNumber: [
        '',
        Validators.required
      ],

      accountHolder: [
        '',
        Validators.required
      ],

      currency: [
        '',
        Validators.required
      ],

      isActive: [
        true,
        Validators.required
      ],

      contactNumber: [
        '',
        [
          Validators.pattern(/^[0-9+\-\s()]{7,20}$/)
        ]
      ],

      bankAddress: [
        ''
      ]

    });

  }

  // فتح النافذة
  openBankDialog(): void {

    this.bankForm.reset({
      isActive: true
    });

    this.dialogVisible = true;

  }

  // إغلاق النافذة
  send(close: boolean): void {

    this.dialogVisible = false;

  }

  // حفظ البيانات
  onSave(): void {

    if (this.bankForm.invalid) {

      this.bankForm.markAllAsTouched();
      return;

    }

    const formValue = this.bankForm.value;

    this.items.push({

      id: formValue.bankCode,

      name: formValue.bankName,

      description: formValue.bankAddress || '',

      status: formValue.isActive ? 'نشط' : 'غير نشط',

      date: new Date().toISOString().substring(0, 10)

    });

    console.log('Saved Bank', formValue);

    this.dialogVisible = false;

    this.bankForm.reset({
      isActive: true
    });

  }

}