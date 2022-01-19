import { reactive, computed, watch } from "vue";

import {
  getInvoiceClient,
  getInvoiceSeller,
  setInvoiceEntity,
} from "../../composables/state";
import { newId, equalObjects, store } from "../../composables";
import { InvoiceEntity } from "../Invoice/Invoice.model";
import { Entity } from "./Entity.model";

interface Saved {
  clients: InvoiceEntity[];
  sellers: InvoiceEntity[];
}

/*

Local Entities

*/
export const saved = reactive<Saved>({
  clients: [],
  sellers: [],
});

export const currentClient = computed(() => {
  return getInvoiceClient();
});
export const currentSeller = computed(() => {
  return getInvoiceSeller();
});

/*

Watchers

*/
watch(
  () => saved.clients,
  () => {
    console.log("clients updated");
  }
);

watch(
  () => saved.sellers,
  () => {
    console.log("sellers updated");
  }
);

/*

Getters

*/
export const getSavedSellers = computed(() => {
  return saved.sellers;
});
export const getSavedClients = computed(() => {
  return saved.clients;
});

export const getSavedEntities = (entity: Entity) => {
  return entity == Entity.CLIENT
    ? getSavedClients.value
    : getSavedSellers.value;
};

export const getCurrentEntity = (entity: Entity) => {
  return entity === Entity.CLIENT ? currentClient.value : currentSeller.value;
};

export const getEntity = (entity: Entity, id: InvoiceEntity["id"]) => {
  return entity == Entity.CLIENT
    ? saved.clients.find((clnt) => clnt.id == id)
    : saved.sellers.find((sllr) => sllr.id == id);
};

export const removeEntity = (entity: Entity, id: InvoiceEntity["id"]): void => {
  const currentSaved = getSavedEntities(entity);

  console.log(
    "hiii",
    id,
    currentSaved.length,
    currentSaved.filter((ent) => ent.id !== id).length
  );
  switch (entity) {
    case Entity.CLIENT:
      saved.clients = currentSaved.filter((ent) => ent.id !== id);
      break;
    case Entity.SELLER:
      saved.sellers = currentSaved.filter((ent) => ent.id !== id);
      break;
  }

  saveEntitiesToLocalStorage(entity);
};

export const entityIDExists = (
  entity: Entity,
  id: InvoiceEntity["id"]
): boolean => {
  const currentSaved = getSavedEntities(entity);
  return currentSaved.some((ent) => ent.id === id);
};

export const entityExists = (entity: Entity, en: InvoiceEntity): boolean => {
  const currentSaved = getSavedEntities(entity);
  return currentSaved.some((ent) => equalObjects(ent, en));
};

/*

    ACTIONS

*/

// LOAD
export const loadClients = (): void => {
  saved.clients = getEntitiesFromLocalStorage(Entity.CLIENT);
};
export const loadSellers = (): void => {
  saved.sellers = getEntitiesFromLocalStorage(Entity.SELLER);
};

export const loadEntity = (entity: Entity): void => {
  entity == Entity.CLIENT ? loadClients() : loadSellers();
};

export const loadEntities = (): void => {
  console.log("loading entities");
  loadClients();
  loadSellers();
};

// ADD
export const addEntity = (entity: Entity): void => {
  const currentSaved = getSavedEntities(entity);
  const currentEntity = getCurrentEntity(entity);

  if (!entityIDExists(entity, currentEntity.id)) {
    console.log("Adding Entity", entity);
    currentSaved.push(currentEntity);
    saveEntitiesToLocalStorage(entity);
  } else {
    console.log(currentEntity.id, "already exists");
  }
};

export const addAsNewEntity = (entity: Entity): void => {
  const currentSaved = getSavedEntities(entity);
  const currentEntity = getCurrentEntity(entity);

  const newEntity = JSON.parse(JSON.stringify(currentEntity));
  newEntity.id = newId();
  currentSaved.push(newEntity);

  saveEntitiesToLocalStorage(entity);
};

// export const saveEntity = (entity: Entity) => {
//   const currentSaved = getSavedEntities(entity);
//   const currentEntity =
//     entity === Entity.CLIENT ? currentClient : currentSeller;
//   const currentIndex = currentSaved.findIndex(
//     (ent) => ent.id == currentEntity.value.id
//   );

//   console.log(`Save ${entity == Entity.CLIENT ? "Client" : "Seller"}`);
//   console.log(currentEntity);

//   currentSaved[currentIndex] = currentEntity.value;
// };

// UPDATE
export const updateEntity = (entity: Entity): void => {
  const currentSaved = getSavedEntities(entity);
  const currentEntity = getCurrentEntity(entity);

  const currentEntityIndex = currentSaved.findIndex(
    (ent) => ent.id == currentEntity.id
  );

  console.log(currentEntityIndex);

  if (currentEntityIndex > -1) {
    switch (entity) {
      case Entity.CLIENT:
        console.log("saving to client");
        saved.clients[currentEntityIndex] = currentEntity;
        break;
      case Entity.SELLER:
        console.log("saving to sellers");
        saved.clients[currentEntityIndex] = currentEntity;
        break;
    }

    saveEntitiesToLocalStorage(entity);
  }
};

/*
Localstorage
*/

export const saveEntitiesToLocalStorage = (entity: Entity) => {
  entity == Entity.CLIENT
    ? localStorage.setItem(
        store.CLIENTS,
        JSON.stringify(getSavedEntities(entity))
      )
    : localStorage.setItem(
        store.SELLERS,
        JSON.stringify(getSavedEntities(entity))
      );
  loadEntities();
};

export const getEntitiesFromLocalStorage = (
  entity: Entity
): InvoiceEntity[] => {
  const data = JSON.parse(
    window.localStorage.getItem(
      entity == Entity.CLIENT ? store.CLIENTS : store.SELLERS
    ) || "[]"
  );

  switch (entity) {
    case Entity.CLIENT:
      saved.clients = data;
      break;
    case Entity.SELLER:
      saved.sellers = data;
      break;
  }

  return data;
};

/*
  
To State
  
*/

export const setEntityToState = (entity: Entity, id: string) => {
  const currentSaved = getSavedEntities(entity);

  let entityData: InvoiceEntity | undefined = currentSaved.find(
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
    entity === Entity.CLIENT ? currentClient : currentSeller;

  return JSON.stringify(savedEntity) !== JSON.stringify(currentEntity.value);
};
