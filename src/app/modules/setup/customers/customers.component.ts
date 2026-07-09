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
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  customerForm: FormGroup;

  items = [
    {
      id: 'CUST-1001',
      name: 'شركة التطوير العقاري',
      description: '0551112222',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'CUST-1002',
      name: 'مؤسسة الإعمار الوطنية',
      description: '0553334444',
      status: 'نشط',
      date: '2026-07-02'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerCode: ['', Validators.required],
      contactNumber: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
      email: [''],
      address: [''],
      taxNumber: [''],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.customerForm.patchValue({
        customerName: item.name,
        customerCode: item.id,
        contactNumber: item.description,
        isActive: item.status === 'نشط',
        email: '',
        address: '',
        taxNumber: ''
      });
    } else {
      this.customerForm.reset({ isActive: true });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const formValue = this.customerForm.value;
    const newItem = {
      id: formValue.customerCode,
      name: formValue.customerName,
      description: formValue.contactNumber || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات العميل بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة العميل الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.customerForm.reset({ isActive: true });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'العميل';
    
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
          text: 'تم حذف العميل بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
