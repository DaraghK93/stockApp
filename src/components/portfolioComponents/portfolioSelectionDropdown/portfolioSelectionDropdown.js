import {Dropdown} from "react-bootstrap";

function PortfolioSelectionDropdown({portfolios, state, setState,currentPortfolioName}){



    function onSelectHandler(e){
        setState(e)
    }

    return (
        <Dropdown className="dropdownStyle"  onSelect={onSelectHandler}>
        <Dropdown.Toggle style={{"whiteSpace": "normal"}} size="lg" variant="success" id="dropdown-basic" >
            {currentPortfolioName}
        </Dropdown.Toggle>
            <Dropdown.Menu style={{"width": "20rem"}}>
            {portfolios.map((portfolio,idx) => (
                <Dropdown.Item
                    
                    value={portfolio}
                    id={`${portfolio.portfolioName}-${idx}`}
                    key={`${portfolio.portfolioName}-${idx}`}
                    eventKey={portfolio.leagueId}
                    style={{"whiteSpace": "normal"}}
                    active={state === portfolio.leagueId} 
                    >
                        {portfolio.portfolioName}
                </Dropdown.Item>
            ))} 
            </Dropdown.Menu>
    </Dropdown>
    )
}

export default PortfolioSelectionDropdown