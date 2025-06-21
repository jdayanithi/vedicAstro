import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../../../service/payment.service';
import { AuthService } from '../../../service/auth.service';
import { Course } from '../../../service/course.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {
  purchaseForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<PurchaseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course }
  ) {    this.purchaseForm = this.fb.group({
      transactionId: ['', [Validators.required, Validators.minLength(5)]],
      paymentMethod: ['UPI', Validators.required],
      amount: [{ value: this.data.course.price || 0, disabled: true }, Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview URL for image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onSubmit(): void {
    if (this.purchaseForm.valid && this.selectedFile) {
      this.isSubmitting = true;
      
      const session = this.authService.getSession();
      const userId = session?.userId || session?.id || session?.loginId;
      
      if (!userId) {
        alert('Please login to continue with the purchase');
        this.dialogRef.close();
        return;
      }      const formData = new FormData();
      formData.append('loginId', userId.toString());
      formData.append('courseId', this.data.course.courseId.toString());
      formData.append('amount', (this.data.course.price || 0).toString());
      formData.append('paymentMethod', this.purchaseForm.get('paymentMethod')?.value);
      formData.append('transactionId', this.purchaseForm.get('transactionId')?.value);
      formData.append('comments', this.purchaseForm.get('comments')?.value || '');
      formData.append('paymentProof', this.selectedFile);

      this.paymentService.createPaymentWithProof(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.dialogRef.close({ success: true, payment: response });
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Payment submission failed:', error);
          alert('Failed to submit payment. Please try again.');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
