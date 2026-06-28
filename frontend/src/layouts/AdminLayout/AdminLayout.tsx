import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './AdminLayout.module.css'

const { Sider, Header, Content } = Layout

export function AdminLayout() {
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} width={240}>
        {/* Sidebar — Phase 2 */}
      </Sider>

      <Layout>
        <Header className={styles.header}>
          {/* Admin header — Phase 2 */}
        </Header>

        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
