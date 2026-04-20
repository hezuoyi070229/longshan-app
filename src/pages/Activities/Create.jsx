import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Select, InputNumber, DatePicker, Button, message, Radio } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { activityApi } from '../../services/api'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Option } = Select

function ActivityCreate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    try {
      const data = {
        ...values,
        proposedDates: values.proposedDates?.map(d => d.format('YYYY-MM-DD')).join(',')
      }
      const res = await activityApi.create(data)
      if (res.code === 200) {
        message.success('活动创建成功！')
        navigate('/activities')
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error('创建失败')
    }
  }

  const locations = ['远明辉商场', '普法公园', '鞋帽店', '其他']
  const categories = ['社交', '文艺', '科普', '竞技', '其他']

  return (
    <div>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/activities')}
        style={{ marginBottom: 16 }}
      >
        返回列表
      </Button>

      <Card title="发起你的活动">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="活动名称"
            rules={[{ required: true, message: '请输入活动名称' }]}
          >
            <Input placeholder="例如：胡说八道PPT大赛、春日故事会" />
          </Form.Item>

          <Form.Item
            name="category"
            label="活动分类"
            rules={[{ required: true, message: '请选择活动分类' }]}
          >
            <Select placeholder="请选择分类">
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="活动描述"
            rules={[{ required: true, message: '请输入活动描述' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="活动玩法、需要准备什么、适合什么人参加..."
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="minPeople"
            label="最低成行人数"
            rules={[{ required: true, message: '请输入最低成行人数' }]}
            initialValue={10}
          >
            <InputNumber min={2} max={50} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="proposedDates"
            label="建议举办日期（可多选）"
            rules={[{ required: true, message: '请选择建议日期' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="location"
            label="期望地点"
            rules={[{ required: true, message: '请选择期望地点' }]}
          >
            <Select placeholder="请选择地点">
              {locations.map(loc => (
                <Option key={loc} value={loc}>{loc}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="creatorName"
            label="您的姓名"
            rules={[{ required: true, message: '请输入您的姓名' }]}
          >
            <Input placeholder="请输入您的姓名" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              提交发起
            </Button>
            <p style={{ textAlign: 'center', color: '#999', marginTop: 8 }}>
              （提交后平台审核，24小时内上线）
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ActivityCreate
