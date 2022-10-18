import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentList extends Component {
    renderStudent = () => {
        let listStudentRender = this.props.listStudentsSearch.length ? this.props.listStudentsSearch : this.props.listStudents
        return listStudentRender.map((student) => {
            return <tr key={student.codeStudent}>
                <td>{student.codeStudent}</td>
                <td>{student.fullName}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>{student.password}</td>
                <td >
                    <button
                        onClick={() => {
                            const action = {
                                type: 'VIEW_STU',
                                student: student
                            }
                            this.props.dispatch(action)
                        }}
                        className='btn5-hover btn5 btn-watch'>VIEW
                    </button>
                    <button
                        onClick={() => {
                            const action = {
                                type: 'DELETE_STU',
                                student: student.codeStudent
                            }
                            this.props.dispatch(action)
                        }}
                        className="button-warning">
                        <span className="text">DELETE</span>
                        <span>Yes?</span>
                    </button>
                </td>
            </tr>
        })
    }
    handleInputSearch = (e) => {
        let lowerCase = e.target.value.toLowerCase().trim();
        let action = {
            type: 'HANDLE_INPUT_SEARCH',
            value: lowerCase
        }
        this.props.dispatch(action)
    }
    submitSearch = (e) => {
        e.preventDefault();
        const action = {
            type: 'SEARCH',
            value: this.props.valueSearch
        }
        this.props.dispatch(action)
    }

    render() {
        return (
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-12">
                        <h2 className='text-center bg-dark text-light mb-3 mt-5' >Student Details</h2>
                        <form
                            onSubmit={(e) => {
                                this.submitSearch(e)
                            }}
                            className="text-end a" role="search"
                        >
                            <input
                                onKeyUp={(e) => {
                                    this.handleInputSearch(e)
                                }}
                                className="search me-2" type="text" placeholder="Search Name"
                            />
                            <button
                                className="btn5-hover btn5 btn-search" >Search</button>
                        </form>
                        <div className='table-responsive-xl' >
                            <table className="table table-dark table-striped-columns ">
                                <thead>
                                    <tr>
                                        <th scope="col">Student Code </th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Password</th>
                                        <th className='td-btn'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderStudent()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        listStudents: rootReducer.formReducer.listStudents,
        valueSearch: rootReducer.formReducer.search,
        listStudentsSearch: rootReducer.formReducer.studentSearch
    }
}

export default connect(mapStateToProps)(StudentList)