import React, { useState, useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useInput } from '../util'; 
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';

const signup = () => {
  
  const [ nickname, onChangeNickname ] = useInput('');
  const [ id, onChangeId ] = useInput('');
  const [ password, onChangePassword ] = useInput('');
  const [ passwordCheck, setPasswordCheck ] = useState('');
  const [ passwordError, setPasswordError ] = useState(false);

  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.user)

  useEffect(() => {
    if(me) {
      alert('메인 페이지로 이동합니다.')
      Router.push('/')
    }

  }, [me && me.id])

  const onSubmit = useCallback(() => {
    if( password !== passwordCheck ) {
      return setPasswordError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        nickname,
        password,

      }
    })
  }, [id, nickname, password, passwordCheck])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password)
    setPasswordCheck(e.target.value);
  },[password])

  return (
    <>
    <div className="signupPage">
    <Form onFinish={onSubmit} className="signupForm">
    <h1> 회원 가입 </h1>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} required placeholder="아이디" onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-nickname">닉네임</label>
        <br />
        <Input name="user-nickname" value={nickname} required placeholder="닉네임" onChange={onChangeNickname} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" value={password} type="password" required placeholder="비밀번호 ( 영문/숫자 포함 8~16자 )" onChange={onChangePassword} />
      </div>
      <div>
        <label htmlFor="user-passwordCheck">비밀번호 확인</label>
        <br />
        <Input name="user-passwordCheck" value={passwordCheck} type="password" required placeholder="비밀번호 확인 ( 영문/숫자 포함 8~16자 )" onChange={onChangePasswordCheck} />
        {passwordError &&  <div className="signupError">비밀번호가 일치하지 않습니다.</div>}
      </div>
      <div>
        <Button htmlType="submit" loading={isSigningUp} className="submitBtn">회원가입</Button>
      </div>
    </Form>
    </div>
    </>
  )
}

export default signup
