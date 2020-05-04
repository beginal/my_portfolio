import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { 
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
} from '../reducers/post'

function addpostAPI(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  })
}

function* addPost(action) {
  try{
    const result = yield call(addpostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
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



function loadmainpostAPI() {
  return axios.get('/posts')
}

function* loadMainPosts() {
  try{
    const result = yield call(loadmainpostAPI)
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts )
}

function loadhashtagpostsAPI(tag) {
  return axios.get(`/hashtag/${tag}`)
}

function* loadHashtagPosts(action) {
  try{
    const result = yield call(loadhashtagpostsAPI, action.data)
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts )
}

function loaduserpostsAPI(id) {
  return axios.get(`/user/${id}/posts`)
}

function* loadUserPosts(action) {
  try{
    const result = yield call(loaduserpostsAPI, action.data)
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts )
}

function commentAPI() {
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
    fork(watchLoadMainPosts),
    fork(watchAddComment),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
  ])
}