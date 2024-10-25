import { ElementVideo } from "../types/elementType";
import { ParamUIData } from "../types/paramUIData";

const videoParamData = (elementType: ElementVideo) =>
  [
    {
      type: "str",
      label: "Source URL",
      defaultValue: elementType.src,
      paramTagName: "video",
      paramName: "src",
    },
    {
      type: "num",
      label: "Current Time",
      defaultValue: Math.floor(elementType.currentTime * 10) / 10,
      paramTagName: "video",
      paramName: "currentTime",
      step: 1,
    },
    {
      type: "num",
      label: "Volume",
      defaultValue: Math.floor(elementType.volume * 10) / 10,
      paramName: "volume",
      paramTagName: "video",
      step: 0.1,
    },
    {
      type: "bool",
      label: "Muted",
      defaultValue: elementType.muted,
      paramName: "muted",
      paramTagName: "video",
    },
    {
      type: "num",
      label: "Playback Rate",
      defaultValue: elementType.playbackRate,
      paramName: "playbackRate",
      paramTagName: "video",
      step: 0.1,
    },
    {
      type: "func",
      label: "Play",
      paramTagName: "video",
      paramName: "play",
    },
    {
      type: "func",
      label: "Pause",
      paramTagName: "video",
      paramName: "pause",
    },
    {
      type: "func",
      label: "Request PiP",
      paramName: "requestPictureInPicture",
      paramTagName: "video",
    },
  ] as ParamUIData;

export default videoParamData;
