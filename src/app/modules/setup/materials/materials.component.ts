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
  selector: 'app-materials',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  materialForm: FormGroup;

  items = [
    {
      id: 'M-101',
      name: 'اسمنت بورتلاندي',
      description: 'مواد أساسية',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'M-102',
      name: 'حديد تسليح 14مم',
      description: 'مواد أساسية',
      status: 'نشط',
      date: '2026-07-02'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  unitOptions = [
    { id: 'قطعة', name: 'قطعة' },
    { id: 'طن', name: 'طن' },
    { id: 'متر', name: 'متر' },
    { id: 'لتر', name: 'لتر' },
    { id: 'كجم', name: 'كيلوجرام' }
  ];

  constructor(private fb: FormBuilder) {
    this.materialForm = this.fb.group({
      materialName: ['', Validators.required],
      materialCode: ['', Validators.required],
      category: [''],
      unit: ['', Validators.required],
      unitPrice: ['0'],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.materialForm.patchValue({
        materialName: item.name,
        materialCode: item.id,
        category: item.description,
        isActive: item.status === 'نشط',
        unit: '',
        unitPrice: '0'
      });
    } else {
      this.materialForm.reset({ isActive: true, unit: 'قطعة', unitPrice: '0' });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.materialForm.invalid) {
      this.materialForm.markAllAsTouched();
      return;
    }

    const formValue = this.materialForm.value;
    const newItem = {
      id: formValue.materialCode,
      name: formValue.materialName,
      description: formValue.category || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات المادة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة المادة الجديدة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.materialForm.reset({ isActive: true, unit: 'قطعة', unitPrice: '0' });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'المادة';
    
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
          text: 'تم حذف المادة بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
