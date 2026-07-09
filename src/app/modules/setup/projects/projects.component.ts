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
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  dialogVisible = false;
  editMode = false;
  editIndex: number | null = null;

  projectForm: FormGroup;

  items = [
    {
      id: 'P-500',
      name: 'إنشاء مجمع تجاري',
      description: 'م. أحمد سعيد',
      status: 'تحت الإنشاء',
      date: '2026-07-01'
    },
    {
      id: 'P-501',
      name: 'صيانة طرق عامة',
      description: 'م. خالد عبدالله',
      status: 'مكتمل',
      date: '2026-07-02'
    }
  ];

  statusOptions = [
    { id: 'تحت الإنشاء', name: 'تحت الإنشاء' },
    { id: 'مكتمل', name: 'مكتمل' },
    { id: 'معلق', name: 'معلق' },
    { id: 'ملغى', name: 'ملغى' }
  ];

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectCode: ['', Validators.required],
      manager: [''],
      status: ['تحت الإنشاء', Validators.required],
      budget: ['0'],
      startDate: [''],
      endDate: ['']
    });
  }

  openDialog(item?: any): void {
    this.editMode = !!item;
    this.editIndex = item ? this.items.indexOf(item) : null;

    if (item) {
      this.projectForm.patchValue({
        projectName: item.name,
        projectCode: item.id,
        manager: item.description,
        status: item.status,
        budget: '0',
        startDate: '',
        endDate: ''
      });
    } else {
      this.projectForm.reset({ status: 'تحت الإنشاء', budget: '0' });
    }

    this.dialogVisible = true;
  }

  send(close: boolean): void {
    this.dialogVisible = false;
  }

  onSave(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formValue = this.projectForm.value;
    const newItem = {
      id: formValue.projectCode,
      name: formValue.projectName,
      description: formValue.manager || '',
      status: formValue.status,
      date: new Date().toISOString().substring(0, 10)
    };

    if (this.editMode && this.editIndex !== null) {
      this.items[this.editIndex] = newItem;
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تحديث بيانات المشروع بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    } else {
      this.items.push(newItem);
      Swal.fire({
        icon: 'success',
        title: 'تم الإضافة!',
        text: 'تم إضافة المشروع الجديد بنجاح.',
        confirmButtonColor: '#1e74fd',
        confirmButtonText: 'حسناً'
      });
    }

    this.dialogVisible = false;
    this.projectForm.reset({ status: 'تحت الإنشاء', budget: '0' });
    this.editMode = false;
    this.editIndex = null;
  }

  deleteItem(index: number): void {
    const itemName = this.items[index]?.name || 'المشروع';
    
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
          text: 'تم حذف المشروع بنجاح.',
          confirmButtonColor: '#1e74fd',
          confirmButtonText: 'حسناً',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}
