import {Dropdown } from "react-bootstrap";

function PortfolioSelectionDropdown({portfolios, onClick}){
    return (
        <Dropdown className="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
            Select Portfolio
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {portfolios.map(portfolio => (
                <Dropdown.Item
                    value={portfolio.name}
                    id={portfolio.name}
                    key={portfolio.name}
                    onClick={onClick}>{portfolio.name}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
    )
}

export default PortfolioSelectionDropdown