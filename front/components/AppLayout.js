import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Menu, Row, Col } from 'antd';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { 
  TOGGLE_LOG_IN, 
  LOG_OUT_REQUEST,
  LOAD_USER_REQUEST,
} from '../reducers/user';

const AppLayout = ({ children }) => {

  const { me, toggleLoggedIn } = useSelector(state => state.user);
  const { SubMenu } = Menu;

  const [toggleSearch, setToggleSearch] = useState(true);
  const [toggleLogin, setToggleLogin] = useState(toggleLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      dispatch({
        type:LOAD_USER_REQUEST,
      })
    }
  }, [me])

  const onToggleSearch = () => {
    setToggleSearch(!toggleSearch)
  }
  const onToggleLogin = () => {
    setToggleLogin(!toggleLogin)
    dispatch({
      type: TOGGLE_LOG_IN,
      data: toggleLogin,
    })
  }

  const onLogOut = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }
  
  return (
    <div>
      <div className="topBar" >
        <Menu mode="horizontal">
          <Menu.Item key="home"><Link href="/"><a>PortFolio</a></Link></Menu.Item>
          <Menu.Item key="tagsearch"><Link href="/tagsearch"><a>태그검색</a></Link></Menu.Item>
          <Menu.Item key="freeboard"><Link href="/freeboard"><a>자유게시판</a></Link></Menu.Item>

        </Menu>
        <Menu mode="horizontal">
          <Menu.Item key="search">
            {toggleSearch
              ?
              <input placeholder="게시글 검색" className="searchInput" />
              : <div onClick={onToggleSearch}>Search</div>
            }
          </Menu.Item>
        </Menu>
        {me ?
        <Menu mode="horizontal">
          <SubMenu
            key="myprofile"
        title={
          <Link href="profile"><a>{me.nickname}</a></Link>
          }
          >
            <Menu.Item key="3">내 글 : {me.post}개 </Menu.Item>
            <Menu.Item key="4">뭘로할까</Menu.Item>
            </SubMenu>
          <Menu.Item key="signup">
          <div onClick={onLogOut}>로그아웃</div>
          </Menu.Item>
        </Menu>
        :
        <Menu mode="horizontal">
            <Menu.Item key="login">
              <div onClick={onToggleLogin}>로그인</div>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link href="signup"><a>회원가입</a></Link>
            </Menu.Item>
          </Menu>
        }
      </div>

      <Menu>
        {toggleLoggedIn && <LoginForm />}
      </Menu>
      <Row gutter={8}>
        <Col xs={5} md={5}>
        </Col>
        <Col xs={12} md={12}>
        {children}
        </Col>
        <Col xs={12} md={12}>
        </Col>
      </Row>
      
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout;
