export interface TaskItem {
  id: number;
  description: string;
}

export enum DialogType {
  CONTENT_TEXT = "CONTENT_TEXT",
  CONTENT_FORM = "CONTENT_FORM"
}

export interface TaskDialog {
  type: DialogType;
  title: string;
  description?: string;
  contentText?: string;
}
