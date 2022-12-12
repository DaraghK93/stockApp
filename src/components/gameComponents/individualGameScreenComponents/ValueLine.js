import { ProgressBar, Container, Row, Col, Image } from "react-bootstrap";
import CopyComponent from "../../widgets/CopyComponent/CopyComponent";

function ValueLine({ portfolios, 
    winningValue, 
    accessCode,
    setisShownGameDetails,
    setisShownLeaderBoard,
    setisShownPortfolio,
    setisShownStocks,
    setActive
}) {

    const remainder = winningValue - portfolios[0].totalValue
    var accessString = accessCode.toString()

    function showGameStocksPage(){
        setisShownGameDetails(false)
        setisShownLeaderBoard(false)
        setisShownPortfolio(false)
        setisShownStocks(true)
        setActive("2")
    }

    function getWinnerText() {
        if (portfolios.length < 3) {
            if (portfolios.length !== 1) {
                return (
                    <>
                        <p>There are only <strong>{portfolios.length} players</strong> in this game! Wow, so lonely!
                            Invite others using the access code: <strong>{accessCode} </strong>
                            <CopyComponent copyText={accessString} /></p>
                        <p>While you're here why not get ahead and <strong className={"linkStyle"} onClick={() => showGameStocksPage()}>make a trade now!</strong></p>
                    </>)
            }
            else {
                return (
                    <>
                        <p>There is only <strong>{portfolios.length} player</strong> in this game! Wow, so lonely! Invite others using the access code: <strong>{accessCode} </strong>
                            <CopyComponent copyText={accessString} />
                        </p>
                        <p>While you're here why not get ahead and <strong className={"linkStyle"} onClick={() => showGameStocksPage()}>make a trade now!</strong></p>
                    </>)
            }
        }
        else {
        
            if (portfolios[0].totalValue === portfolios[1].totalValue && portfolios[0].totalValue === portfolios[2].totalValue) {
                return (<><p>It's a tight race! <strong>{portfolios[0].user}</strong>, <strong>{portfolios[1].user}</strong> and <strong>{portfolios[2].user}</strong> are all
                    in the lead with <strong>{parseFloat(portfolios[0].totalValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong> in
                    their accounts. </p>
                    <p>Only one of them only has to make <strong>
                        {parseFloat(remainder).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </strong> to be crowned the winner. Don't let them win, <strong className={"linkStyle"} onClick={() => showGameStocksPage()}>make a trade now!</strong></p></>)

            }
            else if (portfolios[0].totalValue === portfolios[1].totalValue) {
                return (<><p>It's a tight race, with <strong>{portfolios[0].user}</strong> and <strong>{portfolios[1].user}</strong> in a tie with <strong>
                    {parseFloat(portfolios[0].totalValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong> in
                    their accounts. </p>
                    <p>Only one of them only has to make <strong>
                        {parseFloat(remainder).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </strong> to be crowned the winner. Don't let them win, <strong className={"linkStyle"} onClick={() => showGameStocksPage()}>make a trade now!</strong></p></>)
            }
            else {
                return (<><p>It's a tight race, with <strong>{portfolios[0].user}</strong> in the lead with <strong>
                    {parseFloat(portfolios[0].totalValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong> in
                    their account. </p>
                    <p>They only have to make <strong>
                        {parseFloat(remainder).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </strong> to be crowned the winner. Don't let them win, <strong className={"linkStyle"} onClick={() => showGameStocksPage()}>make a trade now!</strong></p></>)
            }
        }
    }


    function progressBars() {
        if (portfolios.length >= 3) {
            return <>
                <ProgressBar label={portfolios[0].user} striped variant="info" max={winningValue} min={portfolios[2].totalValue -( portfolios[2].totalValue/ 40) } now={portfolios[0].totalValue} />
                <ProgressBar label={portfolios[1].user} striped variant="success" max={winningValue} min={portfolios[2].totalValue -( portfolios[2].totalValue/ 40) } now={portfolios[1].totalValue} />
                <ProgressBar label={portfolios[2].user} striped variant="danger" max={winningValue} min={portfolios[2].totalValue -( portfolios[2].totalValue/ 40) } now={portfolios[2].totalValue} />
            </>
        }
        else if (portfolios.length === 2) {
            return <>
                <ProgressBar label={portfolios[0].user} striped variant="info" max={winningValue} min={portfolios[1].totalValue -( portfolios[1].totalValue/ 40) } now={portfolios[0].totalValue} />
                <ProgressBar label={portfolios[1].user} striped variant="success" max={winningValue} min={portfolios[1].totalValue -( portfolios[1].totalValue/ 40) } now={portfolios[1].totalValue} />
            </>
        }
        else if (portfolios.length === 1) {
            return <>
                <ProgressBar label={portfolios[0].user} striped variant="info" max={winningValue} min={portfolios[0].totalValue -( portfolios[0].totalValue/ 40) } now={portfolios[0].totalValue} />
            </>
        }
    }



    return (
        <Container>
            <Row>
                <Col xs="auto">
                    <br></br>
                    <Image src="/horses.png" style={{ width: "3rem" }}></Image>
                </Col>
                <Col style={{ paddingRight: "1rem" }}><br></br>
                    {progressBars()}

                    <p>The race is on to reach <strong>{parseFloat(winningValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>!</p>
                </Col>
            </Row>
            <Row>
                {getWinnerText()}
            </Row>


        </Container >
    )
}

export default ValueLine;