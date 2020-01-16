import React from 'react';
import TodoItem from './Todoitem';
import propTypes from 'prop-types';

class Todos extends React.Component{
  state = {

  }
  
  render(){
    //console.log(this.props.todos)
    return this.props.todos.map((todo) =>(
        <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete}/>
    ))
    
  }
} 

//prop type
Todos.propTypes = {
  todos: propTypes.array.isRequired
}

export default Todos;
