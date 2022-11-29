import {Dropdown} from "react-bootstrap";

function PortfolioSelectionDropdown({portfolios, state, setState}){

    function onSelectHandler(e){
        setState(e)
    }

    return (
        <Dropdown className="dropdownStyle" onSelect={onSelectHandler}>
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
            Select Portfolio
        </Dropdown.Toggle>
            <Dropdown.Menu>
            {portfolios.map(portfolio => (
                <Dropdown.Item
                    value={portfolio}
                    id={portfolio.portfolioName}
                    key={portfolio.portfolioName}
                    eventKey={portfolio.leagueId}
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