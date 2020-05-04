import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';;
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { Card,Avatar } from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post)
  const { userInfo } = useSelector(state => state.user)
  console.log(id);
  useEffect(() => {
    dispatch({
      type:LOAD_USER_REQUEST,
      data:id,
    })
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    })
  }, []);
  return (
    <div>
      {userInfo
        ?
        <Card
          actions={[
            <div key="dummys">{userInfo.Post}</div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
        : null
      }
    {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
}

User.getInitialProps = async (context) => { // Hashtag는 context의 컴포넌트가 됨
  return { id: context.query.id }
}

export default User;