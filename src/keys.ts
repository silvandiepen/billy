interface keys {
  invoice: string;
  "invoice-no": string;
  "invoice-date": string;
  sum: string;
  vat: string;
  total: string;
  client: string;
  seller: string;
  item: string;
  note: string;
  setting: string;
  currency: string;
  home: string;

  "billy:entity:client": string;
  "billy:entity:seller": string;

  header: string;
  footer: string;
  logo: string;

  load: string;
  save: string;
  export: string;
  done: string;

  taxId: string;

  "currency.eur": string;
  "currency.usd": string;

  "language.en": string;
  "language.nl": string;

  "action.add-item": string;
  "action.add-note": string;
  "action.show-clients": string;
  "action.load-clients": string;
  "action.save": string;
  "action.export": string;
  "action.new-invoice": string;
  "action.force-save": string;
  "action.to-pdf": string;
  "saved-invoice": string;
  "label.name": string;
  "label.id": string;
  "label.companyName": string;
  "label.firstName": string;
  "label.lastName": string;
  "label.street": string;
  "label.number": string;
  "label.postalcode": string;
  "label.additional": string;
  "label.city": string;
  "label.phone": string;
  "label.website": string;
  "label.email": string;
  "label.country": string;
  "label.title": string;
  "label.date": string;
  "label.description": string;
  "label.amount": string;
  "label.price": string;
  "label.discount": string;
  "label.taxId": string;
  "label.bank": string;
  "label.bankName": string;
  "label.bankAccount": string;
  "label.bankSwift": string;
  "label.bankBeneficiary": string;
  "label.logo": string;
  "label.tax": string;
  "label.currency": string;
}

export const en: keys = {
  invoice: "Invoice",
  "invoice-no": "Invoice No.",
  "invoice-date": "Invoice Date",
  sum: "Sum",
  vat: "Vat {count}%",
  total: "Total",
  client: "Client | Clients",
  seller: "Seller | Sellers",
  item: "Item | Items",
  note: "Note | Notes",
  setting: "Setting | Settings",
  currency: "Currency",
  home: "Home",

  "billy:entity:client": "Client",
  "billy:entity:seller": "Seller",

  header: "Header",
  footer: "Footer",
  logo: "Logo",

  load: "Load",
  save: "Save",
  export: "Export",
  done: "Done",

  taxId: "tax ID {msg}",

  "currency.eur": "Euro",
  "currency.usd": "USD",

  "language.en": "English",
  "language.nl": "Dutch",

  "action.add-item": "Add Item",
  "action.add-note": "Add Note",
  "action.show-clients": "Show clients",
  "action.load-clients": "Load clients",
  "action.save": "Save",
  "action.export": "Export",
  "action.new-invoice": "New Invoice",
  "action.force-save": "Forceer opslaan",
  "action.to-pdf":"Export PDF",
  "saved-invoice": "Saved Invoice | Saved Invoices",
  "label.id": "ID | IDs",
  "label.name": "Name | Names",
  "label.companyName": "Company Name | Company Names",
  "label.firstName": "First Name | First Names",
  "label.lastName": "Last Name | Last Names",
  "label.street": "Street | Streets",
  "label.number": "Number | Numbers",
  "label.postalcode": "Postal Code | Postal Codes",
  "label.additional": "Additional",
  "label.city": "City | Cities",
  "label.phone": "Phonenumber",
  "label.email": "E-mailaddress",
  "label.website": "Website",
  "label.country": "Country | Countries",
  "label.title": "Title | Titles",
  "label.date": "Date | Dates",
  "label.description": "Description",
  "label.amount": "Amount",
  "label.price": "Price",
  "label.discount": "Discount",
  "label.taxId": "Tax ID",
  "label.bank": "Bank",
  "label.bankName": "Bank name",
  "label.bankAccount": "Bank Account",
  "label.bankSwift": "BIC/Swift",
  "label.bankBeneficiary": "Beneficiary",
  "label.logo": "Logo",
  "label.tax": "Tax",
  "label.currency": "Currency",
};
export const nl: keys = {
  invoice: "Factuur",
  "invoice-no": "Factuur nr.",
  "invoice-date": "Factuur Datum",
  sum: "Subtotaal",
  vat: "BTW {count}%",
  total: "Totaal",
  client: "Klant | Klanten",
  seller: "Verkoper | Verkopers",
  item: "Item | Items",
  note: "Notitie | Notities",
  setting: "Instelling | Instellingen",
  currency: "Currency",
  home: "Home",

  "billy:entity:client": "Klant",
  "billy:entity:seller": "Verkoper",

  header: "Header",
  footer: "Footer",
  logo: "Logo",

  load: "Laad",
  save: "Opslaan",
  export: "Exporteren",
  done: "Klaar",

  taxId: "BTW nummer {msg}",
  

  "currency.eur": "Euro",
  "currency.usd": "USD",

  "language.en": "Engels",
  "language.nl": "Nederlands",

  "action.add-item": "Item toevoegen",
  "action.add-note": "Notitie toevoegen",
  "action.show-clients": "Show klanten",
  "action.load-clients": "Laad klanten",
  "action.save": "Opslaan",
  "action.export": "Exporteren",
  "action.new-invoice": "Nieuwe Factuur",
  "action.force-save": "Forceer opslaan",
  "action.to-pdf":"Export PDF",
  "saved-invoice": "Opgeslagen factuur | Opgeslagen facturen",
  "label.id": "ID | IDs",
  "label.name": "Naam | Namen",
  "label.companyName": "Bedrijfsnaam | Bedrijfsnamen",
  "label.firstName": "Voornaam | Voornamen",
  "label.lastName": "Achternaam | Achternamen",
  "label.street": "Straat | Straten",
  "label.number": "Nummer | Nummers",
  "label.postalcode": "Postcode | Postcodes",
  "label.additional": "Additioneel",
  "label.city": "Plaatsnaam | Plaatsnamen",
  "label.phone": "Telefoon",
  "label.email": "E-mail adres",
  "label.website": "Website",
  "label.country": "Land | Landen",
  "label.title": "Titel | Titels",
  "label.date": "Datum | Data",
  "label.description": "Omschrijving",
  "label.amount": "Hoeveel",
  "label.price": "Prijs",
  "label.discount": "Korting",
  "label.taxId": "BTW nummer",
  "label.bank": "Bank",
  "label.bankName": "Bank naam",
  "label.bankAccount": "Bank Account",
  "label.bankSwift": "BIC/Swift",
  "label.bankBeneficiary": "Beneficiary",
  "label.logo": "Logo",
  "label.tax": "Btw",
  "label.currency": "Valuta",
};
