import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import useFetch from './hooks/fetch';

const todosUrl = 'https://deltav-todo.azurewebsites.net/api/v1/Todos';
function App() {
  const [isLoading, data] = useFetch(todosUrl);


  let [todos, setTodos] = useState([{title: 'test', assignedTo: 'Stacey', difficulty: 1}]);
  // TODO: replace todos with data whenever it changes
  console.log(todos);
  useEffect(() => {
    setTodos(data);
  }, [data]);

  async function addTodo(newTodo){
        console.log(newTodo)
        let newToDos = [...todos, newTodo];
        setTodos(newToDos);

        let response = await fetch(todosUrl, {
          method: 'post',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify(newTodo)
        });
        console.log(response);
  }

  function toggleTodo(indexToUpdate) {
    console.log(indexToUpdate);
    let updatedTodos = todos.map((todo, t) => {
      if(t !== indexToUpdate){
        return todo;
      }
      return {...todo, completed: !todo.completed};
    });
    setTodos(updatedTodos);
  }

  return (
    <>
    <Header />
    <ToDoForm onSave = {addTodo}/>
    <ToDoList isLoading = {isLoading} list={todos} onToggle = {toggleTodo}/>

    </>
  );
}

export default App;
