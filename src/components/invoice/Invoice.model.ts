import { newId } from "../../composables";

export enum InvoiceCurrency {
  EUR = "EUR",
  USD = "USD",
}

export interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  amount: number;
  discount: number;
}

export interface InvoiceEntity {
  id: string;
  companyName: string;
  taxId: string;
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  additional: string;
  postalcode: string;
  city: string;
  country: string;
  vatNo: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  bankAccount: string;
  bankName: string;
  bankSwift: string;
}

interface InvoiceNote {
  title: "";
  description: "";
}

export interface Invoice {
  current: {
    id: string;
    date: Date;
    number: number;
    data: InvoiceItem[];
    total: number;
  };
  settings: {
    currency: InvoiceCurrency;
    tax: number;
    terms: "";
    notes: InvoiceNote[];
    payment: {
      bankname: "";
      swift: "";
      account: "";
    };
  };
  seller: InvoiceEntity;
  client: InvoiceEntity;
}

const today = new Date();

export const defaultInvoice: Invoice = {
  current: {
    id: newId(),
    date: today,
    number: 0,
    data: [],
    total: 0,
  },
  settings: {
    currency: InvoiceCurrency.EUR,
    tax: 15,
    terms: "",
    notes: [],
    payment: {
      bankname: "",
      swift: "",
      account: "",
    },
  },
  seller: {
    id: newId(),
    companyName: "",
    taxId: "",
    firstName: "",
    lastName: "",
    street: "",
    number: "",
    additional: "",
    postalcode: "",
    city: "",
    country: "",
    vatNo: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    bankAccount: "",
    bankName: "",
    bankSwift: "",
  },
  client: {
    id: newId(),
    companyName: "",
    taxId: "",
    firstName: "",
    lastName: "",
    street: "",
    number: "",
    additional: "",
    postalcode: "",
    city: "",
    country: "",
    vatNo: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    bankAccount: "",
    bankName: "",
    bankSwift: "",
  },
};
