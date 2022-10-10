import React, { Component } from 'react'
import FormAddStudent from './FormAddStudent'
import StudentList from './StudentList'

export default class FormStudent extends Component {
  render() {
    return (
      <div className='container' >
        <FormAddStudent />
        <StudentList />
      </div>
    )
  }
}
