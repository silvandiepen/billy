import { defineComponent, onMounted, computed, watch, watchEffect } from "vue";
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
  getInvoiceStatus,
  invoiceStatus,
} from "../../composables/state";
import { ModalIdentifier } from "../ui/Modal/Modal.model";
import { ButtonType, ButtonAlign, ButtonIcon } from "../ui/Button/Button.model";

import {
  InvoiceItemFormComponent,
  InvoiceEntityFormComponent,
  InvoiceNoteFormComponent,
  InvoiceSettingsFormComponent,
} from ".";

import { InvoiceItemComponent, InvoiceEntityComponent } from "../Invoice";
import { EntitiesComponent } from "../Entity";

import {
  ButtonComponent,
  ButtonGroupComponent,
  ButtonBarComponent,
  FormTextAreaComponent,
} from "../ui";

import { loadClients, Entity } from "../Entity";

export default defineComponent({
  components: {
    UIButton: ButtonComponent,
    UIButtonBar: ButtonBarComponent,
    UIButtonGroup: ButtonGroupComponent,
    UIFormTextArea: FormTextAreaComponent,
    InvoiceItem: InvoiceItemComponent,
    InvoiceItemForm: InvoiceItemFormComponent,
    InvoiceNoteForm: InvoiceNoteFormComponent,
    InvoiceSettingsForm: InvoiceSettingsFormComponent,
    InvoiceEntityForm: InvoiceEntityFormComponent,
    InvoiceEntity: InvoiceEntityComponent,
    Entities: EntitiesComponent,
  },
  setup() {
    const { t } = useI18n({});
    const style = new Style("invoice-form");

    onMounted(() => {
      loadClients();
    });

    /*

      Actions

    */

    const exportInvoice = () => {
      const fileName = getInvoiceID() + ".billy";
      const fileData = getCurrentInvoiceData();

      downloadFile(fileName, fileData);
    };

    const showExport = computed(() => {
      return true;
    });

    watch(
      () => invoiceStatus.isChanged,
      () => {
        console.log("state changed - in component", showSave.value);
      }
    );

    const showUpdate = computed(() => {
      return invoiceStatus.isChanged;
    });

    const showSave = computed(() => {
      return invoiceStatus.isNew;
    });

    const showActions = computed(() => {
      return showExport || showSave;
    });

    return {
      t,
      style,
      invoice: getInvoice.value,
      showActions,
      showExport,
      showSave,
      showUpdate,
      actions: {
        newEntry,
        saveInvoice,
        newNote,
        export: exportInvoice,
      },
      Entity,
      ModalIdentifier,
      savedInvoices,
      ButtonType,
      ButtonIcon,
      ButtonAlign,
    };
  },
});
