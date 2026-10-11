import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, Optional, Self } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  imports: [FormsModule],
  selector: 'app-date-picker',
  styleUrl: './date-picker.css',
  templateUrl: './date-picker.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePicker implements ControlValueAccessor {
  label = input<string>('วันเดือนปีเกิด');
  required = input<boolean>(false);
  errorMessage = input<string>('กรุณาระบุข้อมูลให้ถูกต้อง');
  submitted = input<boolean>(false);
  value: string = '';
  isDisabled: boolean = false;
  private cdr = inject(ChangeDetectorRef);
 
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  get isInvalid(): boolean {
    const control = this.ngControl?.control;
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty || this.submitted());
  }

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get formattedDate(): string {
    if (!this.value) return '';
    const date = new Date(this.value);
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const val = inputElement.value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
    this.cdr.detectChanges();
  }

  onBlur(): void {
    this.onTouched();
    this.cdr.detectChanges();
  }

  writeValue(value: any): void {
    this.value = value ? value : '';
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
