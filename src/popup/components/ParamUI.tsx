import { Button, Input, InputNumber, Switch } from "antd";
import { ParamUIData } from "../../types/paramUIData";
import styled from "@emotion/styled";
import { sendElementControl } from "../../utils/popups";
import ParamType from "../../types/paramType";

interface ParamUIProps {
  data: ParamUIData;
  elementIndex: number;
}

const FullWidthButton = styled(Button)`
  width: 100%;
  height: 100%;
  grid-column: 1 / 3;
`;
const StyledInput = styled(Input)`
  margin: auto;
`
const StyledInputNumber = styled(InputNumber)`
  margin: auto;
`
const StyledSwitch = styled(Switch)`
  width: 48px;
  margin: auto;
`
const LabelContainer = styled.span`
  width: 100%;
  height: 100%;
  align-content: center;
  &:hover {
    text-decoration: underline;
  }
`

const ParamUI = (props: ParamUIProps) => {
  return (
    <>
      {props.data.map((p) => {
        if (p.type === "str") {
          return (
            <>
              <LabelContainer>{p.label}</LabelContainer>
              <StyledInput
                defaultValue={p.defaultValue}
                onChange={(e) => {
                  sendElementControl(props.elementIndex, {
                    name: p.paramName,
                    value: e.target.value,
                    type: p.paramTagName,
                  } as ParamType);
                }}
              />
            </>
          );
        } else if (p.type === "num") {
          return (
            <>
              <LabelContainer>{p.label}</LabelContainer>
              <StyledInputNumber
                defaultValue={p.defaultValue}
                step={p.step}
                onChange={(v) => {
                  if (v == null) return;
                  sendElementControl(props.elementIndex, {
                    name: p.paramName,
                    value: v,
                    type: p.paramTagName,
                  } as ParamType);
                  console.log(v)
                }}
              />
            </>
          );
        } else if (p.type === "func") {
          return (
            <FullWidthButton
              onClick={() => {
                sendElementControl(props.elementIndex, {
                  name: p.paramName,
                  type: p.paramTagName,
                } as ParamType);
              }}
            >
              {p.label}
            </FullWidthButton>
          );
        }
        else if (p.type === "display") {
          return (
            <FullWidthButton disabled>
              {p.label}: {p.value}
            </FullWidthButton>
          );
        } else if (p.type === "bool") {
          return (
            <>
              <LabelContainer>{p.label}</LabelContainer>
              <StyledSwitch defaultChecked={p.defaultValue} onChange={(v: boolean) => {
                sendElementControl(props.elementIndex, {
                  name: p.paramName,
                  value: v,
                  type: p.paramTagName,
                } as ParamType);
              }} />
            </>
          )
        }
      })}
    </>
  );
};

export default ParamUI;
