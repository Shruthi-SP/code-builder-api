import { array } from "./userAction"
import axios from 'axios'
import Swal from "sweetalert2"

export const asyncGetAllMembers = () => {
    return (dispatch) => {
        console.log('process env token',process.env.TOKEN)
        axios.get(`https://dct-cors.herokuapp.com/https://code.dctacademy.com/api/v1/ml/data/students?key=${process.env.TOKEN}`)
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