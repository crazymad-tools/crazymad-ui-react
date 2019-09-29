import React from "react";
import { useState } from "react";
import { Dialog, Icon, Button, Input } from "../../packages";
import Header from '../common/Header';

import './index.scss';

const IndexPage: React.FC = props => {
  const [show, setShow] = useState<any>({
    demo1: false
  });

  function showDialog(key: string) {
    show[key] = true;
    setShow(Object.assign({}, show));
  }
  
  function hideDialog(key: string) {
    show[key] = false;
    setShow(Object.assign({}, show));
  }

  return (
    <>
    <Header />
    <div className="demo-page">
      <h2>对话框</h2>
      <Button onClick={showDialog.bind(null, 'demo1')} type="primary">DEMO1</Button>
      <Button style={{ marginLeft: '20px' }} onClick={showDialog.bind(null, 'demo2')} type="primary">DEMO2</Button>
      <Dialog
        title="demo1"
        visible={show.demo1}
        close={hideDialog.bind(null, 'demo1')}
        confirm={hideDialog.bind(null, 'demo1')}
        cancel={hideDialog.bind(null, 'demo1')}
        drag={false}
        mask={true}
      >
        <div>
          <h3>Dialog demo</h3>
          <p>默认居中，开启遮罩，不允许拖拽</p>
        </div>
      </Dialog>

      <Dialog
        title="demo2"
        visible={show.demo2}
        close={hideDialog.bind(null, 'demo2')}
        confirm={hideDialog.bind(null, 'demo2')}
        cancel={hideDialog.bind(null, 'demo2')}
        offset={{ top: '100px' }}
      >
        <div>
          <h3>Dialog demo</h3>
          <p>左右居中，不开启遮罩，允许拖拽</p>
        </div>
      </Dialog>
      <h2>按钮</h2>
      <Button>波纹</Button>
      <Button type="primary" style={{marginLeft: '20px'}}>波纹</Button>
      <Button type="success" style={{marginLeft: '20px'}}>波纹</Button>
      <h2>输入框</h2>
      <Input value={''} placeholder="输入框实例" />
    </div>
    </>
  );
};

export default IndexPage;