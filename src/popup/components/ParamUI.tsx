import { Button, Input, InputNumber, Switch } from "antd";
import { ParamUIData } from "../../types/paramUIData";
import styled from "@emotion/styled";
import { sendElementControl } from "../../utils/popups";
import ParamType from "../../types/paramType";
import { useEffect, useState } from "react";

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
`;
const StyledInputNumber = styled(InputNumber)`
  margin: auto;
`;
const StyledSwitch = styled(Switch)`
  width: 48px;
  margin: auto;
`;
const LabelContainer = styled.span`
  width: 100%;
  height: 100%;
  align-content: center;
  &:hover {
    text-decoration: underline;
  }
`;

const ParamUI = (props: ParamUIProps) => {
  const [inputValues, setInputValues] = useState<
    (string | number | boolean | null)[]
  >(
    props.data.map((x) => {
      if (x.type === "str" || x.type === "num" || x.type === "bool") {
        return x.defaultValue;
      } else {
        return null;
      }
    }),
  );

  useEffect(() => {
    setInputValues(
      props.data.map((x) => {
        if (x.type === "str" || x.type === "num" || x.type === "bool") {
          return x.defaultValue;
        } else {
          return null;
        }
      }),
    );
  }, [props.data]);

  const updateInputValue = (
    index: number,
    value: string | number | boolean,
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <>
      {props.data.map((p, i) => {
        if (p.type === "str") {
          return (
            <>
              <LabelContainer>{p.label}</LabelContainer>
              <StyledInput
                value={inputValues[i] as string}
                onChange={(e) => {
                  sendElementControl(props.elementIndex, {
                    name: p.paramName,
                    value: e.target.value,
                    type: p.paramTagName,
                  } as ParamType);
                  updateInputValue(i, e.target.value);
                }}
              />
            </>
          );
        } else if (p.type === "num") {
          return (
            <>
              <LabelContainer>{p.label}</LabelContainer>
              <StyledInputNumber
                value={inputValues[i] as number}
                step={p.step}
                onChange={(v) => {
                  if (v == null) return;
                  sendElementControl(props.elementIndex, {
                    name: p.paramName,
                    value: v,
                    type: p.paramTagName,
                  } as ParamType);
                  updateInputValue(i, v);
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
        } else if (p.type === "display") {
          return (
            <FullWidthButton disabled>
              {p.label}: {p.value}
            </FullWidthButton>
          );
        } else if (p.type === "bool") {
          return (
            <>
              <LabelContainer>{p.label}</LabelContainer>
              <StyledSwitch
                checked={inputValues[i] as boolean}
                onChange={(v: boolean) => {
                  sendElementControl(props.elementIndex, {
                    name: p.paramName,
                    value: v,
                    type: p.paramTagName,
                  } as ParamType);
                  updateInputValue(i, v);
                }}
              />
            </>
          );
        }
      })}
    </>
  );
};

export default ParamUI;
