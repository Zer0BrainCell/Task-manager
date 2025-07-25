import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import TaskList from '../entities/task/ui/TaskList'
import TaskDetails from '../features/ui/task-details/TaskDetails'
import AppHeader from '../widgets/layout/Header'
import AppFooter from '../widgets/layout/Footer'
import { Content } from 'antd/es/layout/layout'

function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
      </Content>
      <AppFooter />
    </Layout>
  )
}

export default HomePage