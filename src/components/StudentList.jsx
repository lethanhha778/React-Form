import React, { Component } from 'react'
import { connect } from 'react-redux'
class StudentList extends Component {
    renderStudent = () => {
        let listStudentRender = this.props.listStudentsSearch.length ? this.props.listStudentsSearch : this.props.listStudents
        return listStudentRender.map((stu) => {
            return <tr key={stu.codeStudent}>
                <td>{stu.codeStudent}</td>
                <td>{stu.fullName}</td>
                <td>{stu.phone}</td>
                <td>{stu.email}</td>
                <td>{stu.password}</td>
                <td >
                    <button onClick={() => {
                        const action = {
                            type: 'VIEW_STU',
                            student: stu
                        }
                        this.props.dispatch(action)
                    }}
                        className='btn5-hover btn5 btn-watch'>Xem
                    </button>
                    <button
                        onClick={() => {
                            const action = {
                                type: 'DELETE_STU',
                                student: stu.codeStudent
                            }
                            this.props.dispatch(action)
                        }}
                        className="button-warning">
                        <span className="text">Xóa</span>
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
    submitSearch = (e)=>{
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
                        <h2 className='text-center bg-dark text-light mb-3' >Chi Tiết Sinh Viên</h2>
                        <form  onSubmit={(e) => { 
                                this.submitSearch(e)
                         }}
                        className="text-end a" role="search">
                            <input onKeyUp={(e) => {
                                this.handleInputSearch(e)
                            }}
                                className="search me-2" type="text" placeholder="Search"  />
                            <button 
                                className="btn5-hover btn5 btn-search" >Search</button>
                        </form>
                        <div className='table-responsive-xl'>
                            <table className="table table-dark table-striped-columns ">
                                <thead>
                                    <tr>
                                        <th scope="col">Mã Sinh Viên</th>
                                        <th scope="col">Họ Tên</th>
                                        <th scope="col">Số Điện Thoại</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Password</th>
                                        <th></th>
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