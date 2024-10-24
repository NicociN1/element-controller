import { Button, Input, Pagination } from "antd";
import "./Popup.css";
import styled from "@emotion/styled";
import { getCurrentTab, sendMessage } from "../utils/popups";
import MessageType from "../types/messageType";
import ElementType from "../types/elementType";
import { useEffect, useRef, useState } from "react";
import ElementListItem from "./components/ElementListItem";
import { EnterOutlined } from "@ant-design/icons";
import { elementTypeToDisplayName } from "../utils/elements";
import paramData from "../paramData/paramData";
import ParamUI from "./components/ParamUI";
import { ParamUIData } from "../types/paramUIData";

const PopupWrapper = styled.div`
  margin: 8px;
`
const TopMenuContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;
const ElementsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 8px;
  overflow: hidden scroll;
  scrollbar-width: none;
  width: 100%;
`
const ControlMenuHeader = styled.header`
  width: 100%;
  height: 32px;
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  margin-bottom: 16px;
`;
const ControlMenuTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: large;
  font: bold;
`;
const ElementCountContainer = styled.div`
  font: bold;
  font-size: 18px;
  margin-top: 8px;
`;

const ListMenuContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`
const ParamsContainer = styled.div`
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(auto-fill, 32px);
  align-items: center;
  font-size: larger;
  grid-gap: 8px;
`;

type PageState = "listMenu" | "controlMenu";

function Popup() {
  const [pageState, setPageState] = useState<PageState>("listMenu");
  const [viewElements, setViewElements] = useState<ElementType[]>([]);
  const [currentElement, setCurrentElement] = useState<ElementType | null>(
    null,
  );
  const [searchWords, setSearchWords] = useState<string>(localStorage.getItem("elemcontroller-searchwords") ?? "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paramComp, setParamComp] = useState<ParamUIData | null>(null)
  const elementsRef = useRef<ElementType[]>([]);

  useEffect(() => {
    updateElements();
  }, []);
  const updateElements = async () => {
    if (pageState !== "controlMenu") {
      sendMessage(
        (await getCurrentTab()).id!,
        { action: "elements.get.all" } as MessageType,
        (res: MessageType) => {
          if (res.action !== "elements.send.all") return;
          setViewElements(res.elements);
          elementsRef.current = res.elements;
          applySearch()
        },
      );
    } else {
      if (!currentElement) return
      sendMessage(
        (await getCurrentTab()).id!,
        { action: "element.get.update", elementIndex: currentElement.index },
        (res: MessageType) => {
          if (res.action !== "element.send.update") return
          if (!res.element) return
          setCurrentElement(res.element)
        }
      )
    }
  };
  const listItemClickHandle = (elementType: ElementType) => {
    setCurrentElement(elementType);
    setPageState("controlMenu");
  };

  useEffect(() => {
    applySearch()
  }, [searchWords])
  const applySearch = () => {
    setViewElements(elementsRef.current.filter((el) =>
    (searchWords.length > 0
      ? searchWords.split(" ").every(w => elementTypeToDisplayName(el).includes(w))
      : true)))
    localStorage.setItem("elemcontroller-searchwords", searchWords)
  }

  const pickElement = async () => {
    sendMessage((await getCurrentTab()).id!, {
      action: "element.get.pick"
    }, (res) => {
      if (res.action !== "element.send.pick") return
      setPageState("controlMenu")
      setCurrentElement({ ...elementsRef.current[res.elementIndex] })
    })
  }
  useEffect(() => {
    setParamComp(currentElement ? paramData(currentElement) : null)
  }, [currentElement])

  return <PopupWrapper>
    <TopMenuContainer>
      <ElementCountContainer>
        {elementsRef.current.length} element(s) found!
      </ElementCountContainer>
      <div>
        <Button onClick={() => updateElements()}>Update</Button>
        <Button onClick={pickElement}>Pick</Button>
      </div>
      <Input
        allowClear
        defaultValue={searchWords}
        onChange={(e) => {
          setSearchWords(e.target.value)
        }}
      />
    </TopMenuContainer>
    {pageState === "listMenu" ? (
      <ListMenuContainer>
        <ElementsContainer>
          {viewElements
            .filter((_e, i) => currentIndex === Math.floor(i / 6))
            .map((e, i) => {
              return (
                <ElementListItem
                  key={i}
                  elementType={e}
                  listItemClickHandle={listItemClickHandle}
                />
              )
            })}
        </ElementsContainer>
        <Pagination
          simple
          pageSize={6}
          current={Math.min(currentIndex + 1, viewElements.length - 1)}
          total={viewElements.length}
          onChange={(p) => setCurrentIndex(p - 1)}
        />
      </ListMenuContainer>
    ) : pageState === "controlMenu" ? (
      <>
        <ControlMenuHeader>
          <Button
            icon={<EnterOutlined />}
            onClick={() => {
              updateElements();
              setPageState("listMenu")
            }}
          />
          <ControlMenuTitle>{currentElement?.tagName}</ControlMenuTitle>
        </ControlMenuHeader>
        <ParamsContainer>
          {paramComp && currentElement ? (
            <ParamUI data={paramComp} elementIndex={currentElement?.index} />
          ) : null}
        </ParamsContainer>
      </>
    ) : null
    }
  </PopupWrapper>
}

export default Popup;
