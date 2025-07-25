import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './shared/styles/index.css'
import App from './app/App'
import 'antd/dist/reset.css'
import { ConfigProvider, theme } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgBase: '#242424',
            colorTextBase: '#e0e0e0',
            colorPrimary: '#1890ff',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </HashRouter>
  </StrictMode>
)
