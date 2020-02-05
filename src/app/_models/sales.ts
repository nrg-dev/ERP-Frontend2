import { Common } from "./common";

export class Sales extends Common {

   id: string;
   productName: string; 
   category: string;
   customerName: string;
   soDate: string;
   quantity: string;
   netAmount:any;
   status:string;
   salesorder:string; 
   terms:string;
   salesPerson:string;
   orderNumber:string;
   termsDays:string;
   invoicedate:Date;
   salesarray: any = [];
   price: string;
}
