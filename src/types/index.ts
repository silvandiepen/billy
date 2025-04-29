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
    active: boolean,
    id: string;
    title: string;
    sku: string;
    description: string
    quantity: number
    price: number
    discount: number
    taxRate: number
    unit: string
    days: Date[]
}

export interface Note {
    active: boolean,
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
    id: string;
    details: {
        number: string
        date: Date | string
        dueDate: Date | string
        currency: Currency
        locale: Locales
        terms: string
        notes: string[],
        taxRate: number,
        discount: number,
        shipping: number,
        color: string
    },
    notes: Note[],
    items: InvoiceItem[]
    sender: Entity;
    receiver: Entity;
}

export const BlankNote: Note = {
    id: '',
    title: '',
    content: '',
    active: true
}
export const BlankItem: InvoiceItem = {
    id: '',
    title: '',
    sku: '',
    description: '',
    quantity: 0,
    price: 0,
    discount: 0,
    unit: '',
    taxRate: -1,
    active: true,
    days:[]
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
    locale: Locales['en-US'],
    color: '#ff0099'
}
export const BlankInvoice: Invoice = {
    id: "",
    details: BlankDetails,
    items: [],
    notes: [],
    sender: BlankEntity,
    receiver: BlankEntity
}

export const ColorMode = {
	LIGHT: 'light',
	DARK: 'dark',
};
export type ColorMode = (typeof ColorMode)[keyof typeof ColorMode];

export const FontSize = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	XLARGE: 'xlarge',
};
export type FontSize = (typeof FontSize)[keyof typeof FontSize];

export const BaseColors = {
	PURPLE: 'purple',
	BLUE: 'blue',
	GREEN: 'green',
	LIME: 'lime',
	YELLOW: 'yellow',
	ORANGE: 'orange',
	PINK: 'pink',
	RED: 'red',
	BROWN: 'brown',
	BLACK: 'black',
	GRAY: 'gray',
	WHITE: 'white',
	TURQUOISE: 'turquoise',
	CYAN: 'cyan',
	INDIGO: 'indigo',
	VIOLET: 'violet',
	MAGENTA: 'magenta',
	ROSE: 'rose',
	CORAL: 'coral',
	GOLD: 'gold',
	SILVER: 'silver',
	BRONZE: 'bronze',
};

export type BaseColors = (typeof BaseColors)[keyof typeof BaseColors];

export const Colors = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	TERTIARY: 'tertiary',
	QUATERNARY: 'quaternary',
	ACCENT: 'accent',
	BACKGROUND: 'background',
	FOREGROUND: 'foreground',
	DARK: 'dark',
	LIGHT: 'light',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error',
	INFO: 'info',
};

export type Colors = (typeof Colors)[keyof typeof Colors];

export const AllColors = { ...BaseColors, ...Colors };
export type AllColors = BaseColors & Colors;

export const Screen = {
	DESKTOP: 'desktop',
	TABLET: 'tablet',
	MOBILE: 'mobile',
};

export type Screen = (typeof Screen)[keyof typeof Screen];

export const Status = {
	IDLE: 'idle',
	LOADING: 'loading',
	ERROR: 'error',
	SUCCESS: 'success',
};
export type Status = (typeof Status)[keyof typeof Status];

export const Size = {
	DEFAULT: 'default',
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
};
export type Size = (typeof Size)[keyof typeof Size];
