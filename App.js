import React, { useState,useEffect } from 'react';
import './App.css';
//importing component
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  

  //States
  const [inputText,  setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Run Once
  useEffect(()=> {
    getLocalTodos();
  },[])
  //useEffect stuff
  useEffect(()=> {
    filterHandler();
    saveToLocalStorage();
  }, [todos,status]);


  //Functions

  const filterHandler = ()=> {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      
      case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //Save to Local storage
  const saveToLocalStorage = () => {
    
      localStorage.setItem("todos", JSON.stringify(todos));
    
  };

  const getLocalTodos = ()=> {
    if(localStorage.getItem("todos")===null){
      localStorage.setItem('todos', JSON.stringify([]));

    }else {
     let localTodos =  JSON.parse(localStorage.getItem("todos"))
     setTodos(localTodos);
    } 
  }

  return (
    <div className="App">
      
      <header>
        <h3>Adit's ToDo List</h3>
        
      </header>
      <Form todos = {todos} 
      setTodos = {setTodos}
       inputText = {inputText}
        setInputText = {setInputText}
        setStatus = {setStatus}/>
      <TodoList 
      setTodos = {setTodos}
      filteredTodos = {filteredTodos}
       todos= {todos}/>
    </div>
  );
}

export default App;
