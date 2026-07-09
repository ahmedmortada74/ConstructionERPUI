// banks.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import Swal from 'sweetalert2';

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
  editMode = false;
  editIndex: number | null = null;

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
    { id: 'EGP', name: 'EGP' },
    { id: 'USD', name: 'USD' },
    { id: 'EUR', name: 'EUR' }
  ];

  statusOptions = [
    { id: true, name: 'Active' },
    { id: false, name: 'Inactive' }
  ];

  constructor(private fb: FormBuilder) {
    this.bankForm = this.fb.group({
      bankName: ['', Validators.required],
      bankCode: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountHolder: ['', Validators.required],
      currency: ['', Validators.required],
      isActive: [true, Validators.required],
      contactNumber: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
      bankAddress: [''],
      branchCode: [''],
      currentBalance: [''],
      lastTransaction: [''],
      pendingAmount: [''],
      openingDate: [''],
      lastReviewDate: [''],
      nextReviewDate: ['']
    });
  }

  openBankDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.bankForm.patchValue({
        bankName: item.name,
        bankCode: item.id,
        accountHolder: '',
        accountNumber: '',
        currency: '',
        isActive: item.status === 'نشط',
        bankAddress: item.description,
        contactNumber: ''
      });
    } else {
      this.bankForm.reset({ isActive: true });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.bankForm.invalid) {
      this.bankForm.markAllAsTouched();
      return;
    }

    const formValue = this.bankForm.value;
    const newItem = {
      id: formValue.bankCode,
      name: formValue.bankName,
      description: formValue.bankAddress || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      // Show success message for edit
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات البنك بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      // Show success message for add
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة البنك الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    console.log('Saved Bank', formValue);
    this.dialogVisible = false;
    this.bankForm.reset({ isActive: true });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'البنك';
    
    Swal.fire({
      title: 'هل أنت متأكد؟',
      html: `هل تريد حذف <strong>${itemName}</strong>؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#718096',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-action-primary',
        cancelButton: 'btn-action-outline'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.items.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'تم الحذف!',
          text: 'تم حذف البنك بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}