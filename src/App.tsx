import { Button, Col, Row } from 'antd';
import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
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

