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
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  companyForm: FormGroup;

  items = [
    {
      id: 'C001',
      name: 'شركة المقاولات الحديثة',
      description: '111222333',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'C002',
      name: 'مؤسسة البناء العمراني',
      description: '444555666',
      status: 'غير نشط',
      date: '2026-07-02'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyCode: ['', Validators.required],
      taxNumber: [''],
      commercialRecord: [''],
      address: [''],
      contactEmail: [''],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.companyForm.patchValue({
        companyName: item.name,
        companyCode: item.id,
        taxNumber: item.description,
        isActive: item.status === 'نشط',
        commercialRecord: '',
        address: '',
        contactEmail: ''
      });
    } else {
      this.companyForm.reset({ isActive: true });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    const formValue = this.companyForm.value;
    const newItem = {
      id: formValue.companyCode,
      name: formValue.companyName,
      description: formValue.taxNumber || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات الشركة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة الشركة الجديدة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.companyForm.reset({ isActive: true });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'الشركة';
    
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
          text: 'تم حذف الشركة بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
