import React from 'react';
// import { useEffect } from 'react';
import './index.scss';

interface ButtonProps {

  type?: String;
  onClick?: Function;

}

const Button: React.FC<ButtonProps> = props => {

  // useEffect(() => {
  //   // console.log(props.active);
  // }, [props.type]);

  function onclick () {
    // console.log(props.onClick);
    if (props.onClick instanceof Function) {
      props.onClick();
    }
  }

  return (
    <button className={`plan-btn ${props.type ? 'plan-btn-' + props.type : 'plan-btn-default'}`} onClick={onclick}>{props.children}</button>    
  );

}

export default Button;

