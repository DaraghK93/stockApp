import {Dropdown} from "react-bootstrap";

function PortfolioSelectionDropdown({portfolios, state, setState}){

    function onSelectHandler(e){
        setState(e)
    }

    return (
        <Dropdown className="dropdownStyle"  onSelect={onSelectHandler}>
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
            Select Portfolio
        </Dropdown.Toggle>
            <Dropdown.Menu style={{"width": "20rem"}}>
            {portfolios.map((portfolio,idx) => (
                <Dropdown.Item
                    value={portfolio}
                    id={`${portfolio.portfolioName}-${idx}`}
                    key={`${portfolio.portfolioName}-${idx}`}
                    eventKey={portfolio.leagueId}
                    style={{"white-space": "normal"}}
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