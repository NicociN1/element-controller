import { elementFocus, focusPanel, htmlElementToElementType, onMessage, removeFocusPanel } from "../utils/contentScripts";
import { controlElement } from "../utils/controlElement";

let currentElements: HTMLElement[] = [];

// const includeElements = ["video", "img"];

onMessage((message, _sender, sendResponse) => {
  switch (message.action) {
    case "elements.get.all": {
      const allElements = ([
        ...document.querySelectorAll("*"),
      ] as HTMLElement[])
        .filter(e => typeof e.className === "string");
      console.log(allElements.filter(e => e.tagName === "path"))
      currentElements = allElements;
      sendResponse({
        action: "elements.send.all",
        elements: allElements
          .map((v, i) => htmlElementToElementType(v, i)),
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
        behavior: "smooth"
      })
      break;
    }

    case "element.send.focus": {
      const targetElement = currentElements[message.elementIndex];
      elementFocus(targetElement)
      break;
    }

    case "element.send.blur": {
      removeFocusPanel()
      break;
    }

    case "element.get.preview": {
      ; (async () => {
        const targetElement = currentElements[message.elementIndex];

        console.log(targetElement.tagName)
        if (["IMG"].includes(targetElement.tagName)) {
          const imageElement = targetElement as HTMLImageElement
          const imageData = await fetch((imageElement).src)
          const blob = await imageData.blob()
          const blobUrl = URL.createObjectURL(blob)
          sendResponse({
            action: "element.send.preview",
            srcUrl: blobUrl
          })
        } else if (targetElement.tagName === "VIDEO") {
          const videoElement = targetElement as HTMLVideoElement
          const cnv = document.createElement('canvas')
          const ctx = cnv.getContext('2d')

          if (!ctx) {
            sendResponse({ action: "element.send.preview", srcUrl: null })
            return
          }

          cnv.width = videoElement.videoWidth;
          cnv.height = videoElement.videoHeight;

          ctx.drawImage(videoElement, 0, 0, cnv.width, cnv.height)

          const dataUrl = cnv.toDataURL("image/jpeg")
          sendResponse({ action: "element.send.preview", srcUrl: dataUrl })
        } else {
          sendResponse({ action: "element.send.preview", srcUrl: null })
        }
      })()
      return true
    }

    case "element.get.pick": {
      const handleMouseOver = (e: MouseEvent) => {
        if (e.target) {
          elementFocus(e.target as HTMLElement)
          e.preventDefault()
        } else {
          focusPanel?.remove()
        }
      }
      const handleClick = (e: MouseEvent) => {
        if (!e.target) return
        e.preventDefault()
        e.stopPropagation()
        endPicker()
        console.log(e.target)
        const elementIndex = currentElements.findIndex(el => el === e.target)
        sendResponse({
          action: "element.send.pick",
          elementIndex: elementIndex
        })
      }
      const endPicker = () => {
        document.removeEventListener('mouseover', handleMouseOver, true)
        document.removeEventListener('click', handleClick, true)
        removeFocusPanel()
      }
      document.addEventListener('mouseover', handleMouseOver, true)
      document.addEventListener('click', handleClick, true)
      return true
    }

    case "element.get.update": {
      const targetElement = currentElements[message.elementIndex]
      console.log(targetElement)
      sendResponse({
        action: "element.send.update",
        element: htmlElementToElementType(targetElement, message.elementIndex)
      })
      break;
    }

    default:
      break;
  }
});
