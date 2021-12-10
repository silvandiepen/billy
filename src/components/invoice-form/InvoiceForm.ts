import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

import { bem, eventBus, eventChannel } from "../../composables";
import {
  state,
  newEntry,
  saveInvoiceToStore,
  savedInvoices,
  loadInvoices,
} from "../../composables/state";
import { ModalAction, ModalIdentifier } from "../ui/modal/Modal.model";
import { ButtonType, ButtonAlign } from "../ui/button/Button.model";

import InvoiceItemForm from "./InvoiceEditItem.vue";
import InvoiceEntityForm from "./InvoiceEditEntity.vue";
import InvoiceItem from "../invoice/InvoiceItem.vue";
import Button from "../ui/button/Button.vue";
import ButtonGroup from "../ui/button/ButtonGroup.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";
import FormText from "../ui/form/text/FormText.vue";
import FormSelect from "../ui/form/select/FormSelect.vue";
import FormNumber from "../ui/form/number/FormNumber.vue";

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
  },
  setup() {
    const { t } = useI18n({});

    const show = ref("start");

    onMounted(() => {
      loadClients();
      loadInvoices();
    });

    const showClientModal = () => {
      eventBus.emit(eventChannel.MODAL, {
        action: ModalAction.OPEN,
        identifier: ModalIdentifier.CLIENT,
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

    return {
      t,
      show,
      block: "invoice-edit",
      bem,
      invoice: state.invoice,
      actions: {
        newEntry,
        saveInvoice,
      },
      showSaveClient,
      addClient,
      addNewClient,
      savedClients,
      savedInvoices,
      showClientModal,
      showSaveNewClient,
      switchLanguage,
      currencyOptions,
      ButtonType,
      ButtonAlign,
    };
  },
});
