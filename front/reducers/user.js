export const initialState = {
  me: null, // 내  정보 / 로그인 여부
  isLoggingIn: false, // 로그인 시도중
  loginErrorReason: '', // 로그인 실패 샤유
  toggleLoggedIn: false, // 로그인 버튼 토글
  signingIn: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signupErrorReason: '', // 회원가입 실패 사유
  isLoggingOut: false,
  userInfo: null,
  signUpdata: {
    id: '',
    nickname: '',
    password: '',
  }
}
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

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
        me: action.data,
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
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null,
      }
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        
      }
    }
    case LOAD_USER_SUCCESS: {
      if(action.me) {
        return {
        ...state,
        me: action.data,
      };
      }
      return {
        ...state,
        userInfo: action.data,
      }      
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state
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
