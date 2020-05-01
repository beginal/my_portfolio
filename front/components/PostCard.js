import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Input, Form, Button, List, Comment } from 'antd';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {

  const [ commentFormOpened, setCommentFormOpened ] = useState(false);
  const [ commentText, setCommentText] = useState('');
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post)
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
    if(!commentFormOpened) {
    }
  }, [commentFormOpened])

  const onChangeComment = useCallback((e) => {
    setCommentText(e.target.value)
  }, [])

  const onSubmitComment = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
      }
    })
  }, [me&& me.id])

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  return (
    <div className="mainPost">
        <Card
          key={+post.createdAt}
          cover={post.img && <img src={post.img} />}
          actions={[
            <div key="comment" onClick={onToggleComment}>Comment</div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={post.content}
          />
        </Card>
        {commentFormOpened && (
          <>
          <List 
            header={ `${post.comments ? post.comments.length : 0} 댓글`}
            itemLayout= 'horizontal'
            dataSource={post.comments || []}
            renderItem={item => ( // item은 post.Comment 반복문 돈것의 하나하나의 요소
              <li>
                <Comment 
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}

          />
          <Form onFinish={onSubmitComment}>
            <Form.Item>
              <Input.TextArea row={4} value={commentText} onChange={onChangeComment} />
              <Button type="primary" htmlType="submit" loading={isAddingComment} > 입력 </Button>
            </Form.Item>
          </Form>
          </>
        )}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  })
}

export default PostCard
