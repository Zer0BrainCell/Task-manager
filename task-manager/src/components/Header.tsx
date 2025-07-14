import { Layout, Typography } from 'antd'

const { Header } = Layout
const { Title } = Typography

const AppHeader = () => {
  return (
    <Header style={{ background: '#1f1f1f', padding: '0 24px', textAlign: 'center' }}>
      <Title level={3} style={{ color: '#fff', margin: 0 }}>
        Менеджер задач
      </Title>
    </Header>
  )
}

export default AppHeader