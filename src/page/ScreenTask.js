import React, { Component } from 'react'
import FormInputTask from '../component/FormInputTask/FormInputTask'
import TodoList from '../component/TodoList/TodoList'

export default class ScreenTask extends Component {
  render() {
    return (
      <div className="container">
        <div className="d-flex ">
          <FormInputTask type="create" addItem={this.addItem}></FormInputTask>
          <TodoList></TodoList>
        </div>
      </div>
    )
  }
}