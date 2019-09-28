import React from 'react';
import { EventInterface } from '../common/EventInterface';
import './font/iconfont.css';

interface Props extends EventInterface {
  type: string;
}

const Icon: React.FC<Props> = props => {
  const {
    type: string,
    ...event
  } = props;

  return (
    <span className={`iconfont cm-icon-${props.type}`} {...event} />
  );
};

export default Icon;