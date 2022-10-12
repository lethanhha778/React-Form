import React, { Component } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

class FormAddStudent extends Component {
    state = {
        values: {
            codeStudent: '',
            fullName: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        errors: {
            codeStudent: '',
            fullName: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }
    handleInputChange = (e) => {
        console.log(e.target.value)
        let { value, name } = e.target
        let newStudent = { ...this.state.values, [name]: value }
        let newErrors = { ...this.state.errors }
        let error = ''
        if (value.trim() === '') {
            error = 'Dữ Liệu Ko Được Để Trống'
        }
        if (name === 'codeStudent') {
            this.props.listStudents.some((stu) => {
                if (stu.codeStudent === value) {
                    error = 'Mã SV Không Được Trùng'
                }
                return error
            })
        }
        let typeCode = e.target.getAttribute('typeinput')
        if (typeCode === 'code') {
            let regexr = /^[0-9]+$/;
            if (!regexr.test(value)) {
                error = 'Mã SV Phải Là Số, Không Được Để Trống'
            }
        }
        let typeName = e.target.getAttribute('typeinput')
        if (typeName === 'name') {
            let regexr = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
            if (!regexr.test(value)) {
                error = 'Tên Không Hợp Lệ'
            }
        }
        let typePhone = e.target.getAttribute('typeinput')
        if (typePhone === 'phone') {
            let regexr = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (!regexr.test(value)) {
                error = 'Sđt Chưa Đúng Định Dạng'
            }
        }
        let typeEmail = e.target.getAttribute('typeinput')
        if (typeEmail === 'email') {
            let regexr = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!regexr.test(value)) {
                error = 'Email Chưa Đúng Định Dạng'
            }
        }
        let typePassword = e.target.getAttribute('typeinput')
        if (typePassword === 'pass') {
            let regexr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
            if (!regexr.test(value)) {
                error = 'Password Chưa Đúng Định Dạng'
            }
        }
        if (name === 'passwordConfirm') {
            if (value !== newStudent['password']) {
                error = 'Không Khớp'
            }
        }
        newErrors[name] = error
        this.setState({
            values: newStudent,
            errors: newErrors
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { values, errors } = this.state
        let isValid = true;
        for (const key in values) {
            if (values[key] === '') {
                isValid = false
                break
            }
        }
        for (const key in errors) {
            if (errors[key] !== '') {
                isValid = false
                break
            }
        }
        if (!isValid) {
            Swal.fire({
                title: 'Sory',
                text: 'Đã có một vài dữ liệu chưa được điền hoặc bị sai',
                icon: 'question',
                confirmButtonText: 'Sửa Lại',
                width: '25em',
                confirmButtonColor: '#04befe'
            })
            return
        }
        let action = {
            type: 'HANDLE_SUBMIT',
            student: this.state.values,
        }
        this.props.dispatch(action)
    }


    componentWillReceiveProps(newProps) {
        this.setState({
            values: newProps.infoStudents
        })
    }
    render() {
        let { codeStudent, fullName, phone, email, password, passwordConfirm } = this.state.values;
        return (
            <div className="container-form mt-3">
                <form
                    onSubmit={(e) => { this.handleSubmit(e) }}
                    className="signup"
                >
                    <div className="header">
                        <h3 >Register Student</h3>
                    </div>
                    <div className="sep" />
                    <div className="inputs">
                        <label htmlFor="">Student Code</label>
                        <input onChange={(e) => {
                            this.handleInputChange(e)
                        }}
                            id="stu"
                            value={codeStudent}
                            typeinput='code'
                            type="text"
                            name='codeStudent'

                        />
                        <span className='text-danger'>{this.state.errors.codeStudent}</span>
                        <label htmlFor="">Full Name</label>
                        <input onChange={(e) => {
                            this.handleInputChange(e)
                        }}
                            value={fullName}
                            typeinput='name'
                            type="text"
                            name='fullName'
                        />
                        <span className='text-danger'>{this.state.errors.fullName}</span>
                        <label htmlFor="">Phone Number</label>
                        <input onChange={(e) => {
                            this.handleInputChange(e)
                        }}
                            typeinput='phone'
                            value={phone}
                            type="text"
                            name='phone'
                        />
                        <span className='text-danger'>{this.state.errors.phone}</span>
                        <label htmlFor="">Email</label>
                        <input onChange={(e) => {
                            this.handleInputChange(e)

                        }}
                            value={email}
                            typeinput='email'
                            type="text"
                            name='email'
                        />
                        <span className='text-danger'>{this.state.errors.email}</span>
                        <div className='row'>
                            <div className="col-12 col-md-6 ">
                                <label htmlFor="">Password</label>
                                <input onChange={(e) => {
                                    this.handleInputChange(e)
                                }}
                                    value={password}
                                    typeinput='pass'
                                    type="text"
                                    name='password'
                                />
                                <span className='text-danger'>{this.state.errors.password}</span>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <label htmlFor="">Password Confirm</label>
                                <input onChange={(e) => {
                                    this.handleInputChange(e)

                                }}
                                    value={passwordConfirm}
                                    type="password"
                                    name='passwordConfirm'
                                />
                                <span className='text-danger'>{this.state.errors.passwordConfirm}</span>
                            </div>
                        </div>
                        <div className="sep mt-1" />
                        <div className='btn-form'>
                            <button onClick={() => {
                                const action = {
                                    type: 'UPDATE_STU',
                                    valueUpdate: this.state.values
                                }
                                this.props.dispatch(action)
                            }}
                                type='button'
                                id='update'
                                className='btn5-hover btn-update btn-add mt-3 update' >Cập Nhật</button>
                            <button
                                id='addStu'
                                className='btn5-hover btn5 btn-add mt-3' >Thêm Sinh Viên</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {

        listStudents: rootReducer.formReducer.listStudents,
        infoStudents: rootReducer.formReducer.infoStudents,
    }
}

export default connect(mapStateToProps)(FormAddStudent)

