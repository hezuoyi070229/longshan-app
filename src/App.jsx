import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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

function App() {
  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
    { key: '/activities', icon: <CalendarOutlined />, label: <Link to="/activities">活动</Link> },
    { key: '/bus', icon: <CarOutlined />, label: <Link to="/bus">班车</Link> },
    { key: '/feedbacks', icon: <MessageOutlined />, label: <Link to="/feedbacks">反馈</Link> },
    { key: '/profile', icon: <UserOutlined />, label: <Link to="/profile">我的</Link> },
  ]

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: '#fff' }}>
          <div style={{ float: 'left', fontSize: '18px', fontWeight: 'bold', marginRight: '24px' }}>
            龙山青年共创实验室
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['/']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 16 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
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
        <Footer style={{ textAlign: 'center' }}>
          龙山青年共创实验室 ©2026 Created for Challenge Cup
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
