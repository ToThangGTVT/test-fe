import React, { PureComponent } from 'react'
import FormInputTask from '../FormInputTask/FormInputTask'
import { store } from '../../redux/store/index'
import { clickCheckBox } from '../../redux/action/index'
import { connect } from 'react-redux';

class TodoListItem extends PureComponent {

  constructor() {
    super()
    this.state = { showDetail: false }
    this.checkRef = React.createRef()
  }

  handleShowDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail
    })
  }

  handleDelete = (uuid) => {
    this.props.handleDelete(uuid)
  }

  handleUpdate = () => {
    this.props.handleUpdate(true)
  }

  handleCheckBox = (uuid) => {
    const { checked } = this.checkRef.current
    this.props.dispathButton({ uuid, checked })
  }

  componentDidUpdate() {
    if (this.props.checked.show?.uuid !== this.props.uuid) {
      this.checkRef.current.checked = false
    }
  }

  componentWillUnmount() {
    const uuid = this.props.checked.show?.uuid
    this.props.dispathButton({ uuid, checked: false })
  }

  render() {
    const { uuid, title, task } = this.props
    return (
      <div className="item-todo">
        <span className="check-box">
          <input type="checkbox" ref={this.checkRef} id={uuid} onClick={() => this.handleCheckBox(uuid)} />
          <label htmlFor={uuid}>{title}</label>
        </span>
        <span className={`f-right ${this.state.showDetail ? 'mb-15' : ''}`}>
          <button className="btn-info mr-15" onClick={this.handleShowDetail}>Detail</button>
          <button className="btn-danger" onClick={() => this.handleDelete(uuid)}>Delete</button>
        </span>
        {this.state.showDetail ? <FormInputTask
          task={task}
          uuid={uuid}
          handleUpdate={this.handleUpdate}
          type="update"></FormInputTask> : <></>}
      </div>
    )
  }
}

const mapDispatchToProps = () => {
  return {
    dispathButton: (val) => { store.dispatch(clickCheckBox(val)) }
  }
}

const mapStateToProps = (state) => {
  return {
    checked: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps,)(TodoListItem) 