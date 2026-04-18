import axios from 'axios'

// 从环境变量获取 API 地址，默认为本地
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 活动相关 API
export const activityApi = {
  // 获取活动列表
  getList: (params) => api.get('/activities', { params }),
  
  // 获取活动详情
  getDetail: (id) => api.get(`/activities/${id}`),
  
  // 创建活动
  create: (data) => api.post('/activities', data),
  
  // 报名活动
  signup: (id, data) => api.post(`/activities/${id}/signup`, data),
  
  // 我的活动
  getMyActivities: (userId) => api.get('/activities/my', { params: { userId } })
}

// 班车相关 API
export const busApi = {
  // 获取班次列表
  getSchedules: (params) => api.get('/bus/schedules', { params }),
  
  // 预约班车
  book: (data) => api.post('/bus/book', data),
  
  // 我的预约
  getMyBookings: (userId) => api.get('/bus/bookings', { params: { userId } }),
  
  // 取消预约
  cancelBooking: (id) => api.post(`/bus/bookings/${id}/cancel`)
}

// 反馈相关 API
export const feedbackApi = {
  // 获取反馈列表
  getList: (params) => api.get('/feedbacks', { params }),
  
  // 获取反馈详情
  getDetail: (id) => api.get(`/feedbacks/${id}`),
  
  // 提交反馈
  create: (data) => api.post('/feedbacks', data),
  
  // 点赞反馈
  upvote: (id) => api.post(`/feedbacks/${id}/upvote`)
}

export default api
