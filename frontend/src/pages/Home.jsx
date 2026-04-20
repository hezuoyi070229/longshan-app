import { useEffect, useState } from 'react'
import { Row, Col, Card, Tag, Progress, Button, message, Statistic } from 'antd'
import { 
  CalendarOutlined, 
  EnvironmentOutlined, 
  CarOutlined, 
  MessageOutlined, 
  ArrowRightOutlined,
  FireOutlined,
  BusOutlined,
  CommentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SeatOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { activityApi, busApi, feedbackApi } from '../services/api'
import dayjs from 'dayjs'

function Home() {
  const [activities, setActivities] = useState([])
  const [busSchedules, setBusSchedules] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalBusSchedules: 0,
    totalFeedbacks: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      const [activityRes, busRes, feedbackRes] = await Promise.all([
        activityApi.getList({ status: '报名中' }),
        busApi.getSchedules({}),
        feedbackApi.getList({})
      ])
      
      if (activityRes.code === 200) {
        setActivities(activityRes.data.slice(0, 2))
        setStats(prev => ({ ...prev, totalActivities: activityRes.data.length }))
      }
      if (busRes.code === 200) {
        setBusSchedules(busRes.data.slice(0, 2))
        setStats(prev => ({ ...prev, totalBusSchedules: busRes.data.length }))
      }
      if (feedbackRes.code === 200) {
        setFeedbacks(feedbackRes.data.slice(0, 3))
        setStats(prev => ({ ...prev, totalFeedbacks: feedbackRes.data.length }))
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
    <div className="animate-fade-in-up">
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={8}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>进行中的活动</span>}
              value={stats.totalActivities}
              prefix={<FireOutlined style={{ color: '#f59e0b' }} />}
              valueStyle={{ color: '#8b5cf6', fontWeight: 700, fontSize: '28px' }}
            />
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)' }}>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>本周班车</span>}
              value={stats.totalBusSchedules}
              prefix={<BusOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ color: '#10b981', fontWeight: 700, fontSize: '28px' }}
            />
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)' }}>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>反馈建议</span>}
              value={stats.totalFeedbacks}
              prefix={<CommentOutlined style={{ color: '#3b82f6' }} />}
              valueStyle={{ color: '#3b82f6', fontWeight: 700, fontSize: '28px' }}
            />
          </div>
        </Col>
      </Row>

      {/* 本周热门活动 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 24 
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <FireOutlined style={{ color: '#f59e0b' }} />
            本周热门活动
          </h2>
          <Link to="/activities">
            <Button type="link" style={{ color: '#8b5cf6' }}>
              查看更多 <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
        
        <Row gutter={[16, 16]}>
          {activities.map(activity => (
            <Col xs={24} sm={12} key={activity.id}>
              <Card 
                className="card-hover"
                style={{ borderRadius: 16, overflow: 'hidden' }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, flex: 1, marginRight: 12 }}>
                    {activity.title}
                  </h3>
                  <Tag color={getCategoryColor(activity.category)} style={{ borderRadius: 12 }}>
                    {activity.category}
                  </Tag>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  <EnvironmentOutlined />
                  <span>{activity.location}</span>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>报名进度</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#8b5cf6' }}>
                      {activity.currentPeople}/{activity.minPeople}人
                    </span>
                  </div>
                  <Progress 
                    percent={Math.round((activity.currentPeople / activity.minPeople) * 100)}
                    status={activity.currentPeople >= activity.minPeople ? 'success' : 'active'}
                    showInfo={false}
                    strokeColor={activity.currentPeople >= activity.minPeople ? '#10b981' : '#8b5cf6'}
                    trailColor="rgba(0,0,0,0.05)"
                    strokeWidth={8}
                    style={{ margin: 0 }}
                  />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tag color={getStatusColor(activity.status)} style={{ borderRadius: 12 }}>
                    {activity.status}
                  </Tag>
                  <Link to={`/activities/${activity.id}`}>
                    <Button type="primary" size="small" style={{ borderRadius: 20 }}>
                      查看详情
                    </Button>
                  </Link>
                </div>
                
                {activity.currentPeople >= activity.minPeople && (
                  <div style={{ 
                    marginTop: 12, 
                    padding: '8px 12px', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <span style={{ color: '#10b981', fontSize: '12px' }}>
                      已达成！将于 {dayjs(activity.scheduledDate).format('M月D日')} 举办
                    </span>
                  </div>
                )}
              </Card>
            </Col>
          ))}
          {activities.length === 0 && (
            <Col xs={24}>
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                <CalendarOutlined style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
                <p>暂无进行中的活动</p>
              </div>
            </Col>
          )}
        </Row>
      </div>

      {/* 本周班车 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 24 
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <BusOutlined style={{ color: '#10b981' }} />
            本周班车
          </h2>
          <Link to="/bus">
            <Button type="link" style={{ color: '#8b5cf6' }}>
              查看全部 <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
        
        <Row gutter={[16, 16]}>
          {busSchedules.length === 0 && (
            <Col xs={24}>
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                <BusOutlined style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
                <p>暂无班车数据</p>
              </div>
            </Col>
          )}
          {busSchedules.map(schedule => (
            <Col xs={24} sm={12} key={schedule.id}>
              <Card 
                className="card-hover"
                style={{ borderRadius: 16 }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Tag 
                      color={schedule.direction === '去程' ? 'blue' : 'green'}
                      style={{ borderRadius: 12, fontWeight: 600 }}
                    >
                      {schedule.direction}
                    </Tag>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {schedule.departTime}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        出发
                      </div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>→</div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {schedule.arriveTime}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        到达
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#f59e0b', fontSize: '24px', fontWeight: 700 }}>
                      ¥{schedule.price}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      每人
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  padding: '12px 16px', 
                  background: 'rgba(0,0,0,0.02)', 
                  borderRadius: 12,
                  marginBottom: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: '#10b981' 
                    }} />
                    <span style={{ fontWeight: 500 }}>{schedule.fromLocation}</span>
                  </div>
                  <div style={{ 
                    width: 2, 
                    height: 20, 
                    background: 'rgba(0,0,0,0.1)', 
                    marginLeft: 3,
                    marginBottom: 8
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: '#8b5cf6' 
                    }} />
                    <span style={{ fontWeight: 500 }}>{schedule.toLocation}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                    <TeamOutlined />
                    <span>剩余 {schedule.maxSeats - schedule.bookedSeats} 座</span>
                  </div>
                  <Link to="/bus">
                    <Button type="primary" size="small" style={{ borderRadius: 20 }}>
                      立即预约
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 热门反馈 */}
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 24 
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <CommentOutlined style={{ color: '#3b82f6' }} />
            热门反馈
          </h2>
          <Link to="/feedbacks">
            <Button type="link" style={{ color: '#8b5cf6' }}>
              查看全部 <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
        
        <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 0 }}>
          {feedbacks.map((feedback, index) => (
            <div 
              key={feedback.id} 
              style={{ 
                padding: '20px 24px', 
                borderBottom: index < feedbacks.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                transition: 'background 0.3s ease',
                cursor: 'pointer'
              }}
              className="feedback-item"
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.02)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h4 style={{ fontWeight: 600, margin: 0, flex: 1, marginRight: 12 }}>
                  {feedback.title}
                </h4>
                <Tag 
                  color={feedback.status === '已回复' ? 'success' : 'processing'}
                  style={{ borderRadius: 12 }}
                >
                  {feedback.status}
                </Tag>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                {feedback.content?.substring(0, 80)}...
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8b5cf6' }}>
                  <span style={{ fontSize: '16px' }}>+1</span>
                  <span style={{ fontWeight: 600 }}>{feedback.upvotes}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  {dayjs(feedback.createTime).format('MM-DD')}
                </div>
              </div>
            </div>
          ))}
          {feedbacks.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
              <CommentOutlined style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
              <p>暂无反馈数据</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Home
