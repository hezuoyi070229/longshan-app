import { useEffect, useState } from 'react'
import { Card, Tabs, List, Tag, Button, Empty, message } from 'antd'
import { CalendarOutlined, CarOutlined, SettingOutlined } from '@ant-design/icons'
import { activityApi, busApi } from '../services/api'
import dayjs from 'dayjs'

const { TabPane } = Tabs

function Profile() {
  const [myActivities, setMyActivities] = useState([])
  const [myBookings, setMyBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [activityRes, bookingRes] = await Promise.all([
        activityApi.getMyActivities('user123'),
        busApi.getMyBookings('user123')
      ])
      
      if (activityRes.code === 200) {
        setMyActivities(activityRes.data)
      }
      if (bookingRes.code === 200) {
        setMyBookings(bookingRes.data)
      }
    } catch (error) {
      message.error('加载数据失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (id) => {
    try {
      const res = await busApi.cancelBooking(id)
      if (res.code === 200) {
        message.success('取消成功')
        fetchData()
      }
    } catch (error) {
      message.error('取消失败')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      '已报名': 'success',
      '已排期': 'processing',
      '已结束': 'default',
      '已预约': 'success',
      '已上车': 'processing',
      '已取消': 'error'
    }
    return colors[status] || 'default'
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>个人中心</h2>

      <Tabs defaultActiveKey="activities">
        <TabPane 
          tab={<span><CalendarOutlined /> 我的活动</span>} 
          key="activities"
        >
          {myActivities.length === 0 ? (
            <Empty description="暂无活动记录" />
          ) : (
            <List
              dataSource={myActivities}
              renderItem={item => (
                <List.Item>
                  <Card style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3>{item.title}</h3>
                        <p style={{ color: '#666' }}>{item.location}</p>
                        <p style={{ color: '#999', fontSize: '12px' }}>
                          {dayjs(item.createTime).format('YYYY-MM-DD HH:mm')}
                        </p>
                      </div>
                      <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </TabPane>

        <TabPane 
          tab={<span><CarOutlined /> 我的预约</span>} 
          key="bookings"
        >
          {myBookings.length === 0 ? (
            <Empty description="暂无预约记录" />
          ) : (
            <List
              dataSource={myBookings}
              renderItem={item => (
                <List.Item>
                  <Card style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3>班车预约</h3>
                        <p style={{ color: '#666' }}>乘车人: {item.userName}</p>
                        <p style={{ color: '#666' }}>验证码: <strong>{item.checkinCode}</strong></p>
                        <p style={{ color: '#999', fontSize: '12px' }}>
                          {dayjs(item.bookingTime).format('YYYY-MM-DD HH:mm')}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                        {item.status === '已预约' && (
                          <Button 
                            size="small" 
                            danger 
                            style={{ marginLeft: 8 }}
                            onClick={() => handleCancelBooking(item.id)}
                          >
                            取消
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </TabPane>

        <TabPane 
          tab={<span><SettingOutlined /> 设置</span>} 
          key="settings"
        >
          <Card>
            <p>设置功能开发中...</p>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
