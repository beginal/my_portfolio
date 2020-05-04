import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'; 
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const PostForm = () => {  
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post)
  const dispatch = useDispatch(); 
  const [ text, setText ] = useState('')
  const imageInput = useRef();

  useEffect(() => {
    setText('')
  }, [postAdded])
  
  const onSubmit = useCallback(() => {
    if(!text?.trim()) {
      return alert('게시글이 없습니다')
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image',i)
    })
    formData.append('content',text)
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    })
  }, [text, imagePaths])

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onChangeImages = useCallback((e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current])

  return (
    <div>
      <Form onFinish={onSubmit} encType="multipart/form-data" style={{margin:  '13px 0'}}>
        <div>
        {imagePaths.map((v,i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
        <Input.TextArea autoSize style={{fontSize:'19px', color:'black'}} value={text}
        onChange={onChangeText} maxLength={200} placeholder="내용을 입력해주세요." />
        <div>
          <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }} loading={isAddingPost} htmlType="submit" >입력</Button>
        </div>
        </Form>
    </div>
  )
}

export default PostForm
