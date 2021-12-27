import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

import { bem, eventBus, eventChannel } from "../../composables";
import {
  state,
  newEntry,
  saveInvoiceToStore,
  savedInvoices,
} from "../../composables/state";
import { ModalAction, ModalIdentifier } from "../ui/modal/Modal.model";
import { ButtonType, ButtonAlign, ButtonIcon } from "../ui/button/Button.model";

import InvoiceItemForm from "./InvoiceItemForm.vue";
import InvoiceEntityForm from "./InvoiceEntityForm.vue";
import InvoiceItem from "../invoice/InvoiceItem.vue";
import InvoiceEntity from "../invoice/InvoiceEntity.vue";
import Button from "../ui/button/Button.vue";
import ButtonGroup from "../ui/button/ButtonGroup.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";
import FormText from "../ui/form/text/FormText.vue";
import FormSelect from "../ui/form/select/FormSelect.vue";
import FormNumber from "../ui/form/number/FormNumber.vue";
import Modal from "../ui/modal/Modal.vue";
import Clients from "../clients/Clients.vue";

import {
  savedClients,
  loadClients,
  addClient,
  addNewClient,
  clientIDExists,
  clientExists,
  isClientChanged,
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
    InvoiceItemForm,
    InvoiceEntityForm,
    InvoiceEntity,
    Modal,
    Clients,
  },
  setup() {
    const { t } = useI18n({});

    const show = ref("start");

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
      return clientIDExists(state.invoice.client.id)
        ? isClientChanged(state.invoice.client.id)
          ? true
          : false
        : false;
    });

    const showSaveNewClient = computed(() => {
      if (state.invoice.client.companyName || state.invoice.client.firstName) {
        return !clientExists(state.invoice.client);
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

    return {
      t,
      show,
      block: "invoice-form",
      bem,
      invoice: state.invoice,
      actions: {
        newEntry,
        saveInvoice,
      },
      ModalIdentifier,
      showSaveClient,
      addClient,
      addNewClient,
      savedClients,
      savedInvoices,
      showModal,
      showSaveNewClient,
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
