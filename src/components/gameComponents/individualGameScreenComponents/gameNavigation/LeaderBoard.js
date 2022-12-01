import { Fragment, useState, useEffect } from "react"
import { Image, Row, Col, Table, Container, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
// import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';


function LeaderBoard({ leaderBoardInfo }) {

    const [showTop3, setShowTop3] = useState(false);

    useEffect(() => {
        if (leaderBoardInfo.length > 3) {
            setShowTop3(true)
        }
    }, [leaderBoardInfo])

    const columns = [
        { label: "Rank", accessor: "position", sortable: false },
        { label: "", accessor: "avatar", sortable: false },
        { label: "User", accessor: "username", sortable: true, sortbyOrder: "desc" },
        { label: "Total", accessor: "amount", sortable: false },
        { label: "Change", accessor: "dailyChange", sortable: false },
    ];

    function applyRank() {
        var rank = 1;
        for (var i = 0; i < leaderBoardInfo.length; i++) {
            // increase rank only if current score less than previous
            if (i > 0 && leaderBoardInfo[i].totalValue < leaderBoardInfo[i - 1].totalValue) {
                rank++;
            }
            leaderBoardInfo[i].rank = rank;
        }
    }
    applyRank()





    return (

        <>
            <div className={showTop3 ? "leaderBoardStyle" : "leaderBoardStyle2"}>
                <Container>
                    <center>
                        <br></br><br></br>
                        <Col s={6} md={7} lg={7} xl={7}>
                            {showTop3 &&
                                <Row xs={3} style={{ textAlign: "center" }}>
                                    <Col xs={4}>
                                        <Image src={"/avatar.png"} className="top3ImgStyle secondplace" />
                                        <p><strong><span className="rankingText" >2nd place</span></strong>   <br></br>
                                            @{leaderBoardInfo[1].user.toString()}
                                            <br></br>${leaderBoardInfo[1].totalValue}

                                        </p>
                                    </Col>
                                    <Col xs={4}>
                                        <Image src={"/crown.png"} style={{ width: "50%" }} /><div style={{ height: "5px" }} />
                                        <Image src={"/avatar.png"} className="top3ImgStyle firstplace" />
                                        <p><strong><span className="rankingText">1st place</span></strong>  <br></br>
                                            @{leaderBoardInfo[0].user.toString()}
                                            <br></br>${leaderBoardInfo[0].totalValue}

                                        </p>
                                    </Col>
                                    <Col xs={4}>
                                        <Image src={"/avatar.png"} className="top3ImgStyle thirdplace" />
                                        <p><strong><span className="rankingText">3rd place</span></strong><br></br>
                                            @{leaderBoardInfo[2].user.toString()}
                                            <br></br>${leaderBoardInfo[2].totalValue}

                                        </p>
                                    </Col>
                                    <br></br><br></br>
                                </Row>}
                            <Row>
                                <Col>
                                    <Table style={{ borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr key="cols" className="leaderBoardHeaderStyle">
                                                <th>Rank</th>
                                                <th></th>
                                                <th>User</th>
                                                <th>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Current total value<br></br>of portfolio</Tooltip>}>
                                                        <span className="d-inline-block" style={{ textDecoration: "underline" }}>
                                                            Total
                                                        </span>
                                                    </OverlayTrigger>

                                                </th>
                                                <th>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Change in portfolio value<br></br>since yesterday</Tooltip>}>
                                                        <span className="d-inline-block" style={{ textDecoration: "underline" }}>
                                                            Change
                                                        </span>
                                                    </OverlayTrigger>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody style={{ backgroundColor: "none" }}>
                                            {leaderBoardInfo.map((item, index) => (
                                                (<Fragment key={`${item.user}-fragment`}>
                                                    <tr key={item.user} className="leaderboradRowStyle">
                                                        <td className="leftCurvedBorders"><center>{item.rank}</center></td>
                                                        <td key={item.picture}><center>
                                                            <Image src={"/avatar.png"} className="leaderBoardAvatarStyle" alt="user avatar"></Image>
                                                        </center>
                                                        </td>
                                                        <td><center>@{item.user}</center></td>
                                                        <td><center>{parseFloat(item.totalValue).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</center></td>
                                                        <td id={item.dailyChange} className="rightCurvedBorders"
                                                            style={{ verticalAlign: "middle" }}>


                                                            <center>+$20<KeyboardDoubleArrowUpIcon style={{ fill: '#22ff00' }} /></center></td>
                                                    </tr>
                                                    <tr key={`${item.user}padding`} style={{ height: "5px" }} ></tr>
                                                </Fragment>)

                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </center>

                </Container>
            </div>
        </>
    )
}

export default LeaderBoard;


