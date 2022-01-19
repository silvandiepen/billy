import { defineComponent } from "vue";
import { eventBus, eventChannel } from "../../composables";

import { EntitiesComponent, Entity } from "../Entity";
import {
  ButtonComponent,
  ModalComponent,
  ModalIdentifier,
  ButtonGroupComponent,
  ButtonAlign,
  ModalEventArguments,
  ModalAction,
} from "../ui";
import { UploadInvoiceComponent } from "../UploadInvoice";

export default defineComponent({
  components: {
    Entities: EntitiesComponent,
    UploadInvoice: UploadInvoiceComponent,
    Modal: ModalComponent,
    ButtonComponent,
    ButtonGroup: ButtonGroupComponent,
  },
  setup() {
    const openSellers = () => {
      eventBus.emit(eventChannel.MODAL, {
        identifier: ModalIdentifier.SELLERS_LIST,
        action: ModalAction.OPEN,
      } as ModalEventArguments);
    };
    const openClients = () => {
      eventBus.emit(eventChannel.MODAL, {
        identifier: ModalIdentifier.CLIENTS_LIST,
        action: ModalAction.OPEN,
      } as ModalEventArguments);
    };
    const openUpload = () => {
      eventBus.emit(eventChannel.MODAL, {
        identifier: ModalIdentifier.UPLOAD_INVOICE,
        action: ModalAction.OPEN,
      } as ModalEventArguments);
    };
    return {
      action: {
        sellers: openSellers,
        clients: openClients,
        upload: openUpload,
      },
      Entity,
      ModalIdentifier,
      ButtonAlign,
    };
  },
});
