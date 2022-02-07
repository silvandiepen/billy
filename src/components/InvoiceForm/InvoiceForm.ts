import { defineComponent, onMounted, computed, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";
// import * as createDocument from "@sil/create-document";
// import * as html2canvasWrong from "html2canvas";
// const html2canvas = html2canvasWrong as any as (
//   element: HTMLElement,
//   options?: Partial<html2canvasWrong.Options>
// ) => Promise<HTMLCanvasElement>;

import { downloadFile } from "../../composables";
import {
  newEntry,
  newNote,
  saveInvoice,
  savedInvoices,
  getInvoiceID,
  getCurrentInvoiceData,
  getInvoice,
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

    const toPdf = async () => {
      const element: HTMLElement = document.querySelector(
        "#invoice-document"
      ) as HTMLElement;

      // console.log(createDocument);
      // if (element) {
      //   await createDocument({
      //     element: element,
      //   });
      // }
      // var opt = {
      //   margin: 1,
      //   filename: "myfile.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      //   html2canvas: html2canvas,
      // };

      // // New Promise-based usage:
      // const pdf = html2pdf().from(element).set(opt).save();

      console.log("does something");
    };

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
        toPdf,
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
