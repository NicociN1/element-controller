import ParamType from "../types/paramType";

export const controlElement = (elem: HTMLElement, param: ParamType) => {
  switch (param.name) {
    case "id": {
      elem.id = param.value;
      return;
    }
    case "className": {
      elem.className = param.value;
      return;
    }
    case "remove": {
      elem.remove();
      return;
    }
    case "style": {
      elem.setAttribute("style", param.value);
      return;
    }
    case "click": {
      elem.click();
      return;
    }
    case "createPictureInPicture": {
      (async () => {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: elem.clientWidth + 16,
          height: elem.clientHeight + 16,
        });
        pipWindow.document.body.appendChild(elem);
      })();
      return;
    }
    case "requestFullScreen": {
      elem.requestFullscreen({
        navigationUI: "show",
      });
      return;
    }

    default:
      break;
  }
  switch (param.type) {
    case "video": {
      const videoElem = elem as HTMLVideoElement;
      switch (param.name) {
        case "currentTime":
          videoElem.currentTime = param.value;
          break;
        case "play":
          videoElem.play();
          break;
        case "pause":
          videoElem.pause();
          break;
        case "src":
          videoElem.src = param.value;
          break;
        case "volume":
          videoElem.volume = param.value;
          break;
        case "muted":
          videoElem.muted = param.value;
          break;
        case "playbackRate":
          videoElem.playbackRate = param.value;
          break;
        case "requestPictureInPicture":
          videoElem.requestPictureInPicture();
          break;

        default:
          console.warn(`Unsupported property: ${param.name}`);
          break;
      }
      break;
    }
    case "img": {
      const imgElem = elem as HTMLImageElement;
      switch (param.name) {
        case "width":
          imgElem.width = param.value;
          break;

        case "height":
          imgElem.height = param.value;
          break;

        default:
          console.warn(`Unsupported property: ${param.name}`);
          break;
      }
      break;
    }
  }
};
