import { Info } from "react-feather";
import { useState, useRef } from "react";
import { Overlay, Tooltip } from 'react-bootstrap';

// Set placement using setPlacement prop and left, right, bottom or top

const InfoButtonHover = ({ info, setPlacement }) => {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <>
            <sup>
                <Info className="infobuttonStyle" ref={target} onClick={() => setShow(!show)}></Info>
            </sup>

            <Overlay target={target.current} show={show} placement={setPlacement}>
                {(props) => (
                    <Tooltip {...props}>
                        {info}
                    </Tooltip>
                )}
            </Overlay>
        </>

    )
}

export default InfoButtonHover;