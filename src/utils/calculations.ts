import { InvoiceItem, Invoice } from "@/types";

export const itemPrice = (item: InvoiceItem): number => {
    return item.price * item.quantity;
}

export const itemDiscount = (item: InvoiceItem, details: Invoice['details']): {
    price: number, discount: number
} => {
    const price = itemPrice(item);
    let calculatedPrice =0;
    let discount = 0;

    if (item.discount) {
        discount = (item.discount / 100);
        calculatedPrice = price - (price * (item.discount / 100));
    }
    else if (details.discount) {
        discount = (details.discount / 100);
        calculatedPrice = price - (price * (details.discount / 100));
    }
    return {
        discount,
        price: calculatedPrice
    };
}

export const endPrice = (item: InvoiceItem, details: Invoice['details']): number => {
    const { price } = itemDiscount(item, details);
    const normalPrice = itemPrice(item);

    return price || normalPrice;
}