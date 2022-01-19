import { defineComponent, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { downloadFile } from "../../composables";
import {
  newEntry,
  newNote,
  saveInvoice,
  savedInvoices,
  getInvoiceID,
  getCurrentInvoiceData,
  getInvoice,
} from "../../composables/state";
import { ModalIdentifier } from "../ui/Modal/Modal.model";
import { ButtonType, ButtonAlign, ButtonIcon } from "../ui/Button/Button.model";

import {
  InvoiceItemFormComponent,
  InvoiceEntityFormComponent,
  InvoiceNoteFormComponent,
} from ".";

import { InvoiceItemComponent, InvoiceEntityComponent } from "../Invoice";
import { EntitiesComponent } from "../Entity";

import {
  ButtonComponent,
  ButtonGroupComponent,
  ButtonBarComponent,
  FormTextComponent,
  FormSelectComponent,
  FormNumberComponent,
  FormTextAreaComponent,
  ModalComponent,
} from "../ui";

import { loadClients, Entity } from "../Entity";

export default defineComponent({
  components: {
    InvoiceItem: InvoiceItemComponent,
    Knop: ButtonComponent,
    Knoppen: ButtonGroupComponent,
    KnoppenBar: ButtonBarComponent,
    FormText: FormTextComponent,
    FormSelect: FormSelectComponent,
    FormNumber: FormNumberComponent,
    FormTextArea: FormTextAreaComponent,
    InvoiceItemForm: InvoiceItemFormComponent,
    InvoiceNoteForm: InvoiceNoteFormComponent,
    InvoiceEntityForm: InvoiceEntityFormComponent,
    InvoiceEntity: InvoiceEntityComponent,
    Modal: ModalComponent,
    Entities: EntitiesComponent,
  },
  setup() {
    const { t } = useI18n({});
    const style = new Style("invoice-form");

    onMounted(() => {
      loadClients();
    });

    const currencyOptions = [
      { value: "EUR", label: t("currency.eur") },
      { value: "USD", label: t("currency.usd") },
    ];

    const invoice = computed(() => {
      return getInvoice();
    });

    /*

      Actions

    */

    const exportInvoice = () => {
      const fileName = getInvoiceID() + ".billy";
      const fileData = getCurrentInvoiceData();

      downloadFile(fileName, fileData);
    };

    return {
      t,
      style,
      invoice,
      actions: {
        newEntry,
        saveInvoice,
        newNote,
        export: exportInvoice,
      },
      Entity,
      ModalIdentifier,
      savedInvoices,
      currencyOptions,
      ButtonType,
      ButtonIcon,
      ButtonAlign,
    };
  },
});
