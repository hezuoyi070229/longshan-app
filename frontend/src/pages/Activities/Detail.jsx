import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Tag, Progress, Button, List, Avatar, Modal, Form, Input, message, Empty } from 'antd'
import { ArrowLeftOutlined, UserOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
import { activityApi } from '../../services/api'
import dayjs from 'dayjs'

function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [signups, setSignups] = useState([])
  const [loading, setLoading] = useState(true)
  const [signupModalVisible, setSignupModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchActivityDetail()
  }, [id])

  const fetchActivityDetail = async () => {
    try {
      setLoading(true)
      const res = await activityApi.getDetail(id)
      if (res.code === 200) {
        setActivity(res.data.activity)
        setSignups(res.data.signups || [])
      }
    } catch (error) {
      message.error('加载活动详情失败')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (values) => {
    try {
      const res = await activityApi.signup(id, values)
      if (res.code === 200) {
        message.success('报名成功！')
        setSignupModalVisible(false)
        form.resetFields()
        fetchActivityDetail()
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error('报名失败')
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      '社交': 'blue',
      '文艺': 'cyan',
      '科普': 'cyan',
      '竞技': 'orange',
      '其他': 'default'
    }
    return colors[category] || 'default'
  }

  const getStatusColor = (status) => {
    const colors = {
      '报名中': 'success',
      '已排期': 'processing',
      '已结束': 'default',
      '已取消': 'error'
    }
    return colors[status] || 'default'
  }

  if (loading) {
    return <div>加载中...</div>
  }

  if (!activity) {
    return <Empty description="活动不存在" />
  }

  const progressPercent = Math.min(Math.round((activity.currentPeople / activity.minPeople) * 100), 100)
  const isFull = activity.currentPeople >= activity.minPeople

  return (
    <div>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/activities')}
        style={{ marginBottom: 16 }}
      >
        返回列表
      </Button>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ display: 'inline-block', marginRight: 16 }}>{activity.title}</h1>
          <Tag color={getCategoryColor(activity.category)}>{activity.category}</Tag>
          <Tag color={getStatusColor(activity.status)}>{activity.status}</Tag>
        </div>

        <p style={{ color: '#000000', marginBottom: 8 }}>
          <UserOutlined /> 发起人: {activity.creatorName}
        </p>
        <p style={{ color: '#000000', marginBottom: 8 }}>
          <EnvironmentOutlined /> 地点: {activity.location}
        </p>
        {activity.proposedDates && (
          <p style={{ color: '#000000', marginBottom: 8 }}>
            <CalendarOutlined /> 建议日期: {activity.proposedDates}
          </p>
        )}

        <div style={{ margin: '24px 0', padding: '16px', background: 'rgba(6, 182, 212, 0.08)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>已有 {activity.currentPeople} 人想参加（最低 {activity.minPeople} 人）</span>
            <span style={{ color: '#000000', fontWeight: 'bold' }}>
              {progressPercent}%
            </span>
          </div>
          <Progress 
            percent={progressPercent}
            status={isFull ? 'success' : 'active'}
            showInfo={false}
            strokeColor={isFull ? '#06b6d4' : '#3b82f6'}
          />
          {isFull && activity.scheduledDate && (
            <p style={{ color: '#000000', marginTop: 8, textAlign: 'center' }}>
              已达成！将于 {dayjs(activity.scheduledDate).format('YYYY年M月D日')} 举办
            </p>
          )}
          {!isFull && (
            <p style={{ color: '#000000', marginTop: 8, textAlign: 'center' }}>
              还差 {activity.minPeople - activity.currentPeople} 人成行，点击支持！
            </p>
          )}
        </div>

        <h3 style={{ marginBottom: 16 }}>活动描述</h3>
        <p style={{ lineHeight: 1.8, marginBottom: 24 }}>{activity.description}</p>

        <Button 
          type="primary" 
          size="large" 
          block
          onClick={() => setSignupModalVisible(true)}
        >
          {isFull ? '已排期，点击报名参加' : '我想参加'}
        </Button>
        <p style={{ textAlign: 'center', color: '#000000', marginTop: 8, fontSize: '12px' }}>
          （报名后获取具体地点和注意事项）
        </p>
      </Card>

      {signups.length > 0 && (
        <Card style={{ marginTop: 24 }} title={`已报名的同学（${signups.length}人）`}>
          <List
            dataSource={signups}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.userName}
                  description={dayjs(item.signupTime).format('MM-DD HH:mm')}
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      <Modal
        title="活动报名"
        open={signupModalVisible}
        onCancel={() => setSignupModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSignup} layout="vertical">
          <Form.Item
            name="userName"
            label="您的姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              确认报名
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ActivityDetail
