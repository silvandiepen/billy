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
  tax?: number;
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
  bank: {
    name: string;
    account: string;
    swift: string;
    beneficiary: string;
  };
}

export interface InvoiceNote {
  id: string;
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
    created: Date;
    lastUpdate: Date;
  };
  settings: {
    logo: string;
    header: string;
    footer: string;
    currency: InvoiceCurrency;
    tax: number;
    terms: "";
    notes: InvoiceNote[];
  };
  seller: InvoiceEntity;
  client: InvoiceEntity;
}

const today = new Date();

const entity = (): InvoiceEntity => ({
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
  bank: {
    account: "",
    name: "",
    swift: "",
    beneficiary: "",
  },
});

export const defaultInvoice: Invoice = {
  current: {
    id: newId(),
    date: today,
    number: 0,
    data: [],
    total: 0,
    created: today,
    lastUpdate: today,
  },
  settings: {
    logo: "",
    header: "",
    footer: "",
    currency: InvoiceCurrency.EUR,
    tax: 0,
    terms: "",
    notes: [],
  },
  seller: entity(),
  client: entity(),
};
