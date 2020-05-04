export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'admin',
    },
    content: '내용',
    img: 'https://cafe-1393d.kxcdn.com/wp-content/uploads/2020/04/MCS_0828_R1-1229x1536.jpeg',
    comments: [],
  }],
  imagePath: [],
  postAdded: false,
  isAddingPost: false,
  addPostErrorReason: '',
  commentAdded: false,
  isAddingComment: false,
  addCommentErrorReason: '',
}


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POST_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POST_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POST_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POST_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POST_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POST_REQUEST'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POST_SUCCESS'
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POST_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
        postAdded: false,
        addPostErrorReason: '',
      }
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        postAdded: true,
        mainPosts: [action.data, ...state.mainPosts]
      }
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error,
      }
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddingComment: true,
        commentAdded: false,
        addCommentErrorReason: '',
      }
    }
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
      const post = state.mainPosts[postIndex];
      const comments = [...post.comments, dummyComment];
      const mainPosts = [...state.mainPosts]
      mainPosts[postIndex] = { ...post, comments }
      return {
        ...state,
        isAddingComment: false,
        mainPosts,
        commentAdded: true,
      }
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error,
      }
    }
    case LOAD_MAIN_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_REQUEST: 
    case LOAD_USER_POSTS_REQUEST:  {
      return {
        ...state,
        mainPosts: [],
      }
    }
    case LOAD_MAIN_POSTS_SUCCESS: 
    case LOAD_HASHTAG_POSTS_SUCCESS: 
    case LOAD_USER_POSTS_SUCCESS:  {
      return {
        ...state,
        mainPosts: action.data,
      }
    }
    case LOAD_MAIN_POSTS_FAILURE: 
    case LOAD_HASHTAG_POSTS_FAILURE: 
    case LOAD_USER_POSTS_FAILURE:  {
      return {
        ...state,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
