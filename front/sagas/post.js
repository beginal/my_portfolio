import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { 
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
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

function addcommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try{
    const result = yield call(addcommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      }
    })
  } catch (e) {
    console.error('est1',e)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error:e,
    })
  }
}

function* watchAddComment() {
  yield takeLatest( ADD_COMMENT_REQUEST, addComment )
}

function loadcommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadcommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    });
  } catch (e) {
    console.error('est2',e)
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest( LOAD_COMMENTS_REQUEST, loadComments )
}

function uploadimagesAPI(formData) {
  return axios.post(`/post/images`, formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadimagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e)
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages )
}

export default function* postSaga() {
  yield all ([
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchUploadImages),
  ])
}