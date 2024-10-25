interface BaseElement {
  index: number;
  tagName: string;
  id: string;
  className: string;
  style: string;
}

export interface ElementVideo extends BaseElement {
  tagName: "VIDEO";
  currentTime: number;
  src: string;
  duration: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
}
export interface ElementImg extends BaseElement {
  tagName: "IMG";
  src: string;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
}

type ElementType = ElementVideo | ElementImg;
export default ElementType;
