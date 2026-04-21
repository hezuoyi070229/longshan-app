import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, List, Tag, Button, Radio, message, Empty, Avatar } from 'antd'
import { PlusOutlined, LikeOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { feedbackApi } from '../../services/api'
import dayjs from 'dayjs'

function FeedbackList() {
  const navigate = useNavigate()
  const [feedbacks, setFeedbacks] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = ['全部', '交通', '设施', '业态', '环境', '管理', '其他']

  useEffect(() => {
    fetchFeedbacks()
  }, [category])

  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      const params = category && category !== '全部' ? { category } : {}
      const res = await feedbackApi.getList(params)
      if (res.code === 200) {
        setFeedbacks(res.data)
      }
    } catch (error) {
      message.error('加载反馈失败')
    } finally {
      setLoading(false)
    }
  }

  const handleUpvote = async (id) => {
    try {
      const res = await feedbackApi.upvote(id)
      if (res.code === 200) {
        message.success('点赞成功！')
        fetchFeedbacks()
      }
    } catch (error) {
      message.error('点赞失败')
    }
  }

  const getCategoryColor = (cat) => {
    const colors = {
      '交通': 'blue',
      '设施': 'cyan',
      '业态': 'cyan',
      '环境': 'green',
      '管理': 'orange',
      '其他': 'default'
    }
    return colors[cat] || 'default'
  }

  const getStatusColor = (status) => {
    const colors = {
      '待处理': 'default',
      '处理中': 'processing',
      '已回复': 'success',
      '已解决': 'success',
      '已关闭': 'error'
    }
    return colors[status] || 'default'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>反馈广场</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/feedbacks/create')}>
          提交反馈
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

      {feedbacks.length === 0 ? (
        <Empty description="暂无反馈" />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          dataSource={feedbacks}
          renderItem={item => (
            <List.Item>
              <Card className="card-hover">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontWeight: 'bold' }}>{item.userName || '匿名用户'}</span>
                        <Tag color={getCategoryColor(item.category)}>{item.category}</Tag>
                        <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                      </div>
                      <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ color: '#666', marginBottom: 12 }}>
                        {item.content?.substring(0, 100)}...
                      </p>
                      <div style={{ color: '#999', fontSize: '12px' }}>
                        {dayjs(item.createTime).format('YYYY-MM-DD HH:mm')}
                      </div>
                    </div>
                  </div>
                </div>

                {item.officialReply && (
                  <div style={{ 
                    marginTop: 16, 
                    padding: 12, 
                    background: 'rgba(20, 184, 166, 0.08)', 
                    borderRadius: 8,
                    borderLeft: '3px solid #14b8a6'
                  }}>
                    <div style={{ color: '#14b8a6', fontWeight: 'bold', marginBottom: 4 }}>
                      官方回复
                    </div>
                    <p style={{ color: '#666' }}>{item.officialReply}</p>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                  <Button 
                    type="link" 
                    icon={<LikeOutlined />}
                    onClick={() => handleUpvote(item.id)}
                  >
                    已有 {item.upvotes} 人 +1
                  </Button>
                  <Button type="link">
                    查看详情 <ArrowRightOutlined />
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default FeedbackList
