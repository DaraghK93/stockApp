/// Glossary Screen ///
// Route:
//  <URL>/glossary
// Description:
//  This screen contains a static glossary page

/// Imports ///
import { Container, Row, Col} from 'react-bootstrap'
import CollapsibleTable from "../../components/glossaryComponents/collabsibleTable/collapsibleTable"



function GlossaryPage (){
    

    return(
        <Container>
            <Col>
                <Row>
                    <Container>
                    <h1>Learn about the Game, Trading and More</h1>
                    <br/>
                    </Container>
                    <CollapsibleTable/>
                </Row>
                </Col>
        </Container>
    )

}


export default GlossaryPage