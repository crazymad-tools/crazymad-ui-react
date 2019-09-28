import React from "react";
import { useState } from "react";
import { EventInterface } from '../common/EventInterface';
import "./index.scss";

interface ButtonProps extends EventInterface {
  type?: String;
  style?: any;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    type: string,
    ...event
  } = props;

  const [wave, setWave] = useState<{
    style: {
      left: string,
      top: string,
      width: string,
      height: string,
      borderRadius: string,
    },
    id: number
  }>();

  function onclick(e: any) {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    let width = e.currentTarget.clientWidth;
    let height = e.currentTarget.clientHeight;
    let wave = {
      style: {
        left: -width + x + 'px',
        top: -height * 2 + y + 'px',
        width: Math.max(width, height) * 2 + 'px',
        height: Math.max(width, height) * 2 + 'px',
        borderRadius: '100%'
      },
      id: new Date().getTime()
    };
    setWave(wave);
    props.onClick && props.onClick(e);
  }

  return (
    <button
      style={props.style}
      className={`cm-btn ${
        props.type ? "cm-btn-" + props.type : "cm-btn-default"
      }`}
      {...event}
      onMouseDown={onclick}
    >
      {wave && <span className="cm-btn-wave" style={wave.style} key={wave.id}/>}
      {props.children}
    </button>
  );
};

export default Button;
