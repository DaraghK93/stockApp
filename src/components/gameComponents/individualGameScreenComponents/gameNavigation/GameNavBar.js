import { Navbar, Container, Nav } from 'react-bootstrap'

function GameNavBar({ disPlayScreen }) {
    return (
        <Navbar expand="lg" className="navbar navbar-expand" variant="dark">
            <Container>
                <Nav className="me-auto" >
                    {/* <Nav.Link style={{ color: 'white' }}>Activity</Nav.Link> */}
                    <Nav.Link id={"1"} style={{ color: 'white' }} onClick={disPlayScreen}>Rules</Nav.Link>
                    <Nav.Link id={"2"} style={{ color: 'white' }} onClick={disPlayScreen}>Stocks</Nav.Link>
                    <Nav.Link id={"3"} style={{ color: 'white' }} onClick={disPlayScreen}>Portfolio</Nav.Link>
                    <Nav.Link id={"4"} style={{ color: 'white' }} onClick={disPlayScreen}>Settings</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default GameNavBar;