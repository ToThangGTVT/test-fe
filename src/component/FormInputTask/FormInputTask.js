import React, { Fragment, PureComponent } from 'react'
import '../FormInputTask/FormInputTask.css'
import { connect } from 'react-redux';
import { store } from '../../redux/store/index'
import { addItem } from '../../redux/action/index'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


class FormInputTask extends PureComponent {

  constructor(props) {
    super(props)
    this.taskNameRef = React.createRef()
    this.taskDescriptionRef = React.createRef()
    this.taskDueRef = React.createRef()
    this.taskPiorityRef = React.createRef()
  }

  handleSubmit = (e) => {
    let todoList = JSON.parse(localStorage.getItem('todo-list')) ?? []
    todoList = [...todoList, {
      name: this.taskNameRef.current.value,
      description: this.taskDescriptionRef.current.value,
      due: this.taskDueRef.current.valueAsNumber,
      piority: this.taskPiorityRef.current.value,
      uuid: uuidv4()
    }]
    localStorage.setItem('todo-list', JSON.stringify(todoList))
    // this.props.addItem(true)
    this.props.dispathButton({ added: true })
    e.preventDefault()
  }

  handleUpdate = () => {
    let todoList = JSON.parse(localStorage.getItem('todo-list'))
    todoList.map(element => {
      if (element.uuid === this.props.uuid) {
        element.name = this.taskNameRef.current.value
        element.description = this.taskDescriptionRef.current.value
        element.due = this.taskDueRef.current.valueAsNumber
        element.piority = this.taskPiorityRef.current.value
      }
      return element
    });
    localStorage.setItem('todo-list', JSON.stringify(todoList))
    this.props.handleUpdate(true)
  }

  updateValue = () => {
    if (this.props.task) {
      const { name, due, description, piority } = this.props.task
      this.taskNameRef.current.value = name
      this.taskDescriptionRef.current.value = description
      this.taskDueRef.current.valueAsNumber = due
      this.taskPiorityRef.current.value = piority
    }
  }

  componentDidMount() {
    this.updateValue()
  }

  componentDidUpdate() {
    this.updateValue()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="w-full">
        {this.props.type !== 'update' ? <h3 className="text-center">New Task</h3> : <Fragment></Fragment>}
        <div className="form-input">
          <input type="text" ref={this.taskNameRef} className="input-task" placeholder="Add new task..."></input>
        </div>
        <div className="form-input">
          <strong><label htmlFor="description">Description</label></strong>
          <textarea ref={this.taskDescriptionRef} className="description-task" id="description" rows="6"></textarea>
        </div>
        <div className="form-input">
          <div className="d-flex">
            <div className="w-full">
              <strong><label htmlFor="due-task">Description</label></strong>
              <input ref={this.taskDueRef} type="date" id="due-task" className="input-task mr-5" placeholder="Add new task..."></input>
            </div>
            <div className="w-full">
              <strong><label className="ml-5" htmlFor="piority-task">Piority</label></strong>
              <select type="date" ref={this.taskPiorityRef} id="piority-task" className="input-task ml-5" placeholder="Add new task...">
                <option value="Low">Low</option>
                <option selected value="Normal" >Normal </option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-input mt-40">
          {this.props.type === 'update' ? <button type="button" onClick={this.handleUpdate} className="w-full btn">Update</button> : <Fragment></Fragment>}
          {this.props.type === 'create' ? <button type="submit" className="w-full btn">Add</button> : <Fragment></Fragment>}
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = () => {
  return {
    dispathButton: (val) => { store.dispatch(addItem(val)) }
  }
}

export default connect(mapDispatchToProps)(FormInputTask)