import React, { Component } from 'react'

export default class SearchBox extends Component {

  constructor() {
    super()
    this.state = { results: [] }
    this.inputSearchRef = React.createRef()
  }

  listTodoItem = JSON.parse(localStorage.getItem('todo-list')) ?? []

  componentWillUpdate() {
    this.listTodoItem = JSON.parse(localStorage.getItem('todo-list')) ?? []
  }

  handleSearch = () => {
    let results = []
    if (this.inputSearchRef.current.value) {
      results = this.listTodoItem.filter((val, i) => {
        return val.name.includes(this.inputSearchRef.current.value)
      })
    }
    this.setState({ results })
  }

  render() {
    return (
      <div id="myDropdown" className="dropdown-content">
        <div className="form-input" id="inp-search">
          <input type="text" className="input-task" ref={this.inputSearchRef} placeholder="Search..." onKeyUp={this.handleSearch} />
          <div id="result-search">
            {this.state.results.map((val, i) => <div className="item" key={i}>{val.name}</div>)}
          </div>
        </div>
      </div>
    )
  }
}