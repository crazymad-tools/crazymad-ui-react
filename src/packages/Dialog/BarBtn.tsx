import React from 'react';

const DialogBar: React.FC = props => {

  return (
    <span className="dialog-title-tool-bar">
      {props.children}
    </span>
  )
}

export default DialogBar;