import React from "react";
import { EventInterface } from '../common/EventInterface';
import "./index.scss";

interface ButtonProps extends EventInterface {
  type?: String;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    type: string,
    ...event
  } = props;

  function onclick(e: any) {
    if (props.onClick instanceof Function) {
      props.onClick(e);
    }
  }

  return (
    <button
      className={`plan-btn ${
        props.type ? "plan-btn-" + props.type : "plan-btn-default"
      }`}
      {...event}
    >
      {props.children}
    </button>
  );
};

export default Button;
