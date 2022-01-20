import { defineComponent } from "vue";

import { EntitiesComponent, Entity } from "../Entity";
import {
  ButtonComponent,
  ModalComponent,
  ModalIdentifier,
  ButtonGroupComponent,
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
    ButtonGroup: ButtonGroupComponent,
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
