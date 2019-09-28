import React from "react";
import { useState } from "react";
import { Dialog, Icon, Button } from "../packages";

const IndexPage: React.FC = props => {
  const [show, setShow] = useState(true);

  function showDialog () {
    setShow(true);
  }

  function hideDialog () {
    console.log('hide dialog');
    setShow(false);
    console.log(show);
  }

  return (
    <div>
      <Button onClick={showDialog}>OPEN</Button>
      <Dialog
        title="demo"
        visible={show}
        close={hideDialog}
        confirm={hideDialog}
        cancel={hideDialog}
        drag={false}
        offset={{top: '100px'}}
        mask={true}
      >
        <div>
          <h3>Dialog demo</h3>
          <p>this is a dialog</p>
        </div>
      </Dialog>
    </div>
  );
};

export default IndexPage;
