import ElementType from "../types/elementType";
import { ParamUIData } from "../types/paramUIData";

const allParamData = (_elementType: ElementType) =>
    [
        {
            type: "func",
            label: "Click",
            paramName: "click"
        },
        {
            type: "func",
            label: "Remove",
            paramName: "remove"
        },
        {
            "type": "func",
            label: "Create PiP",
            paramName: "createPictureInPicture"
        }
    ] as ParamUIData;

export default allParamData;
