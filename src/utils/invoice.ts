// import { getDateObject } from "@sil/format"
import { getDateObject } from "@sil/format";
import { Invoice, InvoiceItem } from "@/types";
import { itemPrice, endPrice, itemDiscount } from '@/utils/calculations';

export const invoiceNumber = (invoice: Invoice) => {

    const { details: { number } } = invoice;

    // const dateObj = getDateObject(invoice.details.date, {});
    // console.log(dateObj);

    // console.log(getDate)


    const dateObject = getDateObject(new Date(invoice.details.date), { padded: true });


    return `${dateObject.year}${dateObject.month}${dateObject.day}-${number.padStart(3, '0')}`
}




export const isDefined = (v: any) => {

    if (v == undefined) return false;
    if (v == null) return false;
    if (v == '') return false;

    return true;

}

export const getSubTotal = (invoice: Invoice) => {
    return invoice.items.reduce((acc: number, item: InvoiceItem) => {

        const discounted = itemDiscount(item, invoice.details);
        if (discounted.discount > 0) {
            return acc + discounted.price;
        }
        return acc + itemPrice(item);
    }, 0)
}


export const getAllTaxRates = (invoice: Invoice): number[] => {

    let rates: number[] = [];
    invoice.items.forEach((item) => {
        let localRate = isDefined(item.taxRate) ? item.taxRate : -1;
        let globalRate = invoice.details.taxRate !== null ? invoice.details.taxRate : 0;
        let rate = localRate !== -1 ? localRate : globalRate;
        rates.push(rate);
    })


    return [...new Set(rates)]
}


export const getTaxRates = (invoice: Invoice) => {

    const rates = getAllTaxRates(invoice);
    const subTotal = getSubTotal(invoice);
    const taxRates = [];


    if (rates.length == 1) {

        taxRates.push({
            percentage: invoice.details.taxRate,
            amount: (subTotal * (rates[0] / 100))
        })

    } else {
        invoice.items.forEach((item) => {
            const price = endPrice(item, invoice.details);
            const rate = isDefined(item.taxRate) ? item.taxRate : invoice.details.taxRate;
            const amount = (price * (rate / 100));
            taxRates.push({
                percentage: rate,
                amount
            })
        })
    }

    let newRates: { percentage: number, amount: number }[] = [];

    taxRates.forEach((rate) => {
        if (newRates.find((r) => r.percentage === rate.percentage)) {
            const index = newRates.findIndex((r) => r.percentage === rate.percentage);
            newRates[index].amount += rate.amount;
        } else {
            newRates.push(rate);
        }
    })
    return newRates;
}

export const getTotalTax = (invoice: Invoice) => {

    const taxRates = getTaxRates(invoice);

    const total = taxRates.reduce((acc, rate) => {
        return acc + rate.amount;
    }, 0)
    return total;
}

export const getTotalShipping = (invoice: Invoice) => {
    if (invoice.details.shipping) {
        return invoice.details.shipping;
    }
    return 0;
}

export const getTotal = (invoice: Invoice) => {

    const subTotal = getSubTotal(invoice);
    const totalShipping = getTotalShipping(invoice);
    const totalTax = getTotalTax(invoice);

    const total = subTotal + totalShipping + totalTax;
    return total;

}
