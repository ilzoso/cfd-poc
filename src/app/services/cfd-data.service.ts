import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { InvoiceItem } from '../interfaces/InvoiceItem';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CfdDataService {

  private res: any;
  private baseUri: string;
  private invoicesBaseUri: string;
  private reregistrationsBaseUri: string;
  private customersBaseUri: string;
  private invoices: InvoiceItem[] = [];

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUri = config.getApiUri();
    this.invoicesBaseUri = this.baseUri + '/api/invoices';
    this.reregistrationsBaseUri = this.baseUri + '/api/reregistrations';
    this.customersBaseUri = this.baseUri + '/api/customers';
  }

  getInvoiceItemsAsync(cid: string, fin: string) {
    return this.http.get<InvoiceItem[]>(`${this.invoicesBaseUri}?cid=${cid}&fin=${fin}`, {
      observe: 'response', params: new HttpParams().set("cid", cid).set("fin", fin)
    }).pipe(
      map(res => {
        return {
          results: res.body as InvoiceItem[]
        }
      }), 
      catchError(this.handleError)
    );
  }

  getEmptyInvoiceItems(): InvoiceItem[] {
    return this.ELEMENTS.filter(x => x.cid == null);
  }

  getAllInvoiceItems(): InvoiceItem[] {
    return this.ELEMENTS;
  }

  getInvoiceItems(searchString: string): InvoiceItem[] {
    return this.ELEMENTS.filter(x => x.cid == searchString || x.fin == searchString);
  }

  private ELEMENTS: InvoiceItem[] = [
    { cid: "100", fin: "200", invoiceid: "20200331-10201-90021-A", description: "Advisory Fees", invoiceamount: 1202.45, paymentamount: 1202.45, periodend: new Date('10/22/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "100", fin: "201", invoiceid: "20200630-10201-90021-A", description: "Advisory Fees", invoiceamount: 1202.45, paymentamount: 1202.45, periodend: new Date('10/21/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "100", fin: "202", invoiceid: "20200930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1502.45, paymentamount: 1502.45, periodend: new Date('10/20/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "100", fin: "203", invoiceid: "20201231-10201-90021-A", description: "Advisory Fees", invoiceamount: 1502.45, paymentamount: 1502.45, periodend: new Date('10/19/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "301", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1502.45, paymentamount: 1502.45, periodend: new Date('10/18/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "302", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1402.45, paymentamount: 1402.45, periodend: new Date('10/17/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "303", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1602.45, paymentamount: 1602.45, periodend: new Date('10/16/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "304", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1702.45, paymentamount: 1702.45, periodend: new Date('10/15/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "305", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1802.45, paymentamount: 1802.45, periodend: new Date('10/14/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "306", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1902.45, paymentamount: 1902.45, periodend: new Date('10/13/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "307", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1102.45, paymentamount: 1102.45, periodend: new Date('10/12/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "308", invoiceid: "20220930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1202.45, paymentamount: 1202.45, periodend: new Date('10/11/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "309", invoiceid: "20220930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1302.45, paymentamount: 1302.45, periodend: new Date('10/10/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "310", invoiceid: "20220930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1402.45, paymentamount: 1402.45, periodend: new Date('10/09/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "311", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1502.45, paymentamount: 1502.45, periodend: new Date('10/08/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "101", fin: "312", invoiceid: "20220930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1602.45, paymentamount: 1602.45, periodend: new Date('10/07/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "102", fin: "400", invoiceid: "20210630-10201-90021-A", description: "Advisory Fees", invoiceamount: 1702.45, paymentamount: 1702.45, periodend: new Date('10/06/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "102", fin: "401", invoiceid: "20210930-10201-90021-A", description: "Advisory Fees", invoiceamount: 1802.45, paymentamount: 1802.45, periodend: new Date('10/05/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "102", fin: "402", invoiceid: "20211231-10201-90021-A", description: "Advisory Fees", invoiceamount: 1902.45, paymentamount: 1902.45, periodend: new Date('10/04/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "102", fin: "403", invoiceid: "20220331-10201-90021-A", description: "Advisory Fees", invoiceamount: 2002.45, paymentamount: 2002.45, periodend: new Date('10/03/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "103", fin: "500", invoiceid: "20220630-10201-90021-A", description: "Advisory Fees", invoiceamount: 2102.45, paymentamount: 2102.45, periodend: new Date('10/02/2022'), paymentdate: new Date('10/12/2022') },
    { cid: "104", fin: "600", invoiceid: "20220930-10201-90021-A", description: "Advisory Fees", invoiceamount: 2202.45, paymentamount: 2202.45, periodend: new Date('10/01/2022'), paymentdate: new Date('10/12/2022') }
  ];

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        return throwError(() => error.error.message);
    }
    return throwError(() => error || 'Server error');
}

}
