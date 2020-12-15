import React, { Component } from 'react'
import { connect } from 'react-redux';
import { store } from '../../redux/store/index'
import { deleteItem } from '../../redux/action/index'

class Bulk extends Component {
  constructor() {
    super()
    this.state = { show: false }
  }

  handleDelete = () => {
    this.props.dispathButton({ uuid: this.props.checked.show?.uuid })
    const { uuid } = this.props.checked.show;
    let items = JSON.parse(localStorage.getItem('todo-list'))
    localStorage.setItem('todo-list', JSON.stringify(items.filter(item => item.uuid !== uuid)))
  }

  render() {
    const { uuid } = this.props
    const listItem = JSON.parse(localStorage.getItem('todo-list'))
    return (
      <>
        {
          listItem.length !== 0 & this.props.checked.show?.checked ?
            <div className="bulk">
              <span>Bulk Action:</span>
              <span className={`f-right`}>
                <button className="btn-primary mr-15" onClick={() => this.handleDelete(uuid)}>Delete</button>
                <button className="btn-danger" >Done</button>
              </span>
            </div> : <></>
        }
      </>
    )
  }
}

const mapDispatchToProps = () => {
  return {
    dispathButton: (val) => { store.dispatch(deleteItem(val)) }
  }
}

const mapStateToProps = (state) => {
  return {
    checked: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bulk)