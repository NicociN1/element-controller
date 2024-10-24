import ElementType from "../types/elementType";
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

export let focusPanel: HTMLDivElement | null = null

export const removeFocusPanel = () => {
  focusPanel?.remove()
  focusPanel = null
}

export const elementFocus = (element: HTMLElement) => {
  if (focusPanel) {
    focusPanel.remove()
  }
  focusPanel = document.createElement('div')
  focusPanel.style.width = `${element.clientWidth}px`
  focusPanel.style.height = `${element.clientHeight}px`
  focusPanel.style.position = "absolute"
  focusPanel.style.top = `${element.getBoundingClientRect().top + window.scrollY}px`
  focusPanel.style.left = `${element.getBoundingClientRect().left + window.scrollX}px`
  focusPanel.style.backgroundColor = `rgba(255, 0, 0, 0.3)`
  focusPanel.style.zIndex = "calc(infinity)"
  focusPanel.style.pointerEvents = "none"
  document.body.appendChild(focusPanel)
}

export const htmlElementToElementType = (element: HTMLElement, index: number) => {
  const allElemData = {
    index: index,
    id: element.id,
    className: element.className,
    style: element.getAttribute("style")
  } as ElementType
  switch (element.tagName) {
    case "VIDEO": {
      const elem = element as HTMLVideoElement;
      return {
        ...allElemData,
        tagName: "VIDEO",
        currentTime: elem.currentTime,
        src: elem.src,
        duration: elem.duration,
        volume: elem.volume,
        muted: elem.muted,
        playbackRate: elem.playbackRate
      } as ElementType;
    }
    case "IMG": {
      const elem = element as HTMLImageElement;
      return {
        ...allElemData,
        tagName: "IMG",
        id: elem.id,
        className: elem.className,
        src: elem.src,
        width: elem.width,
        height: elem.height,
        naturalWidth: elem.naturalWidth,
        naturalHeight: elem.naturalHeight
      } as ElementType;
    }

    default:
      return {
        ...allElemData,
        tagName: element.tagName
      } as ElementType;
  }
}