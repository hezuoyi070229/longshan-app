import { useEffect, useState } from 'react'
import { Row, Col, Card, Tag, Progress, Button, message } from 'antd'
import { CalendarOutlined, EnvironmentOutlined, CarOutlined, MessageOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { activityApi, busApi, feedbackApi } from '../services/api'
import dayjs from 'dayjs'

function Home() {
  const [activities, setActivities] = useState([])
  const [busSchedules, setBusSchedules] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [activityRes, busRes, feedbackRes] = await Promise.all([
        activityApi.getList({ status: '报名中' }),
        busApi.getSchedules({ date: dayjs().format('YYYY-MM-DD') }),
        feedbackApi.getList({})
      ])
      
      if (activityRes.code === 200) {
        setActivities(activityRes.data.slice(0, 2))
      }
      if (busRes.code === 200) {
        setBusSchedules(busRes.data.slice(0, 2))
      }
      if (feedbackRes.code === 200) {
        setFeedbacks(feedbackRes.data.slice(0, 3))
      }
    } catch (error) {
      message.error('加载数据失败')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      '社交': 'blue',
      '文艺': 'purple',
      '科普': 'green',
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

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>🔥 本周热门活动</h2>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {activities.map(activity => (
          <Col xs={24} sm={12} key={activity.id}>
            <Card 
              className="card-hover"
              title={activity.title}
              extra={<Tag color={getCategoryColor(activity.category)}>{activity.category}</Tag>}
              actions={[
                <Link to={`/activities/${activity.id}`}>查看详情</Link>
              ]}
            >
              <p><EnvironmentOutlined /> {activity.location}</p>
              <Progress 
                percent={Math.round((activity.currentPeople / activity.minPeople) * 100)}
                status={activity.currentPeople >= activity.minPeople ? 'success' : 'active'}
                format={() => `${activity.currentPeople}/${activity.minPeople}人`}
              />
              <Tag color={getStatusColor(activity.status)}>{activity.status}</Tag>
              {activity.currentPeople >= activity.minPeople && (
                <p style={{ color: '#52c41a', marginTop: 8 }}>
                  已达成！将于 {dayjs(activity.scheduledDate).format('M月D日')} 举办
                </p>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Link to="/activities">
          <Button type="link">查看更多活动 <ArrowRightOutlined /></Button>
        </Link>
      </div>

      <h2 style={{ marginBottom: 24 }}>🚌 本周末班车</h2>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {busSchedules.map(schedule => (
          <Col xs={24} sm={12} key={schedule.id}>
            <Card className="card-hover">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Tag color={schedule.direction === '去程' ? 'blue' : 'green'}>
                    {schedule.direction}
                  </Tag>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: 8 }}>
                    {schedule.departTime}
                  </span>
                  <span style={{ margin: '0 8px' }}>→</span>
                  <span>{schedule.arriveTime}</span>
                </div>
                <div>
                  <span style={{ color: '#f5222d', fontSize: '16px', fontWeight: 'bold' }}>
                    ¥{schedule.price}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 12, color: '#666' }}>
                <p>{schedule.fromLocation} → {schedule.toLocation}</p>
                <p>剩余座位: {schedule.maxSeats - schedule.bookedSeats}/{schedule.maxSeats}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 style={{ marginBottom: 24 }}>📢 热门反馈</h2>
      <Card>
        {feedbacks.map((feedback, index) => (
          <div 
            key={feedback.id} 
            style={{ 
              padding: '12px 0', 
              borderBottom: index < feedbacks.length - 1 ? '1px solid #f0f0f0' : 'none' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>{feedback.title}</span>
              <Tag color={feedback.status === '已回复' ? 'success' : 'processing'}>
                {feedback.status}
              </Tag>
            </div>
            <p style={{ color: '#666', marginTop: 8 }}>{feedback.content?.substring(0, 50)}...</p>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#1890ff' }}>已有 {feedback.upvotes} 人 +1</span>
            </div>
          </div>
        ))}
      </Card>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link to="/feedbacks">
          <Button type="link">查看全部反馈 <ArrowRightOutlined /></Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
