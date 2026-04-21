import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './App.jsx'
import './index.css'
import './styles/theme.css'

// 自定义主题配置 - 北极光蓝绿色调
const customTheme = {
  token: {
    colorPrimary: '#38bdf8',
    colorSuccess: '#22d3ee',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    borderRadius: 12,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    boxShadowSecondary: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  components: {
    Card: {
      borderRadius: 16,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    Button: {
      borderRadius: 24,
    },
    Input: {
      borderRadius: 12,
    },
    Tag: {
      borderRadius: 16,
    },
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={customTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
