import { all, call, put, fork, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { 
  LOG_IN_REQUEST, 
  LOG_IN_SUCCESS, 
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST, 
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILURE,
  } from '../reducers/user'

axios.defaults.baseURL = 'http://localhost:3065/api';

function loginAPI(loginData) {
  return axios.post('/user/login', loginData)
}

function* login(action) {
  try {
   const result = yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  }catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE
    })
  }

}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
} 

function* signupAPI(signUpData) {
 return axios.post('/user/', signUpData)
}

function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: SIGN_UP_FAILURE
    })
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup)
}

export default function* userSaga() {
  yield all ([
    fork(watchLogin),
    fork(watchSignup)
  ])
}