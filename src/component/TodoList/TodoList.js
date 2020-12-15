import React, { Component } from 'react'
import SearchBox from './SearchBox'
import '../TodoList/TodoList.css'
import TodoListItem from './TodoListItem'
import Bulk from './Bulk'
import { connect } from 'react-redux';

class TodoList extends Component {

  listTodoItem = JSON.parse(localStorage.getItem('todo-list')) ?? []

  handleDelete = (uuid) => {
    let items = JSON.parse(localStorage.getItem('todo-list'))
    localStorage.setItem('todo-list', JSON.stringify(items.filter(item => item.uuid !== uuid)))
    this.setState({})
  }

  handleUpdate = () => {
    this.setState({})
  }

  compare(a, b) {
    if (a.due < b.due) {
      return 1;
    }
    if (a.due > b.due) {
      return -1;
    }
    return 0;
  }

  componentWillUpdate = () => {
    this.listTodoItem = JSON.parse(localStorage.getItem('todo-list')) ?? []
    this.listTodoItem.sort(this.compare)
  }

  render() {
    this.listTodoItem.sort(this.compare)
    return (
      <div className="w-full mb-15">
        <h3 className="text-center">To Do List</h3>
        <SearchBox></SearchBox>
        {this.listTodoItem.map((val, i) => <TodoListItem
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          task={val}
          key={i}
          uuid={val.uuid}
          title={val.name}></TodoListItem>)}
        <Bulk show={false}></Bulk>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    checked: state
  }
}

export default connect(mapStateToProps)(TodoList)