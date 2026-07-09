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
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  settingForm: FormGroup;

  items = [
    {
      id: 'TAX_RATE',
      name: '15',
      description: 'نسبة ضريبة القيمة المضافة',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'DEFAULT_CURRENCY',
      name: 'SAR',
      description: 'العملة الافتراضية',
      status: 'نشط',
      date: '2026-07-02'
    },
    {
      id: 'SESSION_TIMEOUT',
      name: '30',
      description: 'مدة الجلسة بالدقائق',
      status: 'نشط',
      date: '2026-07-03'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  categoryOptions = [
    { id: 'عام', name: 'عام' },
    { id: 'مالي', name: 'مالي' },
    { id: 'نظام', name: 'نظام' }
  ];

  constructor(private fb: FormBuilder) {
    this.settingForm = this.fb.group({
      settingKey: ['', Validators.required],
      settingValue: ['', Validators.required],
      description: [''],
      category: ['عام', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.settingForm.patchValue({
        settingKey: item.id,
        settingValue: item.name,
        description: item.description,
        category: 'عام',
        isActive: item.status === 'نشط'
      });
      this.settingForm.get('settingKey')?.disable();
    } else {
      this.settingForm.enable();
      this.settingForm.reset({ isActive: true, category: 'عام' });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.settingForm.invalid) {
      this.settingForm.markAllAsTouched();
      return;
    }

    const formValue = this.settingForm.getRawValue();
    const newItem = {
      id: formValue.settingKey,
      name: formValue.settingValue,
      description: formValue.description || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث الإعداد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة الإعداد الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.settingForm.reset({ isActive: true, category: 'عام' });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.id || 'الإعداد';
    
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
          text: 'تم حذف الإعداد بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
