import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserFormValidators } from '../../validators/user-form-validators';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { NumbersOnlyDirective } from '../../../../shared/directive/numbers-only.directive';
import { UserService } from '../../service/user.service';
import { ApiResponse, ICreateUserResponseData } from '../../model/user.model';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  imports: [ReactiveFormsModule, DatePicker, NumbersOnlyDirective],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserForm {
  private fb = inject(NonNullableFormBuilder);
  userForm = this.fb.group(UserFormValidators);
  private alertService = inject(AlertService);
  private fileReader = new FileReader();
  private cdr = inject(ChangeDetectorRef);
  isSubmitted = signal<boolean>(false);
  private userService = inject(UserService);
  public isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.userService.startConnection();
  }

  occupations = signal<string[]>([
    'Developer',
    'System Analyst',
    'Project Manager',
    'QA Tester',
    'Designer',
  ]);

 onSave() {
    this.isSubmitted.set(true);

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const formData = this.userForm.getRawValue();
    
    this.userService.createUser(formData).subscribe({
      next: (res: ApiResponse<ICreateUserResponseData>) => {
        this.isLoading.set(false);

        if (res.success && res.data) {
          this.alertService.showSuccess(
            'Data saved successfully',
            `ID: ${res.data.id}`,
          );
          this.onClear();
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('เกิดข้อผิดพลาด:', err);
      }
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const maxSize = 2 * 1024 * 1024;

    if (!file) {
      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      this.alertService.showError(
        'Invalid File Type',
        'Please select a JPG, JPEG, PNG, or WEBP image.',
      );
      input.value = '';
      return;
    }

    if (file.size > maxSize) {
      this.alertService.showError(
        'File Too Large',
        'Please select a file smaller than 2 MB. Maximum size: 2 MB',
      );
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.userForm.patchValue({
        profile: reader.result as string,
        contentType: file.type
      });

      this.userForm.get('profile')?.markAsTouched();
      this.userForm.get('contentType')?.markAsTouched();
      
      this.cdr.detectChanges();
      input.value = '';
    };

    reader.onerror = (error) => {
      console.error('FileReader Error: ', error);
      input.value = '';
    };

    reader.readAsDataURL(file);
  }

  onClear(): void {
    this.userForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      profile: '',
      birthDay: '',
      occupation: '',
      sex: '',
    });
  }
}
