import { API_URL } from "../constants";

/** Get all todos  */
export const getAllTodos = async () => {
  const url = `${API_URL}/all`;
  const response = await fetch(url);
  const result = await response.json();

  console.info(`GET ${url}: `, response.status);
  if (response.status !== 200)
    throw new Error(`An error occurred while fetching all todos: ${result}`);

  return result;
};

/** Deletes a todo by its ID */
export const deleteTodo = async (id: string) => {
  const url = `${API_URL}/delete/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  const result = await response.json();

  console.info(`DELETE ${url}: `, response.status);
  if (response.status !== 200)
    throw new Error(`Failed to delete todo ${id}: ${result.message}`);

  return result;
};

/** Adds a todo */
export const addTodo = async (name: string) => {
  const url = `${API_URL}/add`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const result = await response.json();

  console.info(`POST ${url}: `, response.status);
  if (response.status !== 200)
    throw new Error(`Error adding todo: ${result.message}`);

  return result;
};

/** Edits a todo's name by its ID */
export const renameTodo = async (id: string, name: string) => {
  const url = `${API_URL}/rename/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const result = await response.json();

  console.info(`PUT ${url}: `, response.status);
  if (response.status !== 200)
    throw new Error(`Failed to rename todo: ${result.message}`);

  return result;
};

/** Sets todo's as complete by its ID */
export const setTodoAsCompleted = async (id: string) => {
  const url = `${API_URL}/setAsCompleted/${id}`;
  const response = await fetch(url, {
    method: "PUT",
  });
  const result = await response.json();

  console.info(`PUT ${url}: `, response.status);
  if (response.status !== 200)
    throw new Error(`Failed to set todo as completed: ${result.message}`);

  return result;
};

/** Sets todo's as complete by its ID */
export const setTodoAsNotCompleted = async (id: string) => {
  const url = `${API_URL}/setAsNotCompleted/${id}`;
  const response = await fetch(url, {
    method: "PUT",
  });
  const result = await response.json();

  console.info(`PUT ${url}: `, response.status);
  if (response.status !== 200)
    throw new Error(`Failed to set todo as not completed: ${result.message}`);

  return result;
};
