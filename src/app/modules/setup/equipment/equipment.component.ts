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
  selector: 'app-equipment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  equipmentForm: FormGroup;

  items = [
    {
      id: 'E001',
      name: 'حفار كاتربيلر',
      description: 'معدات ثقيلة',
      status: 'نشط',
      date: '2026-07-01'
    },
    {
      id: 'E002',
      name: 'رافعة شوكية تويوتا',
      description: 'معدات خفيفة',
      status: 'غير نشط',
      date: '2026-07-02'
    },
    {
      id: 'E003',
      name: 'شاحنة نقل مرسيدس',
      description: 'مركبات',
      status: 'نشط',
      date: '2026-07-03'
    }
  ];

  statusOptions = [
    { id: true, name: 'متاح للعمل' },
    { id: false, name: 'في الصيانة' }
  ];

  typeOptions = [
    { id: 'معدات ثقيلة', name: 'معدات ثقيلة' },
    { id: 'معدات خفيفة', name: 'معدات خفيفة' },
    { id: 'مركبات', name: 'مركبات' }
  ];

  constructor(private fb: FormBuilder) {
    this.equipmentForm = this.fb.group({
      equipmentName: ['', Validators.required],
      equipmentCode: ['', Validators.required],
      equipmentType: ['', Validators.required],
      model: [''],
      serialNumber: [''],
      isActive: [true, Validators.required]
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.equipmentForm.patchValue({
        equipmentName: item.name,
        equipmentCode: item.id,
        equipmentType: item.description,
        isActive: item.status === 'نشط',
        model: '',
        serialNumber: ''
      });
    } else {
      this.equipmentForm.reset({ isActive: true });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.equipmentForm.invalid) {
      this.equipmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.equipmentForm.value;
    const newItem = {
      id: formValue.equipmentCode,
      name: formValue.equipmentName,
      description: formValue.equipmentType || '',
      status: formValue.isActive ? 'نشط' : 'غير نشط',
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات المعدة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة المعدة الجديدة بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.equipmentForm.reset({ isActive: true });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'المعدة';
    
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
          text: 'تم حذف المعدة بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
