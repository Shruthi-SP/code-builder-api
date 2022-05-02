import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { asyncGetAllCodes } from './actions/codesAction';
import { setUser } from './actions/userAction';
import jwtDecode from 'jwt-decode'
import { asyncGetAllMembers } from './actions/membersAction';

const store = configureStore()
store.dispatch(asyncGetAllMembers())
store.dispatch(asyncGetAllCodes())

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token')
  const obj = jwtDecode(token)
  //console.log('token in index = ', token, obj)
  store.dispatch(setUser(obj))
}
// if(localStorage.getItem('user')){
//   const obj = JSON.parse(localStorage.getItem('user'))
//   //console.log(obj)
//   store.dispatch(setUser(obj))
// }
store.subscribe(() => {
  console.log('index updated state=', store.getState())
})

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);