import { styled } from "styled-components";
import { style } from "../styles/constants";
import { Todo } from "../types";
import { Checkbox, Typography } from "antd";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type Props = {
  item: Todo;
  handle?: {
    edit: () => void;
    remove: () => void;
    setComplete: () => void;
  };
};

/** Renders a todo item in a card of 100% width and variable height
 *  and includes logic for managing its state
 */
export const TodoItem = ({ item }: Props) => {
  const [isComplete, setIsComplete] = useState<boolean>();
  const handleCheck = (e: CheckboxChangeEvent) => {
    setIsComplete(e.target.checked);
  };
  return (
    <ItemContainer>
      <div>
        <Checkbox onChange={handleCheck}></Checkbox>
        <P style={{ textDecoration: isComplete ? "line-through" : "none" }}>
          {item.name}
        </P>
      </div>
      <ItemActions>
        <Link>Edit</Link>
        <Link>Remove</Link>
      </ItemActions>
    </ItemContainer>
  );
};

const P = styled(Typography.Text)`
  margin-left: 10px;
`;
const Link = styled(Typography.Link)`
  font-size: 12;
`;
const ItemContainer = styled.div`
  display: flex;
  width: ${style.spacing.mainContent.width - 20}px;
  max-width: 100%;
  justify-content: space-between;
  color: ${style.colors.light};
  background: transparent;
  padding: 5px 10px;
`;
const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
`;
