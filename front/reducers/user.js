const dummyUser = {
  nickname : '준호',
  post: [],
  id: 1,
}

export const initialState = {
  me: null, // 내  정보 / 로그인 여부
  isLoggingIn: false, // 로그인 시도중
  loginErrorReason: '', // 로그인 실패 샤유
  toggleLoggedIn: false, // 로그인 버튼 토글
  signingIn: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signupErrorReason: '', // 회원가입 실패 사유
  userInfo: { // 남의 정보
    nickname: '준호',
    post: 4,
  },
  signUpdata: {
    id: '',
    nickname: '',
    password: '',
  }
}
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const TOGGLE_LOG_IN = 'TOGGLE_LOG_IN';

export default (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_LOG_IN: {
      return {
        ...state,
        toggleLoggedIn: !action.data
      }
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        me: false,
        loginErrorReason: '',
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        me: dummyUser,
        isLoggingIn: false,
        toggleLoggedIn: false,
      }
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        loginErrorReason: action.error
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        me: false,
      }
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signupErrorReason: '',
        signUpdata: ''
        
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        signUpdata: action.data,
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signupErrorReason: action.error, //saga의 FAILURE에서 넣었던 error가 들어감
      }
    }
    default : {
      return {
        ...state,
      }
    }
  }
}
