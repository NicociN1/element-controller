import ElementType from "../types/elementType";
import allParamData from "./allParamData";
import imgParamData from "./imgParamData";
import videoParamData from "./videoParamData";

const paramData = (elementType: ElementType) => {
    switch (elementType.tagName) {
        case "VIDEO":
            return [...allParamData(elementType), ...videoParamData(elementType)];

        case "IMG":
            return [...allParamData(elementType), ...imgParamData(elementType)]

        default:
            return allParamData(elementType)
    }
};

export default paramData;
