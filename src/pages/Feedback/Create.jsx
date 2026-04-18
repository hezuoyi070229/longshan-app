import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Select, Radio, Button, message, Upload } from 'antd'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import { feedbackApi } from '../../services/api'

const { TextArea } = Input
const { Option } = Select

function FeedbackCreate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    try {
      const res = await feedbackApi.create(values)
      if (res.code === 200) {
        message.success('反馈提交成功！')
        navigate('/feedbacks')
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error('提交失败')
    }
  }

  const categories = ['交通', '设施', '业态', '环境', '管理', '其他']
  const userTypes = ['青年', '商家', '居民', '其他']

  return (
    <div>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/feedbacks')}
        style={{ marginBottom: 16 }}
      >
        返回列表
      </Button>

      <Card title="提交反馈">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="userType"
            label="您的身份"
            rules={[{ required: true, message: '请选择身份' }]}
          >
            <Radio.Group>
              {userTypes.map(type => (
                <Radio.Button key={type} value={type}>{type}</Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="userName"
            label="您的姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入您的姓名" />
          </Form.Item>

          <Form.Item
            name="category"
            label="反馈分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择反馈分类">
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="反馈标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="简要描述您的问题或建议" />
          </Form.Item>

          <Form.Item
            name="content"
            label="详细内容"
            rules={[{ required: true, message: '请输入详细内容' }]}
          >
            <TextArea 
              rows={6} 
              placeholder="请详细描述您遇到的问题或建议..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="联系电话（选填）"
          >
            <Input placeholder="方便我们联系您了解详情" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              提交反馈
            </Button>
            <p style={{ textAlign: 'center', color: '#999', marginTop: 8 }}>
              您的反馈将公开显示，帮助更多人
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default FeedbackCreate
