import { ParamNames, ParamTagNames } from "./paramType";

interface ParamUIBase {
    label: string;
    type: string;
}
interface ParamUINumber extends ParamUIBase {
    type: "num";
    paramName: ParamNames;
    paramTagName: ParamTagNames;
    defaultValue: number;
    step: number
}
interface ParamUIString extends ParamUIBase {
    type: "str";
    paramName: ParamNames;
    paramTagName: ParamTagNames;
    defaultValue: string;
}
interface ParamUIFunction extends ParamUIBase {
    type: "func";
    paramName: ParamNames;
    paramTagName: ParamTagNames;
}
interface ParamUIBool extends ParamUIBase {
    type: "bool";
    paramName: ParamNames;
    paramTagName: ParamTagNames;
    defaultValue: boolean
}
interface ParamDisplay extends ParamUIBase {
    type: "display";
    value: string;
}
export type ParamUIData = (
    | ParamUINumber
    | ParamUIString
    | ParamUIFunction
    | ParamDisplay
    | ParamUIBool
)[];
