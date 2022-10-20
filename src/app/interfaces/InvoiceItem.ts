export interface InvoiceItem {
    cid: string;
    fin: string;
    invoiceid: string;
    description: string;
    paymentdate: Date;
    periodend: Date;
    invoiceamount: number;
    paymentamount: number;
}
