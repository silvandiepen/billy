import { ref } from "vue";

import { state } from "../../composables/state";
import { newId, equalObjects, store } from "../../composables";
import { InvoiceEntity } from "../invoice/Invoice.model";

export const savedClients = ref<InvoiceEntity[]>([]);
export const currentClient = ref<InvoiceEntity>(state.invoice.client);

export const loadClients = (): void => {
  savedClients.value = getClients();
};

export const addClient = (): void => {
  console.log("add client");
  savedClients.value.push(currentClient.value);
  saveClients();
};

export const getClient = (id: InvoiceEntity["id"]) =>
  savedClients.value.find((clnt) => clnt.id == id);

export const addNewClient = (): void => {
  const newClient = JSON.parse(JSON.stringify(currentClient.value));
  newClient.id = newId();
  savedClients.value.push(newClient);

  setTimeout(() => {
    currentClient.value = newClient;
  }, 0);

  saveClients();
};

export const removeClient = (id: InvoiceEntity["id"]): void => {
  savedClients.value = savedClients.value.filter((clnt) => clnt.id !== id);
  saveClients();
};

export const clientIDExists = (id: InvoiceEntity["id"]): boolean => {
  return savedClients.value.some((clnt) => clnt.id === id);
};

export const clientExists = (cl: InvoiceEntity): boolean => {
  return savedClients.value.some((clnt) => equalObjects(clnt, cl));
};

export const getClients = (): InvoiceEntity[] => {
  return JSON.parse(window.localStorage.getItem(store.CLIENTS) || "[]");
};

export const saveClients = () =>
  localStorage.setItem(store.CLIENTS, JSON.stringify(savedClients.value));

export const setClientToState = (id: string) => {
  let clnt: InvoiceEntity | undefined = savedClients.value.find(
    (clt) => clt.id == id
  );
  if (clnt) state.invoice.client = clnt;
};

export const isClientChanged = (id: InvoiceEntity["id"]) => {
  const savedClient = getClient(id) || {};
  return equalObjects(savedClient, state.invoice.client);
};
