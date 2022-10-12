import { Container, Dropdown, Card } from "react-bootstrap";


function ChartCard() {


    return (
        <>
                <Card>
                    <h2>TITLE</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                            Graph Type
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Pie Chart</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Radar Chart</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Bar Chart</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card>
        </>


    )


}
export default ChartCard;
