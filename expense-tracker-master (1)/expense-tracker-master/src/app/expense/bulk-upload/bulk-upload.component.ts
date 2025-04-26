import { Component } from '@angular/core';
import { BulkUploadService } from '../bulk-upload.service';
import { ExpenseService } from '../expense.service';
import { CookieService } from 'ngx-cookie-service';
import { Expense } from 'src/app/shared/models/expense';
import { Observable, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css'],
})
export class BulkUploadComponent {
  constructor(
    private bulkUploadService: BulkUploadService,
    private expenseService: ExpenseService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  // Variable to hold imported data from CSV
  importedData: any;

  // Array to hold simple expense data for CSV template
  public arrayWithSimpleData: Array<Expense> = [
    {
      categoryNameID: '',
      expenseAmount: undefined,
      expenseDate: '',
      expenseDescription: '',
      expenseName: '',
      tags: '',
    },
  ];

  // Variable to hold the uploaded file
  file: File | any;

  // Function to get text from the uploaded file
  private async getTextFromFile(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    let fileContent = await this.file.text();
    console.warn('File content', fileContent);
    return fileContent;
  }

  // Function to import data from CSV file
  public async importDataFromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);
    this.importedData = this.bulkUploadService.importDataFromCSV(fileContent);
    console.log(this.importedData);
  }

  // Function to download CSV template
  downloadCSVTemplate() {
    this.saveDataInCSV('expenses_template', this.arrayWithSimpleData);
  }

  // Function to add expenses into table
  addExpensesIntoTable() {
    console.log(this.importedData + "Imported")
    this.addExpenses(this.importedData).subscribe(
      (responses) => {
        console.log('All expenses added successfully:', responses);
        this.router.navigate(['/success']);
      },
      (error) => {
        console.error('Error adding expenses:', error);
      }
    );
  }

  // Function to save data as CSV file
  public saveDataInCSV(name: string, data: any): void {
    let csvContent = this.bulkUploadService.saveDataInCSV(data);
    console.log(csvContent);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }

  // Function to preview CSV data
  previewCSV() {
    const reader = new FileReader();
    const preview = document.getElementById('preview');
    const warnMessage = document.getElementById('warnMessage');
    if (!this.file) {
      if (warnMessage) warnMessage.innerHTML = 'Please Upload a file first';
    }
    reader.onload = () => {
      const text = reader.result as string;
      const rows = text.split('\n');
      const table = document.createElement('table');

      rows.forEach((rowText) => {
        const columns = rowText.split(',');
        const tr = document.createElement('tr');
        columns.forEach((columnText) => {
          const td = document.createElement('td');
          td.textContent = columnText;
          tr.appendChild(td);
        });

        // Append the row to the table
        table.appendChild(tr);
      });

      if (preview) {
        preview.innerHTML = '';

        // Append the table to the preview div
        preview.appendChild(table);
      }
    };

    reader.readAsText(this.file);
  }

  // Function to add expenses to the database
  addExpenses(expenseData: any): Observable<any> {
    const observables = [];

    for (let index = 1; index < expenseData.length - 1; index++) {
      console.log('I am inside for loop ');
      const expense = expenseData[index];
      expense.userId = this.cookieService.get('userId');
      console.log(expense);
      const addExpenseObservable = this.expenseService.addExpense(expense);
      observables.push(addExpenseObservable);
    }

    return forkJoin(observables); // Wait for all observables to complete
  }
}
