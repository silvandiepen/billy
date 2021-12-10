import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

import { bem, eventBus, eventChannel } from "../../composables";
import { ButtonType, ButtonAlign, ButtonIcon } from "../ui/button/Button.model";
import { savedInvoices, loadSavedInvoices } from "../../composables/state";

import Button from "../ui/button/Button.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";
import InvoiceForm from "../invoice-form/InvoiceForm.vue";
import InvoiceItem from "../invoice/InvoiceItem.vue";
import { SidepanelAction } from "../ui/sidepanel/Sidepanel.model";

export enum SidebarState {
  START = "start",
  FORM = "form",
}

export default defineComponent({
  components: {
    Knop: Button,
    KnoppenBar: ButtonBar,
    InvoiceForm,
    InvoiceItem,
  },
  setup() {
    const { t } = useI18n({});

    const show = ref(SidebarState.START);

    onMounted(() => {
      loadSavedInvoices();
    });

    const goBack = () => {
      switch (show.value) {
        case SidebarState.START:
          eventBus.emit(eventChannel.SIDEPANEL, {
            action: SidepanelAction.CLOSE,
          });
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

    return {
      t,
      show,
      block: "sidebar",
      bem,
      goBack,
      savedInvoices,
      switchLanguage,
      SidebarState,
      sidebarTitle,
      ButtonType,
      ButtonAlign,
      ButtonIcon,
    };
  },
});
