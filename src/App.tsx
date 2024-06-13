import { Button, Flex, Input, message } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TodoItem } from "./component/todo-item";
import { MainLayout } from "./layout/main-layout";
import { addTodo, getAllTodos } from "./service/todo-api";
import { style } from "./styles/constants";
import { Todo } from "./types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState<string>();
  const [addMode, setAddMode] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddName = async () => {
    try {
      if (name) await addTodo(name);
      await getTodos();
    } catch (e: unknown) {
      if (e instanceof Error) messageApi.error(e.message);
    }
  };

  const getTodos = useCallback(async () => {
    try {
      const todos = await getAllTodos();
      setTodos(todos);
    } catch (e: unknown) {
      if (e instanceof Error) messageApi.error(e.message);
    }
  }, [messageApi]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      {contextHolder}

      <MainLayout>
        {todos.map((todo, idx) => (
          <TodoItem
            key={idx}
            todo={todo}
            refreshTodos={getTodos}
            messageApi={messageApi}
          />
        ))}
        <Flex style={{ marginTop: style.spacing.vertical }} justify="center">
          {addMode ? (
            <>
              <Input
                placeholder="Add todo"
                value={name}
                onChange={handleNameInput}
              />
              <Button type="default" onClick={() => handleAddName()}>
                Add
              </Button>
            </>
          ) : (
            <Button type="link" onClick={() => setAddMode(true)}>
              New
            </Button>
          )}
        </Flex>
      </MainLayout>
    </>
  );
};

export default App;
