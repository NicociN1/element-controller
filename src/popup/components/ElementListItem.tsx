import styled from "@emotion/styled";
import ElementType from "../../types/elementType";
import { elementTypeToDisplayName } from "../../utils/elements";
import { getCurrentTab, sendMessage } from "../../utils/popups";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MessageType from "../../types/messageType";

const ListItemWrapper = styled.div`
  width: 90%;
  height: 48px;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 8px;
  display: grid;
  grid-template-columns: 25% 60% 15%;
  grid-template-rows: 100%;
  place-content: center;
  align-items: center;
  background-color: white;
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9)
  }
`
const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  align-content: center;
  text-overflow: ellipsis;
  overflow: hidden scroll;
  scrollbar-width: thin;
  scrollbar-color: gray transparent;
  margin: 8px;
  word-break: break-all;
`

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: solid 1px black;
`

interface ElementListItemProps {
  elementType: ElementType;
  listItemClickHandle: (elementType: ElementType) => void;
}
const ElementListItem = (props: ElementListItemProps) => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    ; (async () => {
      setPreviewSrc(null)
      sendMessage(
        (await getCurrentTab()).id!,
        { action: "element.get.preview", elementIndex: props.elementType.index } as MessageType,
        (res: MessageType) => {
          if (res.action !== "element.send.preview") return
          setPreviewSrc(res.srcUrl)
        }
      )
    })()
  }, [props.elementType])
  return (
    <ListItemWrapper
      onMouseOver={async () => {
        sendMessage((await getCurrentTab()).id!, {
          action: "element.send.focus",
          elementIndex: props.elementType.index
        })
      }}
      onMouseOut={async () => {
        sendMessage((await getCurrentTab()).id!, {
          action: "element.send.blur"
        })
      }}
      onClick={async () => {
        sendMessage((await getCurrentTab()).id!, {
          action: "element.send.scroll",
          elementIndex: props.elementType.index
        })
      }}
    >
      <ItemContainer>
        {previewSrc ?
          <PreviewImg src={previewSrc} />
          :
          <span style={{ color: "gray" }}>No Preview</span>
        }
      </ItemContainer>
      <ItemContainer>
        <TextContainer>
          {elementTypeToDisplayName(props.elementType)}
        </TextContainer>
      </ItemContainer>
      <ItemContainer>
        <Button icon={<EditOutlined />}
          onClick={async () => {
            sendMessage((await getCurrentTab()).id!, {
              action: "element.send.blur"
            })
            props.listItemClickHandle(props.elementType)
          }}
        />
      </ItemContainer>
    </ListItemWrapper>
  );
};

export default ElementListItem;
