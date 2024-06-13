import { styled } from "styled-components";
import { style } from "../styles/constants";
import { Todo } from "../types";
import { Button, Checkbox, Flex, Input, Typography } from "antd";
import { useState, ChangeEvent } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  deleteTodo,
  renameTodo,
  setTodoAsCompleted,
  setTodoAsNotCompleted,
} from "../service/todo-api";
import { MessageInstance } from "antd/es/message/interface";

type Props = {
  todo: Todo;
  refreshTodos: () => Promise<void>;
  messageApi: MessageInstance;
};

/** Renders a todo item in a card of 100% width and variable height
 *  and includes logic for managing its state
 */
export const TodoItem = ({ todo, refreshTodos, messageApi }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(todo.name);

  const handleSetAsComplete = async (e: CheckboxChangeEvent) => {
    try {
      if (e.target.checked) {
        await setTodoAsCompleted(todo.id);
      } else {
        await setTodoAsNotCompleted(todo.id);
      }
      refreshTodos();
    } catch (e: unknown) {
      if (e instanceof Error) messageApi.error(e.message);
    }
  };

  const handleEditName = async () => {
    setEditMode(false);
    try {
      await renameTodo(todo.id, name);
      await refreshTodos();
    } catch (e: unknown) {
      if (e instanceof Error) messageApi.error(e.message);
    }
  };

  const handleRemove = async () => {
    try {
      await deleteTodo(todo.id);
      await refreshTodos();
    } catch (e: unknown) {
      if (e instanceof Error) messageApi.error(e.message);
    }
  };

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <ItemContainer>
      <Flex>
        <Checkbox
          style={{ marginRight: style.spacing.small }}
          onChange={handleSetAsComplete}
          defaultChecked={todo.completed}
        />

        {editMode ? (
          <Flex>
            <Input
              placeholder="Edit todo"
              value={name}
              onChange={handleNameInput}
            />
            <Button type="default" onClick={() => handleEditName()}>
              Save
            </Button>
          </Flex>
        ) : (
          <P
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.name}
          </P>
        )}
      </Flex>
      <ItemActions>
        <Link onClick={() => setEditMode(true)}>Edit</Link>
        <Link onClick={handleRemove}>Remove</Link>
      </ItemActions>
    </ItemContainer>
  );
};

const P = styled(Typography.Text)`
  margin-right: ${style.spacing.small}px;
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
