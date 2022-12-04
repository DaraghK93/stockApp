import {ToggleButton,  ButtonGroup } from "react-bootstrap"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function BuyOrSell({state,setter,holding}){
    return(
        <ButtonGroup
            className="gameScreenButtonGroup"
        >
           <ToggleButton
             size="lg"
             key={"buy-button"}
             id={`button-buy`}
             type="radio"
             variant='outline-primary'
             name="radio"
             value={"Buy"}
             checked={state === "Buy"}
             onChange={(e) => setter(e.currentTarget.value)}
           > 
           Buy <AddIcon/>
           </ToggleButton>
            <ToggleButton
                size="lg"
                key={"sell-button"}
                id={`sell-buy`}
                type="radio"
                variant='outline-primary'
                name="radio"
                value={"Sell"}
                checked={state === "Sell"}
                onChange={(e) => setter(e.currentTarget.value)}
                disabled={((typeof holding === "undefined") || (holding === 0))}
            > 
            Sell <RemoveIcon/>
            </ToggleButton>
      </ButtonGroup>
    )

}


//   {choices.map((radio, idx) => (
//           <ToggleButton
//             key={idx}
//             id={`button-${idx}`}
//             type="radio"
//             variant='outline-primary'
//             name="radio"
//             value={radio.value}
//             checked={state === radio.value}
//             onChange={(e) => setter(e.currentTarget.value)}
//           >
//             {radio.name}
//           </ToggleButton>
//         ))}

export default BuyOrSell;