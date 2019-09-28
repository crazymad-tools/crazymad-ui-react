import React from 'react';
import './font/iconfont.css';

interface Props {
  type: String;
}

const Icon: React.FC<Props> = props => {
  return (
    <span className={`iconfont cm-icon-${props.type}`} />
  );
};

export default Icon;