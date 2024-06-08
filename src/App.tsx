import { TodoItem } from "./component/todo-item";
import { MainLayout } from "./layout/main-layout";
import { Todo } from "./types";

const fakeItems: Todo[] = [
  {
    id: "0",
    name: "nexplore test",
    timestamp: new Date().getTime().toString(),
  },
  {
    id: "1",
    name: "make lasagna",
    timestamp: new Date().getTime().toString(),
  },
  {
    id: "2",
    name: "eat lasagna",
    timestamp: new Date().getTime().toString(),
  },
  {
    id: "3",
    name: "test whether longer todo titles are supported",
    timestamp: new Date().getTime().toString(),
  },
];

const App = () => {
  return (
    <MainLayout>
      {fakeItems.map((todo, idx) => (
        <TodoItem key={idx} item={todo} />
      ))}
    </MainLayout>
  );
};

export default App;
