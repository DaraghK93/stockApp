import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
    return (
        <footer className='footerStyle'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; FIN<span style={{color:"white"}} className="navbar-brand mb-0 h1">OPTIMISE</span></Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer