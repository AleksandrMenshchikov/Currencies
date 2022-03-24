import { memo } from 'react';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import Table from '../components/table/Table';
import Tooltip from '../components/tooltip/Tooltip';

const HomePage = memo(() => {
  return (
    <>
      <Header />
      <Search />
      <Table />
      <Tooltip />
    </>
  );
});

export default HomePage;
