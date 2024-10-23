export type ParamTagNames = "video" | "audio" | "a" | "img";
export type ParamNames =
  | "id"
  | "className"
  | "click"
  | "remove"
  | "style"
  | "createPictureInPicture"
  | "currentTime"
  | "duration"
  | "src"
  | "playbackRate"
  | "play"
  | "pause"
  | "volume"
  | "muted"
  | "requestPictureInPicture"
  | "width"
  | "height"
  | "naturalWidth"
  | "naturalHeight"

interface BaseParam {
  name: ParamNames;
  value: string | number | boolean;
  type: ParamTagNames;
}

//all
interface IdParam extends BaseParam {
  name: "id"
  value: string
}
interface ClassNameParam extends BaseParam {
  name: "className"
  value: string
}
interface RemoveParam extends BaseParam {
  name: "remove"
}
interface StyleParam extends BaseParam {
  name: "style"
  value: string
}
interface ClickParam extends BaseParam {
  name: "click"
}
interface CreatePictureInPictureParam extends BaseParam {
  name: "createPictureInPicture"
}

//media
interface CurrentTimeParam extends BaseParam {
  name: "currentTime";
  value: number;
  type: "video" | "audio";
}
interface DurationParam extends BaseParam {
  name: "duration";
  value: number;
  type: "video" | "audio";
}
interface SrcParam extends BaseParam {
  name: "src";
  value: string;
  type: "video" | "img" | "a";
}
interface PlayParam extends BaseParam {
  name: "play";
  type: "video";
}
interface PauseParam extends BaseParam {
  name: "pause";
  type: "video";
}
interface VolumeParam extends BaseParam {
  name: "volume"
  value: number
  type: "video"
}
interface IsMutedParam extends BaseParam {
  name: "muted"
  value: boolean
  type: "video"
}
interface PlaybackRate extends BaseParam {
  name: "playbackRate"
  value: number
  type: "video"
}
interface ReqeustPictureInPictureParam extends BaseParam {
  name: "requestPictureInPicture"
  type: "video"
}

//img
interface WidthParam extends BaseParam {
  name: "width";
  value: number;
  type: "img";
}
interface HeightParam extends BaseParam {
  name: "height";
  value: number;
  type: "img";
}
interface NaturalWidthParam extends BaseParam {
  name: "naturalWidth";
  type: "img";
}
interface NaturalHeightParam extends BaseParam {
  name: "naturalHeight";
  type: "img";
}

type ParamType =
  | IdParam
  | ClassNameParam
  | ClickParam
  | RemoveParam
  | StyleParam
  | CreatePictureInPictureParam
  | CurrentTimeParam
  | DurationParam
  | SrcParam
  | PlayParam
  | PauseParam
  | VolumeParam
  | IsMutedParam
  | PlaybackRate
  | ReqeustPictureInPictureParam
  | WidthParam
  | HeightParam
  | NaturalWidthParam
  | NaturalHeightParam
export default ParamType;
