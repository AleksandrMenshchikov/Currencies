import { memo } from 'react';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import Tooltip from '../components/tooltip/Tooltip';

const HomePage = memo(() => {
  return (
    <>
      <Header />
      <Table />
      <Tooltip />
    </>
  );
});

export default HomePage;
