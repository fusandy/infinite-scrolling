import { useState, useEffect } from 'react';
import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScroll from 'react-infinite-scroller';
// import { Box } from '@mui/material';

import './App.css'

// https://medium.com/@shiusun246/%E5%88%86%E4%BA%AB-%E5%AF%A6%E4%BD%9C-lazy-loading-%E8%88%87%E5%90%91%E4%B8%8B%E6%BB%BE%E5%8B%95%E4%BB%A5%E8%BC%89%E5%85%A5%E6%9B%B4%E5%A4%9A-react-infinite-scroll-component-8bf027d8339d
// https://www.npmjs.com/package/react-infinite-scroll-component

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [startNum, setStartNum] = useState(5);

  const fetchData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/albums?_start=0&_limit=${startNum}`);
    const dataList = res.data || [];
      
    setDataList(dataList);
    setStartNum(startNum + 5);
  };

  const changePage = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/albums?_start=0&_limit=${startNum}`);
    const dataList = res.data || [];
    const hasMore = dataList.length > 0
    
    setHasMore(hasMore);
    setDataList(dataList);
    setStartNum(startNum + 5);
  };

  useEffect(() => {
    fetchData();
  },[]);

  console.log('dataList.length:', dataList.length)
  console.log('hasMore:', hasMore)

  return (
      <div id='scrolling-wrapper'>
        <InfiniteScroll
          pageStart={0}
          loadMore={changePage}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
      >
          {dataList.map(({ id, title }) => (
            <div key={id} className='card'>
              <h1>{`${id}: `}{title}</h1>
            </div>
          ))}
      </InfiniteScroll>
        {/* <InfiniteScroll
          dataLength={dataList.length}
          hasMore={hasMore}
          next={changePage}
        >
          {dataList.map(({ id, title }) => (
            <div key={id} className='card'>
              <h1>{`${id}: `}{title}</h1>
            </div>
          ))}
        </InfiniteScroll> */}
      </div>
  );
}

export default App;
