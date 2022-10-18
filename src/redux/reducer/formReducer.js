import Swal from 'sweetalert2'
const initialState = {
    listStudents: [
        { codeStudent: '001', fullName: 'Nguyễn Văn A', phone: '0901525870', email: 'abc@gmail.com', password: '123@XYz', passwordConfirm: '123@XYz' },
        { codeStudent: '002', fullName: 'Nguyễn Văn B', phone: '0901525871', email: 'abcd@gmail.com', password: '123#Xyz', passwordConfirm: '123#Xyz' },
        { codeStudent: '003', fullName: 'Nguyễn Văn C', phone: '0901525873', email: 'abcd@gmail.com', password: '123!Xyz', passwordConfirm: '123!Xyz' },
        { codeStudent: '004', fullName: 'Nguyễn Lê D', phone: '0901525872', email: 'abcd@gmail.com', password: '123#XYz', passwordConfirm: '123#XYz' },
        { codeStudent: '005', fullName: 'Nguyễn Văn D', phone: '0901525872', email: 'abcd@gmail.com', password: '123#XYz', passwordConfirm: '123#XYz' }
    ],
    infoStudents: {
        codeStudent: '', fullName: '', phone: '', email: '', password: '', passwordConfirm: ''
    },
    search: '',
    studentSearch: []
}

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HANDLE_SUBMIT':
            state.listStudents = [...state.listStudents, action.student]
            return { ...state }
        case 'DELETE_STU':
            state.listStudents = state.listStudents.filter(stu =>
                stu.codeStudent !== action.student
            )
            return { ...state }
        case 'VIEW_STU':
            document.getElementById('stu').setAttribute("disabled", true)
            document.getElementById('addStu').style.display = "none"
            document.getElementById('update').classList.remove("update")
            state.infoStudents = action.student
            return { ...state }
        case 'UPDATE_STU':
            let indexStu = state.listStudents.findIndex(stu => stu.codeStudent === action.valueUpdate.codeStudent)
            if (indexStu !== -1) {
                state.infoStudents = state.listStudents[indexStu] = action.valueUpdate
            }
            else {
                Swal.fire({
                    title: 'Có Thể Bạn Đã Xóa Dữ Liệu, Không Tìm Thấy Để Cập Nhật',
                    icon: 'error',
                    confirmButtonText: 'Yes',
                    width: '25em',
                    confirmButtonColor: '#04befe'
                })
            }
            state.listStudents = [...state.listStudents]
            return { ...state }
        case 'HANDLE_INPUT_SEARCH':
            state.search = action.value
            return { ...state }
        case 'SEARCH':
            if (action.value) {
                let searchName = state.listStudents.filter((stu) => {
                    return stu.fullName.toLowerCase().includes(action.value)
                })
                if (searchName.length === 0) {
                    Swal.fire({
                        title: 'Dữ Liệu Bạn Cần Tìm Không Có Trong Danh Sách',
                        text: 'Bạn Có MUốn Tìm Lại',
                        icon: 'info',
                        confirmButtonText: 'Yes',
                        width: '25em',
                        confirmButtonColor: '#04befe'
                    })
                }
                else {
                    state.studentSearch = searchName
                }
            }
            else {
                state.studentSearch = []
            }
            return { ...state }
        default:
            return state
    }
}
