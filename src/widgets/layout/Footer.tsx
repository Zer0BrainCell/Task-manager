import { Layout } from 'antd'

const { Footer } = Layout

const AppFooter = () => {
  return (
     <Footer style={{ 
      textAlign: 'center', 
      background: '#1f1f1f',  
      color: '#ccc',          
      borderTop: '1px solid #333'
    }}>
      © {new Date().getFullYear()} Евгений Моисеев. Все права не защищены.
    </Footer>
  )
}

export default AppFooter