import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Layout,
  Button,
  Skeleton,
  Tabs,
  Modal,
  Space,
  Avatar,
  Badge,
} from 'antd';
import {
  GlobalStyle,
  StyledLayout,
  StyledSider,
  StyledContent,
  MainWrapper,
  Username,
} from 'style';
import 'antd/dist/reset.css';
import type { TabsProps } from 'antd';
import { UserState } from 'types/data';
import { useAppSelector, useAppDispatch } from 'store';
import {
  increasegeneral,
  declinegeneral,
  increasebonus,
  declinebonus,
  populate,
  declineban,
  increaseban,
  resetuser,
  loadmore,
} from 'features/userSlice';
import HeaderComponent from 'HeaderComponent';

const count = 3;
const fakeDataUrl = `https://random-data-api.com/api/users/random_user?size=${count}`;

const ButtonGroup = Button.Group;

const App: React.FC = () => {
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserState[]>([]);
  const [activeKey, setActiveKey] = React.useState<string>('1');

  const userlist = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const increase = (id: number): void => {
    dispatch(increasegeneral(id));
    setActiveKey('1');
    console.log('Назначение бонуса');
  };

  const decline = (id: number): void => {
    dispatch(declinegeneral(id));
    setActiveKey('2');
    console.log('Назначение бана');
  };

  const resultList = userlist.filter((o: UserState) => o?.rating === 0);

  useEffect(() => {
    const getProjectList = async () => {
      const result = await axios(fakeDataUrl);
      setInitLoading(false);
      setData(result.data);
      dispatch(populate(result.data));
    };
    getProjectList();
  }, [dispatch]);

  const onLoadMore = () => {
    setLoading(true);

    const getProjectList = async () => {
      const result = await axios(fakeDataUrl);
      const newData = data.concat(result.data);

      dispatch(loadmore(newData));
      setData(newData);
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
    };
    getProjectList();
  };

  const reloadUsers = async () => {
    const result = await axios(fakeDataUrl);
    dispatch(populate(result.data));
  };

  const handleTabChange = (key: string) => {
    if (key === '1') {
      setActiveKey('1');
    } else if (key === '2') {
      setActiveKey('2');
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Список поощрений`,
      children: <FirstTab />,
    },
    {
      key: '2',
      label: `Список бана`,
      children: <SecondTab />,
    },
  ];

  return (
    <>
      <GlobalStyle />
      <StyledLayout>
        <HeaderComponent />
        <Layout>
          <StyledSider width={400}>
            <div>
              {resultList.map((x: UserState) => (
                <div className='left' style={{ height: '50px' }} key={x.id}>
                  <Space direction='vertical'>
                    <Space size='large'>
                      <Badge count={x.rating}>
                        <Avatar shape='square' icon={<UserOutlined />} />
                      </Badge>
                      <Username>{x.last_name}</Username>
                      <ButtonGroup>
                        <Button
                          onClick={() => decline(x.id)}
                          icon={<MinusOutlined />}
                        />
                        <Button
                          onClick={() => increase(x.id)}
                          icon={<PlusOutlined />}
                        />
                      </ButtonGroup>
                    </Space>
                  </Space>
                </div>
              ))}
            </div>
            <Skeleton title={false} loading={loading} active></Skeleton>
            {!initLoading && !loading ? (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 12,
                  height: 32,
                  lineHeight: '32px',
                }}
              >
                <Button onClick={reloadUsers} style={{ marginRight: '10px' }}>
                  Обновить список
                </Button>
                <Button onClick={onLoadMore}>Следующая страница</Button>
              </div>
            ) : null}
          </StyledSider>
          <Layout>
            <StyledContent>
              <MainWrapper>
                <Tabs
                  activeKey={activeKey}
                  items={items}
                  onTabClick={handleTabChange}
                />
              </MainWrapper>
            </StyledContent>
          </Layout>
        </Layout>
      </StyledLayout>
    </>
  );
};

export default App;

const FirstTab: React.FC = () => {
  const userlist = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);

    dispatch(resetuser(10000));
    console.log('Вознаграждение');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const increase = (id: number): void => {
    dispatch(increasebonus(id));

    function myfunction() {
      let result = userlist.find(({ rating }) => rating === 4);
      if (result) {
        setIsModalOpen(true);
      }
    }
    setTimeout(myfunction, 1000);
    console.log('Увеличение бонуса');
  };

  const decline = (id: number): void => {
    dispatch(declinebonus(id));
    console.log('Уменьшение бонуса');
  };

  const resetUser = (id: number): void => {
    dispatch(resetuser(id));
  };

  const resultList = userlist?.filter((o: any) => o?.rating > 0);

  return (
    <>
      <Modal
        title='Верхняя граница'
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Да'
        cancelText='Нет'
      >
        <p>Нужно вознаградить пользователя. Сделать это?</p>
      </Modal>
      <div className='column'>
        {resultList.map((x: UserState) => (
          <div className='left' style={{ height: '50px' }} key={x.id}>
            <Space direction='vertical'>
              <Space size='large'>
                <Badge color={'blue'} count={x.rating}>
                  <Avatar shape='square' icon={<UserOutlined />} />
                </Badge>
                <Username>{x.last_name}</Username>
                <ButtonGroup>
                  <Button
                    onClick={() => decline(x.id)}
                    icon={<MinusOutlined />}
                  />
                  <Button
                    onClick={() => increase(x.id)}
                    icon={<PlusOutlined />}
                  />
                </ButtonGroup>
                {x.rating === 0 && (
                  <button onClick={() => resetUser(x.id)}>Удалить</button>
                )}
              </Space>
            </Space>
          </div>
        ))}
      </div>
    </>
  );
};

const SecondTab: React.FC = () => {
  const userlist = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);

    dispatch(resetuser(10000));
    console.log('Бан');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const increase = (id: number): void => {
    dispatch(increaseban(id));
    console.log('Увеличение бана');
  };

  const decline = (id: number): void => {
    dispatch(declineban(id));
    function myfunction() {
      let result = userlist.find(({ rating }) => rating === -4);
      if (result) {
        setIsModalOpen(true);
      }
    }
    setTimeout(myfunction, 1000);
    console.log('Уменьшение бана');
  };

  const resetUser = (id: number): void => {
    dispatch(resetuser(id));
  };

  const resultList = userlist.filter((o: any) => o.rating < 0);

  return (
    <>
      <Modal
        title='Верхняя граница'
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Да'
        cancelText='Нет'
      >
        <p>Пора забанить пользователя. Сделать это?</p>
      </Modal>
      <div className='column'>
        {resultList.map((x: UserState) => (
          <div className='left' style={{ height: '50px' }} key={x.id}>
            <Space direction='vertical'>
              <Space size='large'>
                <Badge count={x.rating}>
                  <Avatar shape='square' icon={<UserOutlined />} />
                </Badge>
                <Username>{x.last_name}</Username>
                <ButtonGroup>
                  <Button
                    onClick={() => decline(x.id)}
                    icon={<MinusOutlined />}
                  />
                  <Button
                    onClick={() => increase(x.id)}
                    icon={<PlusOutlined />}
                  />
                </ButtonGroup>
                {x.rating === 0 && (
                  <button onClick={() => resetUser(x.id)}>Удалить</button>
                )}
              </Space>
            </Space>
          </div>
        ))}
      </div>
    </>
  );
};
