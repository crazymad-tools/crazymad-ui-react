import React from "react";
import Button from "../Button";
import Icon from "../Icon";
import UIManager from "../Manager";
import { useState, useEffect } from "react";
// import { Icon } from 'antd';
import DialogBarBtn from "./BarBtn";
import "./index.scss";

interface DialogProps {
  title: string;
  visible: boolean;
  confirm?: Function;
  cancel?: Function;
  close: Function;
  mask?: boolean;
  drag?: boolean;
  offset?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
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
    let transform: string = "";
    let style: any = {
      marginLeft: dragOffset.x + "px",
      marginTop: dragOffset.y + "px",
      display: props.visible ? "block" : "none"
    };
    if (props.offset && (props.offset.top || props.offset.bottom)) {
      if (props.offset.left || props.offset.right) {
        style.left = props.offset.left;
        style.right = props.offset.right;
      } else {
        style.left = "50%";
        transform += " translateX(-50%)";
      }
      style.top = props.offset.top;
      style.bottom = props.offset.bottom;
    }
    if (props.offset && (props.offset.left || props.offset.right)) {
      if (props.offset.top || props.offset.bottom) {
        style.top = props.offset.top;
        style.bottom = props.offset.bottom;
      } else {
        style.top = "50%";
        transform += " translateY(-50%)";
      }
    }
    if (!props.offset) {
      style.top = "50%";
      style.left = "50%";
      transform = "translateX(-50%) translateY(-50%)";
    }
    style.transform = transform;
    setStyle(style);
  }, [props.offset, dragOffset, props.visible]);

  function startMove(e: any) {
    if (!props.drag) return;

    // 当开始拖动的时候，加上moving类以避免选中文档中的文字
    document.body.classList.add("moving");

    // 避免将用户的回调覆盖，预先保存
    let onmousemove = document.onmousemove;
    let onmouseup = document.onmouseup;
    let onmouseout = document.onmouseout;

    let offsetX = e.clientX;
    let offsetY = e.clientY;
    document.onmousemove = (e: MouseEvent) => {
      setDragOffset({
        x: e.clientX - offsetX + dragOffset.x,
        y: e.clientY - offsetY + dragOffset.y
      });
    };

    document.onmouseup = () => {
      document.onmousemove = onmousemove;
      window.onmouseout = onmouseout;
      document.onmouseup = onmouseup;
      document.body.classList.remove("moving");
    };

    document.onmouseout = () => {
      document.onmousemove = onmousemove;
      document.onmouseout = onmouseout;
      document.onmouseup = onmouseup;
      document.body.classList.remove("moving");
    };
  }

  function close(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    props.close && props.close();
  }
  
  function confirm (e: React.MouseEvent<HTMLElement, MouseEvent>) {
    props.confirm && props.confirm();
  }

  function cancel (e: React.MouseEvent<HTMLElement, MouseEvent>) {
    props.cancel && props.cancel();
  }

  return (
    <>
      {props.mask ? (
        <div
          className={`dialog-mask ${props.visible ? "" : "dialog-mask-hide"}`}
        />
      ) : null}
      <div
        className={`dialog-container ${
          props.visible ? "" : "dialog-container-hide"
        } ${props.mask ? "have-mask" : ""}`}
        style={style}
        // tabIndex={-1}
        ref={dialogRef}
      >
        <div
          className={`dialog-title ${props.offset ? "can-drag" : ""}`}
          onMouseDown={startMove}
        >
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
            <span className="dialog-title-tool-bar">
              <Icon type="close" onClick={close} />
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
            props.cancel || props.confirm ? "" : "dialog-controller-hide"
          }`}
        >
          {props.confirm ? (
            <Button onClick={confirm}>
              {UIManager.getWord("confirm")}
            </Button>
          ) : null}
          {props.cancel ? (
            <Button onClick={cancel}>
              {UIManager.getWord("cancel")}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

Dialog.defaultProps = {
  drag: true
};

export default Dialog;
