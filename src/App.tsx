import { Button, Col, List, Row, Typography } from 'antd';
import React from 'react';
import {useState} from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import {QrReader} from 'react-qr-reader';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='scanner' element={<Scanner />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
    <Col span={12}>
      <Link to="/whitepage"><Button type='primary' size='large' block>White Page Demo</Button></Link>
      <Link to="/scanner"><Button type='primary' size='large' block>QR Scanner Demo</Button></Link>
    </Col>
  </Row>;
}

interface WhitePageData {
  serial_number: string;
  license: string;
  computer_name: string;
  injector_type: string;
  firmware: string;
  display_type: string;
}

const encoder = (input: WhitePageData) => {
  return JSON.stringify(input);
}

const decoder = (input: string) => {
  let result : WhitePageData = JSON.parse(input);
  return result;
}

const Scanner = (props: {}) => {
  const [data, setData] = useState([['No result']]);

  return (
    <>
      <Row justify='center' align='middle' style={{minHeight: '100vh'}}>
        <Col span={16}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                let text = result?.getText();
                setData(Object.entries(decoder(text)));
              }
              if (!!error) {
                console.log(error);
              }
            }}
            constraints={{facingMode: {ideal: "environment"}}}
            containerStyle={{width: '100%'}}
          />

          <List
            header={<div>Result</div>}
            footer={<div>End</div>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item><Typography.Text mark>{item[0]}: </Typography.Text>{item[1]}</List.Item>)}
          />
        </Col>
      </Row>
    </>
  )
}
