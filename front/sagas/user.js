import { all, call, put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE, 
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user'

function loginAPI(loginData) {
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE
    })
  }

}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

function logoutAPI() {
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logout() {
  try {
    yield call(logoutAPI)
    yield put({
      type: LOG_OUT_SUCCESS
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_OUT_FAILURE,
      error:e,
    })
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout)
}

function loaduserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true
  })
}

function* loadUser(action) {
  try {
    const result = yield call(loaduserAPI, action.data)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_USER_FAILURE,
      error:e,
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function signupAPI(signUpData) {
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
      type: SIGN_UP_FAILURE,
      error:e,
    })
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup)
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignup)
  ])
}