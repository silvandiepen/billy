import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { eventBus, eventChannel } from "../../composables";
import {
  ButtonType,
  ButtonAlign,
  ButtonIcon,
  ButtonDirection,
} from "../ui/button/Button.model";
import {
  savedInvoices,
  loadSavedInvoices,
  hasCurrentInvoice,
  getInvoiceID,
  resetState,
} from "../../composables/state";

import Button from "../ui/button/Button.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";
import ButtonGroup from "../ui/button/ButtonGroup.vue";
import InvoiceForm from "../invoice-form/InvoiceForm.vue";
import InvoiceItem from "../invoice/InvoiceItem.vue";
import {
  SidepanelAction,
  SidepanelEventArguments,
  SidepanelIdentfier,
} from "../ui/sidepanel/Sidepanel.model";

export enum SidebarState {
  START = "start",
  FORM = "form",
}

export default defineComponent({
  components: {
    Knop: Button,
    KnoppenBar: ButtonBar,
    KnoppenGroup: ButtonGroup,
    InvoiceForm,
    InvoiceItem,
  },
  setup() {
    const { t } = useI18n({});

    const style = new Style("control-panel");
    const show = ref(SidebarState.START);

    onMounted(() => {
      loadSavedInvoices();
    });

    const goBack = () => {
      switch (show.value) {
        case SidebarState.START:
          eventBus.emit(eventChannel.SIDEPANEL, {
            action: SidepanelAction.CLOSE,
            identifier: SidepanelIdentfier.MAIN,
            active: false,
          } as SidepanelEventArguments);
          break;
        case SidebarState.FORM:
          show.value = SidebarState.START;
          break;
      }
    };
    const sidebarTitle = computed(() => {
      switch (show.value) {
        case SidebarState.FORM:
          return t("invoice");
        case SidebarState.START:
        default:
          return t("home");
      }
    });

    const switchLanguage = (id: string) => {
      eventBus.emit(eventChannel.SET_LANGUAGE, id);
    };

    const showNext = computed(() => {
      return show.value === SidebarState.START && hasCurrentInvoice();
    });

    const editForm = () => {
      show.value = SidebarState.FORM;
    };

    const showForm = () => {
      resetState();
      show.value = SidebarState.FORM;
    };

    const invoiceName = computed(() => {
      return getInvoiceID();
    });

    const hasInvoice = computed(() => {
      return hasCurrentInvoice();
    });

    return {
      t,
      show,
      style,
      goBack,
      showNext,
      savedInvoices,
      switchLanguage,
      SidebarState,
      sidebarTitle,
      ButtonType,
      ButtonAlign,
      ButtonDirection,
      ButtonIcon,
      showForm,
      editForm,
      hasInvoice,
      invoiceName,
    };
  },
});
