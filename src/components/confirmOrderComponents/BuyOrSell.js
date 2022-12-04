import {ToggleButton, ButtonGroup} from "react-bootstrap"

function BuyOrSell({choices,state,setter}){
    return(
        <ButtonGroup
            className="gameScreenButtonGroup"
        >
        {choices.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`button-${idx}`}
            type="radio"
            variant='outline-primary'
            name="radio"
            value={radio.value}
            checked={state === radio.value}
            onChange={(e) => setter(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    )

}

export default BuyOrSell;