import { Container, Row, Col } from "react-bootstrap"
import './footer.css';

const Footer = () => {
    return (
        <footer className='footerStyle'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; FIN<span class="navbar-brand mb-0 h1">OPTIMIZE</span></Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer