import { onMessage } from "../utils/contentScripts";
import { controlElement } from "../utils/controlElement";
import ElementType from "../types/elementType";

let currentElements: HTMLElement[] = [];

// const includeElements = ["video", "img"];

let focusPanel: HTMLDivElement | null = null

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
          .map((v, i) => {
            const allElemData = {
              index: i,
              id: v.id,
              className: v.className,
              style: v.getAttribute("style")
            } as ElementType
            switch (v.tagName) {
              case "VIDEO": {
                const elem = v as HTMLVideoElement;
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
                const elem = v as HTMLImageElement;
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
                  tagName: v.tagName
                } as ElementType;
            }
          }),
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
      if (focusPanel) {
        focusPanel.remove()
      }
      focusPanel = document.createElement('div')
      focusPanel.style.width = `${targetElement.clientWidth}px`
      focusPanel.style.height = `${targetElement.clientHeight}px`
      focusPanel.style.position = "fixed"
      focusPanel.style.top = `${targetElement.getBoundingClientRect().y}px`
      focusPanel.style.left = `${targetElement.getBoundingClientRect().x}px`
      focusPanel.style.backgroundColor = `rgba(255, 0, 0, 0.3)`
      focusPanel.style.zIndex = "calc(infinity)"
      document.body.appendChild(focusPanel)
      break;
    }

    case "element.send.blur": {
      if (focusPanel) {
        focusPanel.remove()
      }
      focusPanel = null
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

    default:
      break;
  }
});
