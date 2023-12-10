import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/service/http.service';
import { SnackbarService } from 'src/service/snackbar.service';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.css'],
})
export class SetupPageComponent implements OnInit {
  showTemplate2: boolean = false;
  emails: any[] = [];
  totalEmailSent:number=0;
  isLoading:boolean= true;

  constructor(
    private backendService: BackendService,
    private readonly router: Router,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.isLoading=true
    this.backendService.fetchTransactions(0, 10).subscribe(
      (response: any) => {
        this.totalEmailSent=response.total
       console.log(response);
       this.isLoading=false

      },
      (error) => {
        this.snackbarService.showSnackbar(error.error.message, 'error');
        console.error('Error:', error);
        this.isLoading=false
      }
    );
  }

  toggleDropdown(): void {
    this.showTemplate2 = !this.showTemplate2;
  }

  viewTemplate(): void {
    this.router.navigate(['/view-template']);
  }

  sendEmails() {
    if (this.emails.length!==0) {
      this.isLoading=true;
      this.backendService.sendEmail(this.emails).subscribe(
        (response: any) => {
          this.snackbarService.showSnackbar(
            'Emails sent successfully',
            'success'
          );
          this.isLoading=false;
        },
        (error) => {
          this.isLoading=false;
          this.snackbarService.showSnackbar(error.error.message, 'error');
          console.error('Error:', error.error.message);
        }
      );
      this.totalEmailSent=this.totalEmailSent+this.emails.length;
      this.emails = [];
    }
  }

  fetchTransaction() {
    this.router.navigate(['/transactions']);
  }

  onFileSelected(event: any): void {
    this.emails=[]
    const file: File = event.target.files[0];
    if (
      event.target.files[0].name.slice(
        event.target.files[0].name.lastIndexOf('.') + 1
      ) === 'csv'
    ) {
      if (file) {
        this.readFile(file);
      }
    } else {
      this.snackbarService.showSnackbar('Only CSV format supported', 'error');
    }
  }

  readFile(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const csvData: string = reader.result as string;
      this.parseCSV(csvData);
    };

    reader.readAsText(file);
  }

  parseCSV(csvData: string): void {
    const rows: string[] = csvData.split('\n');
    const headers: string[] = rows[0].split(',');

    for (let i = 1; i < rows.length; i++) {
      const values: string[] = rows[i].split(',');
      if (values.length === headers.length) {
        const obj: { [key: string]: string } = {};

        for (let j = 0; j < headers.length; j++) {
          const header = headers[j];
          const value = values[j].trim();

          obj[header] = value;
        }
        this.emails.push(obj);
      }
    }

    console.log(this.emails);
  }
}
