import { all, fork, takeLatest, put, delay } from 'redux-saga/effects'
import axios from 'axios'
import { 
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from '../reducers/post'

function* postAPI() {
  return axios.post('/post')
}

function* addPost(action) {
  try{
    // yield call(postAPI)
    yield delay(2000)
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_POST_FAILURE,
    })
  }
}

function* watchAddPost() {
  yield takeLatest( ADD_POST_REQUEST, addPost )
}

function* commentAPI() {
  return axios.post('/comment')
}

function* addComment(action) {
  try{
    // yield call(postAPI)
    yield delay(2000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      }
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_COMMENT_FAILURE,
    })
  }
}

function* watchAddComment() {
  yield takeLatest( ADD_COMMENT_REQUEST, addComment )
}

export default function* postSaga() {
  yield all ([
    fork(watchAddPost),
    fork(watchAddComment)
  ])
}