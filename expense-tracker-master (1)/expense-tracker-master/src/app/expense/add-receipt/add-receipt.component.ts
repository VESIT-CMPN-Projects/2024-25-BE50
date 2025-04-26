import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css']
})
export class AddReceiptComponent {
  extractedReceipt: any = null;
  selectedFile: File | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private expenseService: ExpenseService) {}

  // Handle File Selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Upload Receipt & Extract Details
  uploadReceipt() {
    if (!this.selectedFile) {
      this.errorMessage = "Please select a receipt before uploading.";
      return;
    }

    this.isLoading = true; // Show loading indicator
    this.extractedReceipt = null; // Reset previous receipt data
    this.errorMessage = null; // Reset previous errors

    this.expenseService.uploadReceipt(this.selectedFile).subscribe(
      (response) => {
        this.isLoading = false;
        this.extractedReceipt = response;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = "Failed to extract receipt details. Please try again.";
        console.error('Error uploading file:', error);
      }
    );
  }
}
