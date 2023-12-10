import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  // Update with your backend URL
  constructor(private http: HttpClient) {}

  registerUser(username: String, amount: Number) {
    return this.http.post(`${environment.baseUrl}/api/setup`, {
      username,
      amount,
    });
  }

  fetchWalletDetails(id: String) {
    return this.http.get(`${environment.baseUrl}/api/wallet/${id}`);
  }

  transaction(id:String,amount:number,description:string) {
    return this.http.post(`${environment.baseUrl}/api/transact/${id}`,{
      description,
      amount,
    });
  }

  fetchTransactions(skip:any=0,limit:any=10) {
    const params = new HttpParams()
    .set('skip', skip.toString())
    .set('limit', limit.toString())

    return this.http.get(`${environment.baseUrl}/api/transactions`,{params});
  }

  sendEmail(emailData:any) {
    return this.http.post(`${environment.baseUrl}/api/send-email`,{
      emailData
    });
  }

}
