import Layout from 'antd/es/layout/layout';
import { Typography, Space } from 'antd';

import { useAppSelector } from './app/hooks';
import { Links } from './components/Links';
import { Board } from './components/Board';
import { FormComponent } from './components/Form';
import { selectRepoName } from './features/repoNameSlice';

const App: React.FC = () => {
  const repoName = useAppSelector(selectRepoName);
  const { Title } = Typography;

  const layoutStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  };

  return (
    <Layout style={layoutStyle}>
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
        <Title>Github Kanban Board</Title>

        <FormComponent />

        {repoName && (
          <>
            <Links />
            <Board />
          </>
        )}
      </Space>
    </Layout>
  );
};

export default App;
