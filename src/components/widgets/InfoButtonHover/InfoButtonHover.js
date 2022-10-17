import { Info } from "react-feather";
import { useState, useRef } from "react";
import { Overlay, Tooltip, Button } from 'react-bootstrap';

const InfoButtonHover = ({ info, setPlacement }) => {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const myInfo = "Some string"

    return (
        <>
            <sup>
                <Info size={20} color="#595959" ref={target} onClick={() => setShow(!show)}></Info>
            </sup>

      <Overlay target={target.current} show={show} placement={setPlacement}>
        {(props) => (
          <Tooltip id="overlay-example"
           {...props}
           >
            {myInfo}
          </Tooltip>
        )}
      </Overlay>
        </>

    )
}

export default InfoButtonHover;