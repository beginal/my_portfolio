import React from 'react'
import { Form, Button, Input, List, Card } from 'antd';

const Profile = () => {
  return (
    <div>
      <Form style={{ marginBottom: '20px', border:'1px solid #d9d9d9', padding: '20px',}}>
      <Input addonBefore="닉네임" />
      <Button>수정</Button>
      </Form>
      <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter:4, xs:2, md: 3 }}
      size="small"
      header={<div>팔로워 목록</div>}
      loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
      bordered
      dataSource={['바보','남자','상남자']}
      renderItem={item => (
        <List.Item style={{ marginTop: '20px' }} > 
        <Card><Card.Meta description={item} /></Card>
        </List.Item>
      )}
      />
      </div>
  )
}

export default Profile;
