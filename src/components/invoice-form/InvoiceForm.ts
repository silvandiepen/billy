import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { eventBus, eventChannel, downloadFile } from "../../composables";
import {
  state,
  newEntry,
  newNote,
  saveInvoiceToStore,
  savedInvoices,
  getInvoiceID,
  getCurrentInvoiceData,
} from "../../composables/state";
import { ModalAction, ModalIdentifier } from "../ui/modal/Modal.model";
import { ButtonType, ButtonAlign, ButtonIcon } from "../ui/button/Button.model";

import InvoiceItemForm from "./InvoiceItemForm.vue";
import InvoiceEntityForm from "./InvoiceEntityForm.vue";
import InvoiceNoteForm from "./InvoiceNoteForm.vue";

import InvoiceItem from "../invoice/InvoiceItem.vue";
import InvoiceEntity from "../invoice/InvoiceEntity.vue";

import Clients from "../clients/Clients.vue";

import Button from "../ui/button/Button.vue";
import ButtonGroup from "../ui/button/ButtonGroup.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";

import FormText from "../ui/form/text/FormText.vue";
import FormSelect from "../ui/form/select/FormSelect.vue";
import FormNumber from "../ui/form/number/FormNumber.vue";
import FormTextArea from "../ui/form/textarea/FormTextArea.vue";
import Modal from "../ui/modal/Modal.vue";

import {
  savedClients,
  loadClients,
  addEntity,
  addNewEntity,
  entityIDExists,
  entityExists,
  isEntityChanged,
  Entity,
} from "../clients/Clients.helpers";

export default defineComponent({
  components: {
    InvoiceItem,
    Knop: Button,
    Knoppen: ButtonGroup,
    KnoppenBar: ButtonBar,
    FormText,
    FormSelect,
    FormNumber,
    FormTextArea,
    InvoiceItemForm,
    InvoiceNoteForm,
    InvoiceEntityForm,
    InvoiceEntity,
    Modal,
    Clients,
  },
  setup() {
    const { t } = useI18n({});

    const show = ref("start");
    const style = new Style("invoice-form");

    onMounted(() => {
      loadClients();
    });

    const showModal = (identifier: typeof ModalIdentifier) => {
      eventBus.emit(eventChannel.MODAL, {
        action: ModalAction.OPEN,
        identifier: identifier,
      });
    };

    const showSaveClient = computed(() => {
      return entityIDExists(Entity.CLIENT, state.invoice.client.id)
        ? isEntityChanged(Entity.CLIENT, state.invoice.client.id)
          ? true
          : false
        : false;
    });

    const showSaveNewClient = computed(() => {
      if (state.invoice.client.companyName || state.invoice.client.firstName) {
        return !entityExists(Entity.CLIENT, state.invoice.client);
      }
      return false;
    });
    const showSaveNewSeller = computed(() => {
      if (state.invoice.seller.companyName || state.invoice.seller.firstName) {
        return !entityExists(Entity.SELLER, state.invoice.seller);
      }
      return false;
    });

    const switchLanguage = (id: string) => {
      eventBus.emit(eventChannel.SET_LANGUAGE, id);
    };

    const currencyOptions = [
      { value: "EUR", label: t("currency.eur") },
      { value: "USD", label: t("currency.usd") },
    ];

    const saveInvoice = () => {
      saveInvoiceToStore();
    };

    const editting = ref({
      client: false,
      seller: false,
      items: false,
    });

    const toggleShow = (what: string) => {
      switch (what) {
        case "client":
          editting.value.client = !editting.value.client;
          editting.value.seller = false;
          editting.value.items = false;
          break;
        case "seller":
          editting.value.seller = !editting.value.seller;
          editting.value.client = false;
          editting.value.items = false;
          break;
        case "items":
          editting.value.items = !editting.value.items;
          editting.value.seller = false;
          editting.value.client = false;
          break;
      }
    };

    const invoice = computed(() => {
      return state.invoice;
    });

    onMounted(() => {
      console.log("hoi!", state.invoice);
    });

    const exportInvoice = () => {
      const fileName = getInvoiceID() + ".billy";
      const fileData = getCurrentInvoiceData();

      downloadFile(fileName, fileData);
    };

    return {
      t,
      show,
      style,
      invoice,
      actions: {
        newEntry,
        saveInvoice,
        newNote,
        export: exportInvoice,
      },
      ModalIdentifier,
      showSaveClient,
      addClient: addEntity(Entity.CLIENT),
      addNewClient: addNewEntity(Entity.CLIENT),
      savedClients,
      savedInvoices,
      showModal,
      showSaveNewClient,
      showSaveNewSeller,
      switchLanguage,
      currencyOptions,
      ButtonType,
      ButtonIcon,
      ButtonAlign,
      editting,
      toggleShow,
    };
  },
});
