import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';

function CopyComponent({ copyText }) {

    const [clicked, setClicked] = useState(false)

    function copyFunction(copyText) {
        navigator.clipboard.writeText(copyText)
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 5000)
    }

    const Icon = clicked ?  <DoneIcon size={20} onClick={() => copyFunction(copyText)} /> :
        <ContentCopyIcon style={{cursor:"pointer"}} size={20} onClick={() => copyFunction(copyText)} />

    return (
        <>
            <OverlayTrigger show={clicked} overlay={ <Tooltip id="tooltip-disabled">Copied!</Tooltip>}>
            {Icon}
            </OverlayTrigger>
        </>
    )
}

export default CopyComponent;