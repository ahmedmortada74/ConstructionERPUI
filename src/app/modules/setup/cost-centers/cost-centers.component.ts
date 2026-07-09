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
  selector: 'app-cost-centers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cost-centers.component.html',
  styleUrls: ['./cost-centers.component.css']
})
export class CostCentersComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  centerForm: FormGroup;

  items = [
    {
      id: 'CC-100',
      name: 'الإدارة العامة',
      description: 'إدارة عليا',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'CC-200',
      name: 'قطاع المشاريع',
      description: 'مشاريع',
      status: 'نشط',
      date: '2026-07-02'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  typeOptions = [
    { id: 'رئيسي', name: 'رئيسي' },
    { id: 'فرعي', name: 'فرعي' }
  ];

  constructor(private fb: FormBuilder) {
    this.centerForm = this.fb.group({
      centerName: ['', Validators.required],
      centerCode: ['', Validators.required],
      centerType: ['رئيسي', Validators.required],
      parentCenter: [''],
      budget: ['0'],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.centerForm.patchValue({
        centerName: item.name,
        centerCode: item.id,
        centerType: item.description,
        isActive: item.status === 'نشط',
        parentCenter: '',
        budget: '0'
      });
    } else {
      this.centerForm.reset({ isActive: true, centerType: 'رئيسي', budget: '0' });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.centerForm.invalid) {
      this.centerForm.markAllAsTouched();
      return;
    }

    const formValue = this.centerForm.value;
    const newItem = {
      id: formValue.centerCode,
      name: formValue.centerName,
      description: formValue.centerType || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث مركز التكلفة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة مركز التكلفة الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.centerForm.reset({ isActive: true, centerType: 'رئيسي', budget: '0' });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'مركز التكلفة';
    
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
          text: 'تم حذف المركز بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
