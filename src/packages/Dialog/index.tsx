import React from 'react';
import Button from '../Button';
import { useState, useEffect } from 'react';
// import { Icon } from 'antd';
import DialogBarBtn from './BarBtn';
import './index.scss';

export { default as DialogBarBtn } from './BarBtn';

interface DialogProps {
  title: string;
  visible: boolean;
  confirm?: Function;
  cancel?: Function;
  close: Function;
  mask?: boolean;
  candrag?: boolean;
  offset?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
}

const Dialog: React.FC<DialogProps> = props => {
  const dialogRef: any = React.createRef();
  const [style, setStyle] = useState<any>({});
  // 拖拽偏移量
  const [dragOffset, setDragOffset] = useState<any>({
    x: 0,
    y: 0
  });

  useEffect(() => {
    // 不传入偏移量，默认居中
    if (props.offset) {
      let style: any = {};
      style.left = props.offset.left ? props.offset.left + dragOffset.x + 'px' : undefined;
      style.right = props.offset.right ? props.offset.right - dragOffset.x + 'px' : undefined;
      style.top = props.offset.top ? props.offset.top + dragOffset.y + 'px' : undefined;
      style.bottom = props.offset.bottom ? props.offset.bottom - dragOffset.y + 'px' : undefined;
      setStyle(style);
    } else {
      let style = {
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
      };
      setStyle(style);
    }
  }, [props.offset, dragOffset]);

  function close() {
    props.close ? props.close() : null;
  }

  function startMove(e: any) {
    if (!props.offset) return;
    // 当开始拖动的时候，加上moving类以避免选中文档中的文字
    document.body.classList.add('moving');

    let offsetX = e.clientX;
    let offsetY = e.clientY;
    window.onmousemove = (e: MouseEvent) => {
      setDragOffset({
        x: e.clientX - offsetX + dragOffset.x,
        y: e.clientY - offsetY + dragOffset.y
      })
    };
  }

  function stopMove() {
    if (!props.offset) return;
    window.onmousemove = null;
    // 当结束拖动的时候，移除moving类，恢复文本的选中状态
    document.body.classList.remove('moving');
  }

  return (
    <>
    {props.mask ? <div className={`dialog-mask ${props.visible ? '' : 'dialog-mask-hide'}`} /> : null}
    <div
      className={`dialog-container ${props.visible ? '' : 'dialog-container-hide'} ${props.mask ? 'have-mask' : ''}`}
      style={style}
      tabIndex={-1}
      ref={dialogRef}
    >
      <div className={`dialog-title ${props.offset ? 'can-drag' : ''}`} onMouseDown={startMove} onMouseUp={stopMove}>
        <span className="title-text">{props.title}</span>
        <span className="title-bar">
          {/* 模拟vue的插槽分发功能，添加自定义的导航栏按钮 */}
          {React.Children.map(props.children, (child: any) => {
            if (child.type === DialogBarBtn) {
              return React.cloneElement(child, {});
            } else {
              return null;
            }
          })}
          {/* <Icon type="close" onClick={close} /> */}
          <span className="dialog-title-tool-bar">
            {/* <Icon type="close-circle" onClick={close} /> */}
            {/* <Icon type="close" onClick={close} /> */}
          </span>
        </span>
      </div>
      <div className="dialog-content">
        {/* 模拟vue的插槽分发功能，排除自定义的导航栏按钮 */}
        {React.Children.map(props.children, (child: any) => {
          if (child.type !== DialogBarBtn) {
            return React.cloneElement(child, {});
          } else {
            return null;
          }
        })}
      </div>
      <div
        className={`dialog-controller ${
          props.cancel || props.confirm ? '' : 'dialog-controller-hide'
        }`}
      >
        {props.confirm ? <Button onClick={props.confirm}>确定</Button> : null}
        {props.cancel ? <Button onClick={props.cancel}>取消</Button> : null}
      </div>
    </div>
    </>
  );
};

export default Dialog;
