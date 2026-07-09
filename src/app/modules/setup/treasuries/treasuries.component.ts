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
  selector: 'app-treasuries',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './treasuries.component.html',
  styleUrls: ['./treasuries.component.css']
})
export class TreasuriesComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  treasuryForm: FormGroup;

  items = [
    {
      id: 'T001',
      name: 'الخزينة الرئيسية',
      description: 'SAR',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'T002',
      name: 'خزينة مشروع أ',
      description: 'SAR',
      status: 'غير نشط',
      date: '2026-07-02'
    },
    {
      id: 'T003',
      name: 'صندوق المصروفات النثرية',
      description: 'SAR',
      status: 'نشط',
      date: '2026-07-03'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  currencyOptions = [
    { id: 'SAR', name: 'SAR' },
    { id: 'USD', name: 'USD' },
    { id: 'EUR', name: 'EUR' }
  ];

  constructor(private fb: FormBuilder) {
    this.treasuryForm = this.fb.group({
      treasuryName: ['', Validators.required],
      treasuryCode: ['', Validators.required],
      currency: ['SAR', Validators.required],
      balance: ['0', Validators.min(0)],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.treasuryForm.patchValue({
        treasuryName: item.name,
        treasuryCode: item.id,
        currency: item.description,
        isActive: item.status === 'نشط',
        balance: '0'
      });
    } else {
      this.treasuryForm.reset({ isActive: true, currency: 'SAR', balance: '0' });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.treasuryForm.invalid) {
      this.treasuryForm.markAllAsTouched();
      return;
    }

    const formValue = this.treasuryForm.value;
    const newItem = {
      id: formValue.treasuryCode,
      name: formValue.treasuryName,
      description: formValue.currency || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات الخزينة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة الخزينة الجديدة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.treasuryForm.reset({ isActive: true, currency: 'SAR', balance: '0' });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'الخزينة';
    
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
          text: 'تم حذف الخزينة بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
