import type { OutputData } from "@editorjs/editorjs";
import { Modal as modalBo } from "bootstrap";
import { v4 as uuidv4 } from "uuid";
import type { LayoutBlockToolConfig } from "../LayoutBlockTool";

const createDialog = ({
  EditorJS,
  data,
  editorJSConfig,
  onClose,
}: {
  EditorJS: LayoutBlockToolConfig["EditorJS"];
  data: OutputData;
  editorJSConfig: LayoutBlockToolConfig["editorJSConfig"];
  onClose?: (event: { editorJSData: OutputData }) => void;
}) => {
  const modalHtml = document.createElement("div");
  const modalId = uuidv4();
  modalHtml.id = modalId;
  modalHtml.className = "modal";

  const dialog = document.createElement("div");
  dialog.className = "modal-dialog";

  const dialogContent = document.createElement("div");
  dialogContent.className = "modal-content";

  const headerHtml = document.createElement("div");
  headerHtml.className = "modal-header";

  const titleHtml = document.createElement("div");
  titleHtml.className = "modal-title";
  titleHtml.innerHTML = "EditorJS Layout";

  const buttonHTML = document.createElement("div");
  buttonHTML.className = "btn-close";
  buttonHTML.setAttribute("data-bs-dismiss", "modal");

  const editorJSHolder = document.createElement("div");
  const editorJSHolderID = uuidv4();
  editorJSHolder.id = editorJSHolderID;
  editorJSHolder.className = "modal-body";

  headerHtml.append(titleHtml);
  headerHtml.append(buttonHTML);
  dialogContent.append(headerHtml);
  dialogContent.append(editorJSHolder);
  dialog.append(dialogContent);
  modalHtml.append(dialog);

  document.body.append(modalHtml);

  const editorJS = new EditorJS({
    ...editorJSConfig,
    holder: editorJSHolderID,
    data,
  });

  var options = {
    backdrop: true,
  };
  var element = document.getElementById(modalId)!;
  const modal = new modalBo(element, options);
  modal.show();
  
  console.log(element);

  element.addEventListener("hide.bs.modal", async function (event) {
   
    const editorJSData = await editorJS.save();
    editorJS.destroy();
    onClose?.({ editorJSData });
    element.remove();
  });
};

export { createDialog };
