// @ts-ignore
import { Icons } from "open-icon";
export { Icons };

export interface Entity {
    [key: string]: any;
    id: string;
    name: string
    companyName: string;
    address: string
    city: string
    state: string
    zip: string
    country: string;
    phone: string
    email: string
    website: string
    taxId: string
    iban: string;
    bic: string;
    beneficiary: string;


}
export interface InvoiceItem {
    id: string;
    title: string;
    sku: string;
    description: string
    quantity: number
    price: number
    total: number
    discount: number
    taxRate: number
    unit: string
}

export interface Note {
    id: string;
    title: string;
    content: string;
}
export const Currency = {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP'
}
export type Currency = typeof Currency[keyof typeof Currency];

export const Locales = {
    'en-US': 'en-US',
    'en-GB': 'en-GB',
    'de-DE': 'de-DE',
    'fr-FR': 'fr-FR',
    'es-ES': 'es-ES',
    'it-IT': 'it-IT',
    'mt-MT': 'mt-MT',
    'nl-NL': 'nl-NL'
}
export type Locales = typeof Locales[keyof typeof Locales];

export interface Invoice {

    details: {
        number: string
        date: Date
        dueDate: Date
        currency: Currency
        locale: Locales
        terms: string
        notes: string[],
        taxRate: number,
        discount: number,
        shipping: number
    },
    notes: Note[],
    items: InvoiceItem[]
    sender: Entity;
    receiver: Entity;
}

export const BlankNote: Note = {
    id: '',
    title: '',
    content: ''
}
export const BlankItem: InvoiceItem = {
    id: '',
    title: '',
    sku: '',
    description: '',
    quantity: 0,
    price: 0,
    total: 0,
    discount: 0,
    unit: '',
    taxRate: -1
}
export const BlankEntity: Entity = {
    id: '',
    name: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    taxId: '',
    iban: '',
    bic: '',
    beneficiary: ''
}
export const BlankDetails: Invoice['details'] = {
    number: '',
    date: new Date(),
    dueDate: new Date(),
    terms: '',
    notes: [],
    taxRate: 0,
    discount: 0,
    shipping: 0,
    currency: Currency.EUR,
    locale: Locales['en-US']
}
export const BlankInvoice: Invoice = {
    details: BlankDetails,
    items: [],
    notes: [],
    sender: BlankEntity,
    receiver: BlankEntity
}