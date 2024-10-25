import {
  elementFocus,
  htmlElementToElementType,
  onMessage,
  removeFocusPanel,
  startPickElement,
  stopPickElement,
} from "../utils/contentScripts";
import { controlElement } from "../utils/controlElement";

let currentElements: HTMLElement[] = [];

onMessage((message, _sender, sendResponse) => {
  switch (message.action) {
    case "elements.get.all": {
      const allElements = (
        [...document.querySelectorAll("*")] as HTMLElement[]
      ).filter((e) => typeof e.className === "string");
      currentElements = allElements;
      sendResponse({
        action: "elements.send.all",
        elements: allElements.map((v, i) => htmlElementToElementType(v, i)),
      });
      break;
    }

    case "element.send.control": {
      const targetElement = currentElements[message.elementIndex];
      controlElement(targetElement, message.param);
      break;
    }

    case "element.send.scroll": {
      const targetElement = currentElements[message.elementIndex];
      targetElement.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
      break;
    }

    case "element.send.focus": {
      const targetElement = currentElements[message.elementIndex];
      elementFocus(targetElement);
      break;
    }

    case "element.send.blur": {
      removeFocusPanel();
      break;
    }

    case "element.get.preview": {
      (async () => {
        const targetElement = currentElements[message.elementIndex];

        console.log(targetElement.tagName);
        if (["IMG"].includes(targetElement.tagName)) {
          const imageElement = targetElement as HTMLImageElement;
          const imageData = await fetch(imageElement.src);
          const blob = await imageData.blob();
          const blobUrl = URL.createObjectURL(blob);
          sendResponse({
            action: "element.send.preview",
            srcUrl: blobUrl,
          });
        } else if (targetElement.tagName === "VIDEO") {
          const videoElement = targetElement as HTMLVideoElement;
          const cnv = document.createElement("canvas");
          const ctx = cnv.getContext("2d");

          if (!ctx) {
            sendResponse({ action: "element.send.preview", srcUrl: false });
            return;
          }

          cnv.width = videoElement.videoWidth;
          cnv.height = videoElement.videoHeight;

          ctx.drawImage(videoElement, 0, 0, cnv.width, cnv.height);

          const dataUrl = cnv.toDataURL("image/jpeg");
          sendResponse({ action: "element.send.preview", srcUrl: dataUrl });
        } else {
          console.log("send false");
          sendResponse({ action: "element.send.preview", srcUrl: false });
        }
      })();
      return true;
    }

    case "element.get.pick": {
      startPickElement(currentElements, (elementIndex) => {
        sendResponse({
          action: "element.send.pick",
          elementIndex: elementIndex,
        });
      });
      return true;
    }

    case "element.send.cancelpick": {
      stopPickElement();
      break;
    }

    case "element.get.update": {
      const targetElement = currentElements[message.elementIndex];
      console.log(targetElement);
      sendResponse({
        action: "element.send.update",
        element: htmlElementToElementType(targetElement, message.elementIndex),
      });
      break;
    }

    default:
      break;
  }
});
