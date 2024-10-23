import { ElementImg } from "../types/elementType";
import { ParamUIData } from "../types/paramUIData";

const imgParamData = (elementType: ElementImg) =>
  [
    {
      type: "num",
      paramTagName: "img",
      paramName: "width",
      label: "Width",
      defaultValue: elementType.width,
      step: 1
    },
    {
      type: "num",
      paramTagName: "img",
      paramName: "height",
      label: "Height",
      defaultValue: elementType.height,
      step: 1
    },
    {
      type: "str",
      paramTagName: "img",
      paramName: "src",
      label: "Src URL",
      defaultValue: elementType.src
    },
    {
      type: "display",
      label: "Natural Width",
      value: elementType.naturalWidth
    },
    {
      type: "display",
      label: "Natural Height",
      value: elementType.naturalHeight
    }
  ] as ParamUIData;

export default imgParamData;
