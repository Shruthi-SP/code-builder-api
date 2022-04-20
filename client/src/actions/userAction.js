import Swal from 'sweetalert2'
import axios from '../config/axios-config'
import axiosObj from 'axios'
//import jwt from 'jsonwebtoken'

export const array = [
    { id: 1, user_name: 'admin1', email: 'admin1@dct.com', password: 'secret123', role: 'admin', account_type: 'dct' },
    { id: 2, user_name: 'student1', email: 'student1@dct.com', password: 'secret123', role: 'student', account_type: 'dct' },
    { id: 3, user_name: 'student2', email: 'student2@dct.com', password: 'secret123', role: 'student', account_type: 'dct' },
]
export let allStudents = []
const getToken = (obj, dispatch, redirect) => {
    console.log(redirect)
    axios.post('/login', obj)
        .then((response) => {
            const tokenData = response.data
            if (tokenData.hasOwnProperty('errors')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: tokenData.errors,
                    footer: ''
                })
            }
            else {
                //console.log('token res = ', tokenData)
                localStorage.setItem('token', tokenData)
                dispatch(setUser(obj))
                redirect(obj)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login Successful',
                    footer: ''
                })
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

export const asyncRegister = (formData, resetForm, redirect) => {
    return () => {
        array.push(formData)
        resetForm()
        redirect()
        //alert('registered successfully')
        Swal.fire({
            icon: 'success',
            title: 'Registered',
            text: 'Registered successfully',
            footer: ''
        })
    }
}

export const asyncSetUser = (formData, redirect) => {
    return (dispatch) => {
        let obj = {}
        array.forEach(ele => {
            if (ele.email === formData.email && ele.password === formData.password) {
                obj = { ...ele }
            }
        })
        if (Object.keys(obj).length === 0) {
            axiosObj.get('https://dct-cors.herokuapp.com/https://code.dctacademy.com/api/v1/ml/data/students/?key=122c880b872aaa7224074498b9bb7e24')
                .then((response) => {
                    const result = response.data
                    //console.log('cp api=', result)
                    if (result.hasOwnProperty('errors')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: result.errors,
                            footer: ''
                        })
                    } else {
                        allStudents = [...result]
                        obj = result.find(ele => ele.email === formData.email)
                        //console.log('obj result=', obj)
                        if (!obj || Object.keys(obj).length === 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Invalid email or password',
                                footer: ''
                            })
                        }
                        else {
                            obj.user_name = obj.name
                            obj.role = 'student'
                            obj.account_type = 'dct'
                            getToken(obj, dispatch, redirect)
                        }
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
        else {
            getToken(obj, dispatch, redirect)
        }
    }
}
// export const asyncSetUser = (formData, redirect) => {
//     return (dispatch) => {
//         if (localStorage.user) {
//             dispatch(setUser(formData))
//             //getData(formData)
//         }
//         else {
//             let obj = {}
//             array.forEach(ele => {
//                 if (ele.email === formData.email && ele.password === formData.password) {
//                     obj = { ...ele }
//                 }
//             })
//             if (Object.keys(obj).length === 0) {
//                 const result = {}
//                 result.errors = 'Invalid email or password'
//                 //alert(result.errors)
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: result.errors,
//                     footer: ''
//                 })
//             } else {
//                 dispatch(setUser(obj))
//                 //getData(obj)
//                 //alert('Login successful')
//                 localStorage.setItem('user', JSON.stringify(obj))
//                 redirect(obj)
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success',
//                     text: 'Login Successful',
//                     footer: ''
//                 })
//             }
//         }
//     }
// }
export const setUser = (obj) => {
    return { type: 'SET_USER', payload: obj }
}
export const removeUser = () => {
    return { type: 'REMOVE_USER' }
}