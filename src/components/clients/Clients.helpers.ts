import { ref, computed } from "vue";

import { state, setInvoiceEntity } from "../../composables/state";
import { newId, equalObjects, store } from "../../composables";
import { InvoiceEntity } from "../invoice/Invoice.model";

export enum Entity {
  SELLER = "billy:entity:seller",
  CLIENT = "billy:entity:client",
}

export const savedClients = ref<InvoiceEntity[]>([]);
export const savedSellers = ref<InvoiceEntity[]>([]);

export const currentClient = computed(() => {
  return state.invoice.client;
});
export const currentSeller = computed(() => {
  return state.invoice.seller;
});

export const loadClients = (): void => {
  savedClients.value = getEntities(Entity.CLIENT);
};
export const loadSellers = (): void => {
  savedClients.value = getEntities(Entity.SELLER);
};

export const loadEntity = (entity: Entity): void => {
  entity == Entity.CLIENT ? loadClients() : loadSellers();
};

export const loadEntities = (): void => {
  loadClients();
  loadSellers();
};

export const addEntity = (entity: Entity): void => {
  console.log("add client");
  const saved = entity == Entity.CLIENT ? savedClients : savedSellers;
  const current = entity == Entity.CLIENT ? currentClient : currentSeller;
  saved.value.push(current.value);
  saveEntities(entity);
};

export const getEntity = (entity: Entity, id: InvoiceEntity["id"]) => {
  return entity == Entity.CLIENT
    ? savedClients.value.find((clnt) => clnt.id == id)
    : savedSellers.value.find((sllr) => sllr.id == id);
};

export const addNewEntity = (entity: Entity): void => {
  const currentEntity =
    entity === Entity.CLIENT ? currentClient : currentSeller;
  const currentSaved = Entity.CLIENT ? savedClients : savedSellers;

  const newEntity = JSON.parse(JSON.stringify(currentEntity.value));
  newEntity.id = newId();
  currentSaved.value.push(newEntity);

  saveEntities(entity);
};

export const removeEntity = (entity: Entity, id: InvoiceEntity["id"]): void => {
  const saved = entity == Entity.CLIENT ? savedClients : savedSellers;
  saved.value = saved.value.filter((ent) => ent.id !== id);
  saveEntities(entity);
};

export const entityIDExists = (
  entity: Entity,
  id: InvoiceEntity["id"]
): boolean => {
  const saved = entity == Entity.CLIENT ? savedClients : savedSellers;
  return saved.value.some((ent) => ent.id === id);
};

export const entityExists = (entity: Entity, en: InvoiceEntity): boolean => {
  const saved = entity == Entity.CLIENT ? savedClients : savedSellers;
  return savedClients.value.some((ent) => equalObjects(ent, en));
};

export const getEntities = (entity: Entity): InvoiceEntity[] => {
  return JSON.parse(
    window.localStorage.getItem(
      entity == Entity.CLIENT ? store.CLIENTS : store.SELLERS
    ) || "[]"
  );
};

export const saveEntity = (entity: InvoiceEntity) => {};

export const saveEntities = (entity: Entity) =>
  entity == Entity.CLIENT
    ? localStorage.setItem(store.CLIENTS, JSON.stringify(savedClients.value))
    : localStorage.setItem(store.SELLERS, JSON.stringify(savedSellers.value));

export const setEntityToState = (entity: Entity, id: string) => {
  const saved = entity == Entity.CLIENT ? savedClients : savedSellers;

  let entityData: InvoiceEntity | undefined = saved.value.find(
    (ent) => ent.id == id
  );
  if (entityData) setInvoiceEntity(entity, entityData);
};

export const isEntityChanged = (
  entity: Entity,
  id: InvoiceEntity["id"]
): boolean => {
  const savedEntity = getEntity(entity, id) || {};
  const currentEntity =
    entity === Entity.CLIENT ? state.invoice.client : state.invoice.seller;
  return equalObjects(savedEntity, currentEntity);
};
