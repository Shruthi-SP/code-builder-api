import { array } from "./userAction"
import axios from 'axios'
import Swal from "sweetalert2"

export const asyncGetAllMembers = () => {
    return (dispatch) => {
        axios.get('https://dct-cors.herokuapp.com/https://code.dctacademy.com/api/v1/ml/data/students/?key=122c880b872aaa7224074498b9bb7e24')
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                } else {
                    const a = result.map(ele => {
                        return { ...ele, user_name: ele.name, role: 'student', account_type: 'dct' }
                    })
                    const allStudents = [...array, ...a]
                    dispatch(allMembers(allStudents))
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }
}

export const allMembers = (arr) => {
    return { type: 'ALL_MEMBERS', payload: arr }
}