import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, map, NEVER, never, Observable, of } from "rxjs";
import { InvoiceItem } from "../interfaces/InvoiceItem";
import { CfdDataService } from "./cfd-data.service";

export class InvoiceItemDataSource implements DataSource<InvoiceItem> {
    connect(collectionViewer: CollectionViewer): Observable<readonly InvoiceItem[]> {
        return this.invoiceItemSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.invoiceItemSubject.complete();
        this.loadingSubject.complete();
    }

    private invoiceItemSubject = new BehaviorSubject<InvoiceItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private dataService: CfdDataService) {}

    loadInvoices(cid: string, fin: string) {
        this.loadingSubject.next(true);
        this.dataService.getInvoiceItemsAsync(cid, fin).pipe(
            //tap(res => {console.info(res);}),
            catchError(() => of([])), 
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(invoices => {
            return this.invoiceItemSubject.next(invoices as InvoiceItem[]);
        });
    }

}
