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
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  locationForm: FormGroup;

  items = [
    {
      id: 'LOC-001',
      name: 'موقع الرياض الرئيسي',
      description: 'م. أحمد سعيد',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'LOC-002',
      name: 'موقع الدمام الفرعي',
      description: 'م. خالد عبدالله',
      status: 'نشط',
      date: '2026-07-02'
    }
  ];

  statusOptions = [
    { id: true, name: 'نشط' },
    { id: false, name: 'غير نشط' }
  ];

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      locationName: ['', Validators.required],
      locationCode: ['', Validators.required],
      manager: [''],
      address: [''],
      area: [''],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.locationForm.patchValue({
        locationName: item.name,
        locationCode: item.id,
        manager: item.description,
        isActive: item.status === 'نشط',
        address: '',
        area: ''
      });
    } else {
      this.locationForm.reset({ isActive: true });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    }

    const formValue = this.locationForm.value;
    const newItem = {
      id: formValue.locationCode,
      name: formValue.locationName,
      description: formValue.manager || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات الموقع بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة الموقع الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.locationForm.reset({ isActive: true });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'الموقع';
    
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
          text: 'تم حذف الموقع بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}