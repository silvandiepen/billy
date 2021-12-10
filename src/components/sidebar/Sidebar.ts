import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import { bem, eventBus, eventChannel } from "../../composables";
import { ButtonType, ButtonAlign } from "../ui/button/Button.model";

import Button from "../ui/button/Button.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";
import InvoiceForm from "../invoice-form/InvoiceForm.vue";

export default defineComponent({
  components: {
    Knop: Button,
    KnoppenBar: ButtonBar,
    InvoiceForm,
  },
  setup() {
    const { t } = useI18n({});

    const show = ref("start");

    const switchLanguage = (id: string) => {
      eventBus.emit(eventChannel.SET_LANGUAGE, id);
    };

    return {
      t,
      show,
      block: "sidebar",
      bem,
      switchLanguage,
      ButtonType,
      ButtonAlign,
    };
  },
});
