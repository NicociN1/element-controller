import MessageType from "../types/messageType";

export const sendMessage = (
  message: MessageType,
  responseCallback: (response: MessageType) => void,
) => {
  chrome.runtime.sendMessage(message, responseCallback);
};
export const onMessage = (
  callback: (
    message: MessageType,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: MessageType) => void,
  ) => void,
) => {
  chrome.runtime.onMessage.addListener(callback);
};
