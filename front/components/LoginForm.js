import React, { useCallback } from 'react';
import { useInput } from '../util'; 
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
const loginForm = () => {

  const [ id, onChangeId ] = useInput('');
  const [ password, onChangePassword ] = useInput('');

  const { isLoggingIn } = useSelector(state => state.user)

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type:LOG_IN_REQUEST,
      data: {
        userId: id, 
        password
      }
    })
  }, [id,password])

  return (
    <div className="loginComponent">
      <Form onFinish={onSubmit} className="loginForm">
      <div>
        <Input name="user-id" value={id} required placeholder="아이디" onChange={onChangeId} />
      </div>
      <div>
        <Input name="user-password" value={password} type="password" required placeholder="비밀번호" onChange={onChangePassword} />
      </div>
      <div>
        <Button htmlType="submit" loading={isLoggingIn} className="loginBtn">로그인</Button>
      </div>
    </Form>
    </div>
    
  )
}

export default loginForm;
