import { Button, Col, Layout, List, Row, Typography } from 'antd';
import React from 'react';
import {useState} from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import {QrReader} from 'react-qr-reader';
import QrCode from 'react-qr-code';
const {Header, Footer, Sider, Content} = Layout;

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='scanner' element={<Scanner />} />
        <Route path='whitepage' element={<WhitePage />} />
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
  const [data, setData] = useState(Object.entries({
                  serial_number: "TPAB123456",
                  license: "00-01-02-AB-CD",
                  computer_name: "M12345678-TPAB123456",
                  injector_type: "Stellant2",
                  firmware: "SR-CRU-123.45-C1.02_WIN_OS;S2-EFG-100.23-A0.01_XY_AJ;BAR-XYZF-1.01_OK",
                  display_type: "black TCRU",
                }));

  return (
    <>
      <Row justify='center' align='middle' style={{minHeight: '100vh'}}>
        <Col span={16}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                let text = result?.getText();
                setData(Object.entries({
                  serial_number: "TPAB123456",
                  license: "00-01-02-AB-CD",
                  computer_name: "M12345678-TPAB123456",
                  injector_type: "Stellant2",
                  firmware: "SR-CRU-123.45-C1.02_WIN_OS;S2-EFG-100.23-A0.01_XY_AJ;BAR-XYZF-1.01_OK",
                  display_type: "black TCRU",
                }));
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

const WhitePage = (props: {}) => {
  const [data, setData] = useState<WhitePageData>({
    serial_number: "TPAB123456",
    license: "00-01-02-AB-CD",
    computer_name: "M12345678-TPAB123456",
    injector_type: "Stellant2",
    firmware: "SR-CRU-123.45-C1.02_WIN_OS;S2-EFG-100.23-A0.01_XY_AJ;BAR-XYZF-1.01_OK",
    display_type: "black TCRU",
  });
  
  return (
    <>
      <Layout style={{minHeight: "90vh"}}>
        <Header>Sample Whitepage</Header>
        <Layout>
          <Sider>Other tabs</Sider>
          <Content>
            <Row>
              <Col span={8}>
                <div>Serial Number: TPAB123456</div>
                <div>License: 00-01-02-AB-CD</div>
                <div>Computer Name: M12345678-TPAB123456</div>
              </Col>
              <Col span={8}>
                <div>Injector State: Idle</div>
                <div>Type: Stellant2</div>
                <div>Firmware: SR-CRU-123.45-C1.02_WIN_OS;S2-EFG-100.23-A0.01_XY_AJ;BAR-XYZF-1.01_OK</div>
                <div>Display Type: black TCRU</div>
              </Col>
              <Col span={8}>
                <div style={{background: 'white', padding: '16px'}}>
                  <QrCode value={encoder(data)} />
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer>Proof of Concept</Footer>
      </Layout>
    </>
  )
}
