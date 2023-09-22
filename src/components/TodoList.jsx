import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await Axios({
          url: 'http://96.126.106.250:4000/task'
        });
        const elem = [...todos, ...data];
        console.log(elem);
        setTodos(elem);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodo();
  }, [setTodos]);

  const addTodo = async todo => {
    try {
      if (!todo.text || /^\s*$/.test(todo.text)) {
        return;
      }

      await Axios.post('http://96.126.106.250:4000/task', todo);

      const newTodos = [todo, ...todos];

      setTodos(newTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (todoId, newValue) => {
    try {
      if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
      }

      console.log(newValue);

      await Axios.put(`http://96.126.106.250:4000/task/${todoId}`, newValue);

      setTodos(prev =>
        prev.map(item => (item.id === todoId ? newValue : item))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeTodo = async id => {
    try {
      await Axios.delete(`http://96.126.106.250:4000/task/${id}`);
      const removeArr = [...todos].filter(todo => todo.id !== id);

      setTodos(removeArr);
    } catch (err) {
      console.log(err);
    }
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
