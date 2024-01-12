import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socketOptions = {
  transportOptions: {
      polling: {
          extraHeaders: {
              Authorization: 'Bearer abcde',
          }
      }
  }
};

const socket = io(`http://localhost:4000/socket`, socketOptions);

function App() {
  // const [isActive, setIsActive] = useState(false);
  // const [arr, setArr] = useState([]);
  // const [current, setCurrent] = useState(null);
  // const [tempData, setTempData] = useState([
  //   {
  //     name: '김광식', 
  //     activeBy: null, 
  //   }, 
  //   {
  //     name: '박맑음', 
  //     activeBy: null, 
  //   }, 
  //   {
  //     name: '김짜장', 
  //     activeBy: null, 
  //   }
  // ]);

  // useEffect(() => {
  //   const setData = (value) => {
  //     setTempData(value);
  //   }

  //   socket.on('testFocus', setData);
  //   socket.on('testBlur', setData);
  //   socket.on('testCheck', setData);

  //   return () => {
  //     socket.off('testFocus', setData);
  //     socket.off('testBlur', setData);
  //     socket.off('testCheck', setData);
  //   }
  // }, []);

  return (
    <div>
      {/* <main>
        {
          tempData.map((data, i) => (
            <div>
              <button>{ !data.isActive ? '사용가능' : '사용중' }</button>
              <input type="text" readOnly="" value={ data.name }/>
              <input 
                onFocus={(e) => { setFocus(e) }} 
                onBlur={(e) => { setBlur(e) }} 
                data-id={ i }>
              </input>
              <span>선점자: 아이</span>
              <br /><br />
            </div>

          ))
        }
      </main> */}
      <input onFocus={() => {testFunction() }}></input>
    </div>
  );

  function setFocus(e) {
    const dataId = e.target.getAttribute('data-id');
    // console.log('dataId: ', dataId);
    socket.emit('testFocus', { dataId });
  }

  function setBlur(e) {
    const dataId = e.target.getAttribute('data-id');
    // console.log('blur: ', dataId);
    socket.emit('testBlur', { dataId });
  }
  
  function testFunction() {
    socket.emit('broadcast', {}, (result) => {
      console.log(result);
    });
  }
}

export default App;
