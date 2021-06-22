import type { OutputData } from "@editorjs/editorjs";
import type { LayoutBlockToolConfig } from "../LayoutBlockTool";
declare const createDialog: ({ EditorJS, data, editorJSConfig, onClose, }: {
    EditorJS: LayoutBlockToolConfig["EditorJS"];
    data: OutputData;
    editorJSConfig: LayoutBlockToolConfig["editorJSConfig"];
    onClose?: ((event: {
        editorJSData: OutputData;
    }) => void) | undefined;
}) => void;
export { createDialog };
