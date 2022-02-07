import { defineComponent } from "vue";

import { EntitiesComponent, Entity } from "../Entity";
import {
  ButtonComponent,
  ModalComponent,
  ModalIdentifier,
  ButtonBarComponent,
  ButtonAlign,
} from "../ui";
import { UploadInvoiceComponent } from "../UploadInvoice";
import {
  openSellersModal,
  openClientsModal,
  openUploadModal,
} from "../../services";

export default defineComponent({
  components: {
    Entities: EntitiesComponent,
    UploadInvoice: UploadInvoiceComponent,
    Modal: ModalComponent,
    ButtonComponent,
    ButtonBar: ButtonBarComponent,
  },
  setup() {
    return {
      action: {
        sellers: openSellersModal,
        clients: openClientsModal,
        upload: openUploadModal,
      },
      Entity,
      ModalIdentifier,
      ButtonAlign,
    };
  },
});
