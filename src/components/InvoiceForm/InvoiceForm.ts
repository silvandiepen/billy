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
  InvoiceSettingsFormComponent,
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

    const showExport = computed(() => {
      return true;
    });
    const showSave = computed(() => {
      return true;
    });
    const showActions = computed(() => {
      return false;
      // return showExport || showSave;
    });

    return {
      t,
      style,
      invoice,
      show: {
        actions: showActions,
        export: showExport,
        save: showSave,
      },
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
