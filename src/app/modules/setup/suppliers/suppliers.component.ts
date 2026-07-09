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
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  supplierForm: FormGroup;

  items = [
    {
      id: 'S001',
      name: 'مورد مواد البناء الحديثة',
      description: 'مواد أساسية',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'S002',
      name: 'شركة المعدات الثقيلة',
      description: 'تأجير معدات',
      status: 'غير نشط',
      date: '2026-07-02'
    },
    {
      id: 'S003',
      name: 'مؤسسة السباكة والكهرباء',
      description: 'أعمال تشطيبات',
      status: 'نشط',
      date: '2026-07-03'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      supplierName: ['', Validators.required],
      supplierCode: ['', Validators.required],
      serviceType: ['', Validators.required],
      taxNumber: [''],
      isActive: [true, Validators.required],
      contactNumber: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
      email: [''],
      address: ['']
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.supplierForm.patchValue({
        supplierName: item.name,
        supplierCode: item.id,
        serviceType: item.description,
        isActive: item.status === 'نشط',
        contactNumber: '',
        taxNumber: '',
        email: '',
        address: ''
      });
    } else {
      this.supplierForm.reset({ isActive: true });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    const formValue = this.supplierForm.value;
    const newItem = {
      id: formValue.supplierCode,
      name: formValue.supplierName,
      description: formValue.serviceType || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات المورد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة المورد الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.supplierForm.reset({ isActive: true });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'المورد';
    
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
          text: 'تم حذف المورد بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
