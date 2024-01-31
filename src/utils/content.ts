import { Invoice } from "@/types";
import { formatCurrency, getTotal, invoiceNumber } from "@/utils";

export const enrichContent = (content: string, invoice: Invoice) => {


    const replacers: { [key: string]: string } = {
        amount: formatCurrency(getTotal(invoice)),
        beneficiary: invoice.sender.beneficiary,
        iban: invoice.sender.iban,
        bic: invoice.sender.bic,
        invoiceNumber: invoiceNumber(invoice),

    }

    // Replace all replacers in the content. Find the key of the replacer within brackets like: "[amount]" and replace that with the value. in the replacers. 
    // This should work in typescript. 

    return content.replace(/\[(.*?)\]/g, (_match: string, p1: string) => {
        return replacers[p1];
    })


}
