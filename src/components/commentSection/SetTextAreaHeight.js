export const SetTextAreaHeight = (event, defaultHeight, isCancel) => {
  const textArea = event.target ? event.target : event;
  if (isCancel) {
    textArea.style.minHeight = defaultHeight;
  } else {
    textArea.style.minHeight = defaultHeight;

    textArea.style.minHeight = `${textArea.scrollHeight}px`;
  }
};
