import ElementType from "../types/elementType";
import ParamType from "./paramType";

interface MsgBase {
  action: string;
}
interface MsgActionGetAllElements extends MsgBase {
  action: "elements.get.all";
}
interface MsgActionSendAllElements extends MsgBase {
  action: "elements.send.all";
  elements: ElementType[];
}
interface MsgActionGetUpdateElement extends MsgBase {
  action: "element.get.update";
  elementIndex: number;
}
interface MsgActionSendUpdateElement extends MsgBase {
  action: "element.send.update";
  element?: ElementType;
}
interface MsgActionControlElement extends MsgBase {
  action: "element.send.control";
  elementIndex: number;
  param: ParamType;
}
interface MsgActionScrollElement extends MsgBase {
  action: "element.send.scroll";
  elementIndex: number;
}
interface MsgActionFocusElement extends MsgBase {
  action: "element.send.focus";
  elementIndex: number;
}
interface MsgActionBlurElement extends MsgBase {
  action: "element.send.blur";
}
interface MsgActionGetElementPeview extends MsgBase {
  action: "element.get.preview";
  elementIndex: number;
}
interface MsgActionSendElementPeview extends MsgBase {
  action: "element.send.preview";
  srcUrl: string | boolean | null;
}
interface MsgActionGetPickElement extends MsgBase {
  action: "element.get.pick";
}
interface MsgActionSendPickElement extends MsgBase {
  action: "element.send.pick";
  elementIndex: number;
}
interface MsgActionCancelPickElement extends MsgBase {
  action: "element.send.cancelpick";
}

type MessageType =
  | MsgActionGetAllElements
  | MsgActionSendAllElements
  | MsgActionGetUpdateElement
  | MsgActionSendUpdateElement
  | MsgActionControlElement
  | MsgActionScrollElement
  | MsgActionFocusElement
  | MsgActionBlurElement
  | MsgActionGetElementPeview
  | MsgActionSendElementPeview
  | MsgActionGetPickElement
  | MsgActionSendPickElement
  | MsgActionCancelPickElement;
export default MessageType;
