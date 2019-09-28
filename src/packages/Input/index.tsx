import React from 'react';
import { useEffect, useState } from 'react';
import './index.scss';
// import * as _ from 'lodash';

interface Props {
  value: any;
  type?: string;
  validate?: {
      regex: RegExp;
  }[];
  onChange?: any;
  onInput?: any;
  onBlur?: any;
  check?: any;
  error?: boolean;
}

const Input: React.FC<Props> = props => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    // let value = _.cloneDeep(props.value || '');
    let value = props.value || '';
    setValue(value);
  }, [props.value]);

  /**
   * 校验输入内容是否符合规则
   * @param e 
   */
  function check(e: any) {
    if (!props.validate) return;

    let error = false;
    let value = e.target.value;
    for (let validate of props.validate) {
      if (!value.match(validate.regex)) {
        console.warn('校验失败');
        error = true;
        break;
      }
    }
    setError(error);
    props.check instanceof Function && props.check(error);
  }

  /**
   * 当输入内容发生变化的时候
   * @param e 
   */
  function change(e: any) {
    let value = e.target.value + '';
    if (props.type === 'number' && !value.match(/^\d*$/g)) return;

    check(e);
    setValue(value);
    if (props.onChange instanceof Function) {
      props.onChange(e);
    }
    if (props.onInput instanceof Function) {
      props.onInput(e);
    }
  }

  function blur (e: any) {
    check(e);
    props.onBlur && props.onBlur(e);
  }

  return (
    <input
      value={value}
      className={`pop-input ${error || props.error ? 'pop-input-error' : ''}`}
      // type={props.type}
      onBlur={blur}
      onChange={change}
      onInput={change}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  validate: [],
};

export default Input;
