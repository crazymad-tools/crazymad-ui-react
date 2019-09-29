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

  const [animationKey, setAnimationKey] = useState('false');

  function onmousedown(e: any) {
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
    setAnimationKey('false');
    props.onMouseDown && props.onMouseDown(e);
  }

  function onmouseup(e: any) {
    setAnimationKey('true');
    props.onMouseUp && props.onMouseUp(e);
  }

  return (
    <button
      style={props.style}
      className={`cm-btn ${
        props.type ? "cm-btn-" + props.type : "cm-btn-default"
      }`}
      {...event}
      onMouseDown={onmousedown}
      onMouseUp={onmouseup}
      animation-key={animationKey}
    >
      {wave && <span className="cm-btn-wave" style={wave.style} key={wave.id}/>}
      {props.children}
    </button>
  );
};

export default Button;
