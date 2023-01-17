import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useBemm } from "bemm";

import { eventBus, eventChannel } from "../../composables";

import ButtonComponent from "../ui/Button/Button.vue";
import ButtonBarComponent from "../ui/Button/ButtonBar.vue";
import ButtonGroupComponent from "../ui/Button/ButtonGroup.vue";

import {
  ButtonType,
  ButtonAlign,
  ButtonIcon,
  ButtonSize,
  ButtonDirection,
  SidepanelAction,
  SidepanelEventArguments,
  SidepanelIdentfier,
} from "../ui";

import {
  savedInvoices,
  loadSavedInvoices,
  hasCurrentInvoice,
  getInvoiceID,
  resetState,
} from "../../composables/state";

import InvoiceFormComponent from "../InvoiceForm/InvoiceForm.vue";
import InvoiceItemComponent from "../Invoice/InvoiceItem.vue";

export enum SidebarState {
  START = "start",
  FORM = "form",
}

export default defineComponent({
  components: {
    Knop: ButtonComponent,
    KnoppenBar: ButtonBarComponent,
    KnoppenGroup: ButtonGroupComponent,
    InvoiceForm: InvoiceFormComponent,
    InvoiceItem: InvoiceItemComponent,
  },
  setup() {
    const { t } = useI18n({});

    const bemm = useBemm("control-panel");
  
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
      bemm,
      goBack,
      showNext,
      savedInvoices,
      switchLanguage,
      SidebarState,
      sidebarTitle,
      ButtonType,
      ButtonSize,
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
