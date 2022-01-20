import { eventBus, eventChannel } from "../composables";
import {
  ModalEventArguments,
  ModalAction,
  ModalIdentifier,
} from "../components/ui";
import { Entity } from "../components/Entity";

export const openSellersModal = () => {
  console.log("hoiiiiiii open sellers modal");
  eventBus.emit(eventChannel.MODAL, {
    identifier: ModalIdentifier.SELLERS_LIST,
    action: ModalAction.OPEN,
  } as ModalEventArguments);
};

export const openClientsModal = () => {
  console.log("hoiiiiiii open clients modal");
  eventBus.emit(eventChannel.MODAL, {
    identifier: ModalIdentifier.CLIENTS_LIST,
    action: ModalAction.OPEN,
  } as ModalEventArguments);
};
export const closeSellersModal = () => {
  eventBus.emit(eventChannel.MODAL, {
    identifier: ModalIdentifier.SELLERS_LIST,
    action: ModalAction.CLOSE,
  } as ModalEventArguments);
};

export const closeClientsModal = () => {
  eventBus.emit(eventChannel.MODAL, {
    identifier: ModalIdentifier.CLIENTS_LIST,
    action: ModalAction.CLOSE,
  } as ModalEventArguments);
};

export const openEntityModal = (entity: Entity) => {
  switch (entity) {
    case Entity.CLIENT:
      openClientsModal();
      break;
    case Entity.SELLER:
      openSellersModal();
      break;
  }
};
export const closeEntityModal = (entity: Entity) => {
  switch (entity) {
    case Entity.CLIENT:
      closeClientsModal();
      break;
    case Entity.SELLER:
      closeClientsModal();
      break;
  }
};

export const openUploadModal = () => {
  eventBus.emit(eventChannel.MODAL, {
    identifier: ModalIdentifier.UPLOAD_INVOICE,
    action: ModalAction.OPEN,
  } as ModalEventArguments);
};
