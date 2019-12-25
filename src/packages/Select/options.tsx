import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import DOM from '../utils/Dom';
import './index.scss';

interface Props {
  parent: any;
  show: boolean;
}

const SelectOptions: React.FC<Props> = props => {
  const currentRef = useRef<any>(null);

  useEffect(() => {
    if (props.show) {
      let { offsetLeft, offsetTop, width, height } = DOM.getOffsetDistance(props.parent.current);
      currentRef.current.style.left = `${offsetLeft}px`;
      currentRef.current.style.top = `${offsetTop + height + 10}px`;
      currentRef.current.style.minWidth = `${width}px`;
      currentRef.current.classList.add('show');
    } else {
      currentRef.current.classList.remove('show');
    }
  }, [props.show]);

  return ReactDOM.createPortal(
    <div className="select-options" ref={currentRef}>
      {props.children}
    </div>,
    document.body
  );
}

export default SelectOptions;
