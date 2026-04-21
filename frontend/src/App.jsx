import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, CalendarOutlined, CarOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import ActivityList from './pages/Activities/List'
import ActivityDetail from './pages/Activities/Detail'
import ActivityCreate from './pages/Activities/Create'
import BusSchedule from './pages/Bus/Schedule'
import FeedbackList from './pages/Feedback/List'
import FeedbackCreate from './pages/Feedback/Create'
import Profile from './pages/Profile'

const { Header, Content, Footer } = Layout

// 导航栏组件
function Navigation() {
  const location = useLocation()
  
  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
    { key: '/activities', icon: <CalendarOutlined />, label: <Link to="/activities">活动</Link> },
    { key: '/bus', icon: <CarOutlined />, label: <Link to="/bus">班车</Link> },
    { key: '/feedbacks', icon: <MessageOutlined />, label: <Link to="/feedbacks">反馈</Link> },
    { key: '/profile', icon: <UserOutlined />, label: <Link to="/profile">我的</Link> },
  ]

  return (
    <Header className="nav-modern" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      width: '100%',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: '700', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.5px',
      }}>
        龙山青年共创实验室
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ 
          flex: 1, 
          minWidth: 0, 
          maxWidth: '600px',
          justifyContent: 'flex-end',
          background: 'transparent',
          borderBottom: 'none',
        }}
        className="nav-menu-modern"
      />
    </Header>
  )
}

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.6) 0%, rgba(186, 230, 253, 0.6) 100%)' }}>
        <Navigation />
        <Content style={{ padding: '24px 50px', marginTop: 16 }}>
          <div className="glass-card" style={{ padding: 32, minHeight: 500 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activities" element={<ActivityList />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/activities/create" element={<ActivityCreate />} />
              <Route path="/bus" element={<BusSchedule />} />
              <Route path="/feedbacks" element={<FeedbackList />} />
              <Route path="/feedbacks/create" element={<FeedbackCreate />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ 
          textAlign: 'center', 
          background: 'transparent',
          color: 'var(--text-secondary)',
          padding: '24px',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>龙山青年共创实验室</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>©2026 Created for Challenge Cup</div>
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
