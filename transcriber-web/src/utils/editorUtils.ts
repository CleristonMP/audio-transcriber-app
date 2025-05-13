import { EditorState, RichUtils, Modifier } from "draft-js";

export const applyInlineStyle = (editorState: EditorState, style: string): EditorState => {
  return RichUtils.toggleInlineStyle(editorState, style);
};

export const applyBlockType = (editorState: EditorState, blockType: string): EditorState => {
  return RichUtils.toggleBlockType(editorState, blockType);
};

export const clearStyles = (editorState: EditorState): EditorState => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();

  const styles = ["BOLD", "ITALIC", "UNDERLINE"];
  let newContentState = contentState;

  styles.forEach((style) => {
    newContentState = Modifier.removeInlineStyle(newContentState, selection, style);
  });

  return EditorState.push(editorState, newContentState, "change-inline-style");
};