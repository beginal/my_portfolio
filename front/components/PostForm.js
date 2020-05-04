import React, { useState, useCallback, useEffect } from 'react'
import { Form, Input, Button } from 'antd'; 
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {

  const { imagePath, isAddingPost, postAdded } = useSelector(state => state.post)
  const dispatch = useDispatch(); 
  const [ text, setText ] = useState('')
  const onChangeText = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    setText('')
  }, [postAdded])
  
  const onSubmit = useCallback(() => {
    if(!text?.trim()) {
      return alert('게시글이 없습니다')
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: text,
      }
    })
  }, [text])


  return (
    <div>
      <Form onFinish={onSubmit} encType="multipart/form-data" style={{margin:  '13px 0'}}>
        <div>
          {imagePath.map((v, i) => {
            <div key={v} style={{ display: 'inline-block'}}>
              <img src={`http://localhost:3065/${v}`} style={{width: '200px' }} />
            </div>
          })}
        </div>
        <Input.TextArea autoSize style={{fontSize:'19px', color:'black'}} value={text}
        onChange={onChangeText} maxLength={200} placeholder="내용을 입력해주세요." />
        <div>
          <Button>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }} loading={isAddingPost} htmlType="submit" >입력</Button>
        </div>
        </Form>
    </div>
  )
}

export default PostForm
