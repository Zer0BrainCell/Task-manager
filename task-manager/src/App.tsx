import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import TaskList from './components/TaskList'
import TaskDetails from './components/TaskDetails'
import { TaskProvider } from './context/TaskContext'
import AppHeader from './components/Header'
import AppFooter from './components/Footer'
import { Content } from 'antd/es/layout/layout'

function App() {
  return (
    <TaskProvider>
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
    </TaskProvider>
  )
}

export default App
