import React from 'react';
import { Dialog, Icon } from '../packages';

const IndexPage: React.FC = props => {

  return (
    <div>
      <Dialog title="demo" visible={true} close={() => {}} offset={{left: 10, top: 10}} />
      <Icon type="user" />
    </div>
  );
};

export default IndexPage;