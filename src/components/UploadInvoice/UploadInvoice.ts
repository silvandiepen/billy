import { defineComponent, ref } from "vue";
import { Style } from "@sil/tools";
import { setInvoiceData } from "../../composables/state";
import { eventBus, eventChannel } from "../../composables";
import { ModalAction, ModalIdentifier } from "../ui";

export default defineComponent({
  setup() {
    const style = new Style("upload-invoice");
    const fileInput = ref<HTMLInputElement | null>(null);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (reader.result) {
        const invoice = JSON.parse(reader.result.toString());
        setInvoiceData(invoice);

        eventBus.emit(eventChannel.MODAL, {
          identifier: ModalIdentifier.UPLOAD_INVOICE,
          action: ModalAction.CLOSE,
        });
      }
    });

    const handleFileUpload = async () => {
      let data: any;
      const uploadedFiles = fileInput.value?.files;

      if (uploadedFiles) {
        reader.readAsText(uploadedFiles[0]);
      }
    };
    return {
      style,
      fileInput,
      handleFileUpload,
    };
  },
});
