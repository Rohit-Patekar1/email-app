import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/service/http.service';
import { SnackbarService } from 'src/service/snackbar.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  transactionsData: any = [];
  pageCount: number = 1;
  totalPages: number = 1;
  showHtmlContent: boolean = false;
  htmlFilePath: string = '../../../assets/index.html';
  isLoading = false;
  constructor(
    private backendService: BackendService,
    private readonly router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading=true;
    this.backendService.fetchTransactions(0, 10).subscribe(
      (response: any) => {
        this.transactionsData = response.transactions;
        this.totalPages = Math.ceil(response.total / 10);
        console.log(this.totalPages);
        console.log(this.transactionsData);
        this.isLoading=false;
      },
      (error) => {
        this.isLoading=false;
        this.snackbarService.showSnackbar(error.error.message, 'error');
        console.error('Error:', error);
      }
    );
  }

  next() {
    if (this.pageCount !== this.totalPages) {
      this.pageCount++;
      this.fetchTransaction();
    }
  }

  previous() {
    if (this.pageCount !== 1) {
      this.pageCount--;
      this.fetchTransaction();
    }
  }

  fetchTransaction() {
    this.isLoading = true;
    this.backendService.fetchTransactions(this.pageCount * 10, 10).subscribe(
      (response: any) => {
        this.transactionsData = response.transactions;
        this.totalPages = Math.ceil(response.total / 10);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snackbarService.showSnackbar(error.error.message, 'error');
        console.error('Error:', error);
      }
    );
  }
  downloadCSV() {
    // Convert transactions data to CSV string
    const csvString = this.convertToCSV(this.transactionsData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'transactions.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  displayHtmlFile(): void {
    this.showHtmlContent = true;
  }

  convertToCSV(objArray: any[]): string {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    // This loop will extract the label from 1st index of on array
    for (let index in objArray[0]) {
      // Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1); // Remove the last comma
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
