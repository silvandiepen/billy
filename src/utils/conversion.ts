
import CryptoJS from 'crypto-js';
import { Invoice } from "@/types";

export const flattenAndExcludeId = (obj: any) => {
    const result: any = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'date' && key !== 'dueDate') {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const temp = flattenAndExcludeId(obj[key]);
                for (const tempKey in temp) {
                    result[`${key}.${tempKey}`] = temp[tempKey];
                }
            } else {
                result[key] = obj[key];
            }
        }
    }

    return result;
}


export const encodeInvoice = (invoice: Invoice, key: string): string => {
    const invoiceData = JSON.stringify(invoice);
    const data = CryptoJS.AES.encrypt(invoiceData, key).toString();
    const str = data;
    return str;
}
export const decodeInvoice = (data: string, key: string): Invoice => {
    // const bytes = CryptoJS.AES.decrypt(data + '==', key);
    const bytes = CryptoJS.AES.decrypt(data, key);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalData) as unknown as Invoice;

}