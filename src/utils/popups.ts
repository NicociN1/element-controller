import MessageType from "../types/messageType";
import ParamType from "../types/paramType";

export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
  });
  return tab;
}

export const sendMessage = (
  tabId: number,
  message: MessageType,
  responseCallback?: (response: MessageType) => void,
) => {
  chrome.tabs.sendMessage(tabId, message, responseCallback ?? (() => {}));
};

export const sendElementControl = async (
  elementIndex: number,
  param: ParamType,
) => {
  sendMessage((await getCurrentTab()).id!, {
    action: "element.send.control",
    elementIndex: elementIndex,
    param: param,
  });
};
