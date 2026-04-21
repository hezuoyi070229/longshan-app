import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col, Tag, Progress, Button, Radio, message, Empty } from 'antd'
import { PlusOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { activityApi } from '../../services/api'
import dayjs from 'dayjs'

function ActivityList() {
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = ['全部', '社交', '文艺', '科普', '竞技', '其他']

  useEffect(() => {
    fetchActivities()
  }, [category])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const params = category && category !== '全部' ? { category } : {}
      const res = await activityApi.getList(params)
      if (res.code === 200) {
        setActivities(res.data)
      }
    } catch (error) {
      message.error('加载活动失败')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (cat) => {
    const colors = {
      '社交': 'blue',
      '文艺': 'purple',
      '科普': 'cyan',
      '竞技': 'orange',
      '其他': 'default'
    }
    return colors[cat] || 'default'
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>活动广场</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/activities/create')}>
          发起活动
        </Button>
      </div>

      <Radio.Group 
        value={category || '全部'} 
        onChange={(e) => setCategory(e.target.value === '全部' ? '' : e.target.value)}
        style={{ marginBottom: 24 }}
      >
        {categories.map(cat => (
          <Radio.Button key={cat} value={cat}>{cat}</Radio.Button>
        ))}
      </Radio.Group>

      {activities.length === 0 ? (
        <Empty description="暂无活动" />
      ) : (
        <Row gutter={[16, 16]}>
          {activities.map(activity => (
            <Col xs={24} sm={12} lg={8} key={activity.id}>
              <Card 
                className="card-hover"
                hoverable
                onClick={() => navigate(`/activities/${activity.id}`)}
                title={activity.title}
                extra={<Tag color={getCategoryColor(activity.category)}>{activity.category}</Tag>}
              >
                <p style={{ color: '#666', marginBottom: 12 }}>
                  <EnvironmentOutlined /> {activity.location}
                </p>
                <p style={{ marginBottom: 12 }}>发起人: {activity.creatorName}</p>
                <Progress 
                  percent={Math.min(Math.round((activity.currentPeople / activity.minPeople) * 100), 100)}
                  status={activity.currentPeople >= activity.minPeople ? 'success' : 'active'}
                  format={() => `${activity.currentPeople}/${activity.minPeople}人`}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <Tag color={getStatusColor(activity.status)}>{activity.status}</Tag>
                  {activity.scheduledDate && (
                    <span style={{ color: '#06b6d4' }}>
                      {dayjs(activity.scheduledDate).format('M月D日')}举办
                    </span>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default ActivityList
