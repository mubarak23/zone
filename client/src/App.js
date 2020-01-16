import React from 'react';
import './App.css';
import Todos from './components/Todos';

class App extends React.Component{
  state = {
    todos: [
      {
        id: 1,
        title: 'create project component in pms ui',
        completed: false
      },
      {
        id: 2,
        title: 'Correct exercise tracker api and ui connect error',
        completed: false
      },
      {
        id: 3,
        title: 'Telecommunication and Advance Circuit Technique studies',
        completed: true
      }
    ]
  }
  markComplete = (id) =>{
    this.setState({
      todos: this.state.todos.map((todo) =>{
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }
  render(){
    //console.log(this.state.todos);
    return(
      <div>
        <Todos todos={this.state.todos}  markComplete={this.markComplete}/>
      </div>
    )
  }
} 
export default App;
