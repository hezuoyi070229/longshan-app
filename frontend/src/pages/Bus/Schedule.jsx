import { useEffect, useState } from 'react'
import { Card, Row, Col, Tag, Button, Calendar, Badge, Modal, Form, Input, message, Empty } from 'antd'
import { CarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { busApi } from '../../services/api'
import dayjs from 'dayjs'

function BusSchedule() {
  const [schedules, setSchedules] = useState([])
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [loading, setLoading] = useState(true)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchSchedules()
  }, [selectedDate])

  const fetchSchedules = async () => {
    try {
      setLoading(true)
      const res = await busApi.getSchedules({
        date: selectedDate.format('YYYY-MM-DD')
      })
      if (res.code === 200) {
        setSchedules(res.data)
      }
    } catch (error) {
      message.error('加载班次失败')
    } finally {
      setLoading(false)
    }
  }

  const handleBook = (schedule) => {
    if (schedule.bookedSeats >= schedule.maxSeats) {
      message.warning('该班次已满')
      return
    }
    setSelectedSchedule(schedule)
    setBookingModalVisible(true)
  }

  const handleBookingSubmit = async (values) => {
    try {
      const res = await busApi.book({
        scheduleId: selectedSchedule.id,
        ...values
      })
      if (res.code === 200) {
        message.success(`预约成功！验证码：${res.data.checkinCode}`)
        setBookingModalVisible(false)
        form.resetFields()
        fetchSchedules()
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error('预约失败')
    }
  }

  const onDateSelect = (date) => {
    setSelectedDate(date)
  }

  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD')
    const hasSchedule = schedules.some(s => s.departDate === dateStr)
    return hasSchedule ? <Badge status="success" /> : null
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>🚌 班车预约</h2>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="选择日期">
            <Calendar 
              fullscreen={false} 
              onSelect={onDateSelect}
              cellRender={dateCellRender}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={16}>
          <Card title={`${selectedDate.format('M月D日')} 班次`}>
            {schedules.length === 0 ? (
              <Empty description="该日期暂无班次" />
            ) : (
              <Row gutter={[16, 16]}>
                {schedules.map(schedule => {
                  const isFull = schedule.bookedSeats >= schedule.maxSeats
                  const remainingSeats = schedule.maxSeats - schedule.bookedSeats
                  
                  return (
                    <Col xs={24} key={schedule.id}>
                      <Card 
                        className="card-hover"
                        bodyStyle={{ padding: '16px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <Tag color={schedule.direction === '去程' ? 'blue' : 'cyan'}>
                              {schedule.direction}
                            </Tag>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: 12 }}>
                              {schedule.departTime}
                            </span>
                            <span style={{ margin: '0 8px', color: '#999' }}>→</span>
                            <span>{schedule.arriveTime}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', color: '#f5222d', fontWeight: 'bold' }}>
                              ¥{schedule.price}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              剩余 {remainingSeats} 座
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ marginTop: 12, color: '#666' }}>
                          <p><EnvironmentOutlined /> {schedule.fromLocation}</p>
                          <p><EnvironmentOutlined /> {schedule.toLocation}</p>
                        </div>
                        
                        <Button 
                          type={isFull ? 'default' : 'primary'}
                          disabled={isFull}
                          block
                          style={{ marginTop: 12 }}
                          onClick={() => handleBook(schedule)}
                        >
                          {isFull ? '已满' : '预约'}
                        </Button>
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title="预约班车"
        open={bookingModalVisible}
        onCancel={() => setBookingModalVisible(false)}
        footer={null}
      >
        {selectedSchedule && (
          <div style={{ marginBottom: 16, padding: 12, background: '#f6ffed', borderRadius: 4 }}>
            <p>
              <strong>{selectedSchedule.direction}</strong> · {selectedSchedule.departTime}
            </p>
            <p style={{ color: '#666', fontSize: '12px' }}>
              {selectedSchedule.fromLocation} → {selectedSchedule.toLocation}
            </p>
          </div>
        )}
        <Form form={form} onFinish={handleBookingSubmit} layout="vertical">
          <Form.Item
            name="userName"
            label="乘车人姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入乘车人姓名" />
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
              确认预约
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BusSchedule
