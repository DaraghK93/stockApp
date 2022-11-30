import { Fragment } from "react"
import { Image, Row, Col, Table, Container } from 'react-bootstrap';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
// import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function LeaderBoard() {

    const leaderBoardData = [
        {
            userName: "user1",
            amount: 10000000,
            dailyChange: 20,
            picture: "/avatar.png"
        },
        {
            userName: "usy2",
            amount: 1000000,
            dailyChange: 20,
            picture: "/avatar.png"
        },
        {
            userName: "us3",
            amount: 100000,
            dailyChange: 20,
            picture: "/avatar.png"
        },
        {
            userName: "js4",
            amount: 10000,
            dailyChange: 20,
            picture: "/avatar.png"
        },
        {
            userName: "js5",
            amount: 1000,
            dailyChange: 20,
            picture: "/avatar.png"
        },
        {
            userName: "js6",
            amount: 100.00,
            dailyChange: 20.00,
            picture: "/avatar.png"
        }, {
            userName: "js7",
            amount: 10,
            dailyChange: 20,
            picture: "/avatar.png"
        }

    ]

    const Top3 = leaderBoardData.slice(0, 3)
    const RestOfLeaderBoard = leaderBoardData.splice(3)
    const columns = [
        { label: "Rank", accessor: "position", sortable: false },
        { label: "Pic", accessor: "avatar", sortable: false },
        { label: "User", accessor: "username", sortable: true, sortbyOrder: "desc" },
        { label: "Total", accessor: "amount", sortable: false },
        { label: "Change", accessor: "dailyChange", sortable: false },
    ];


    return (

        <>
            <div className="leaderBoardStyle">
                <Container style={{ width: "95%" }} >
                    <center>
                        <br></br><br></br>
                        <Col s={6} md={6} lg={6} xl={6}>

                            <Row xs={3} style={{ textAlign: "center" }}>
                                <Col xs={4}>
                                    <Image src={"/avatar.png"} className="top3ImgStyle secondplace" />
                                    <p><strong><span className="rankingText" >2nd place</span></strong>   <br></br>
                                        @{Top3[1].userName}
                                        <br></br>
                                        ${Top3[1].amount}<br></br>
                                        +${Top3[1].dailyChange}
                                    </p>
                                </Col>
                                <Col xs={4}>
                                    <Image src={"/crown.png"} style={{ width: "50%" }} /><div style={{ height: "5px" }} />
                                    <Image src={"/avatar.png"} className="top3ImgStyle firstplace" />
                                    <p><strong><span className="rankingText">1st place</span></strong>  <br></br>
                                        @{Top3[0].userName}
                                        <br></br>
                                        ${Top3[0].amount}<br></br>
                                        +${Top3[0].dailyChange}
                                    </p>
                                </Col>
                                <Col xs={4}>
                                    <Image src={"/avatar.png"} className="top3ImgStyle thirdplace" />
                                    <p><strong><span className="rankingText">3rd place</span></strong><br></br>
                                        @{Top3[2].userName}
                                        <br></br>
                                        ${Top3[2].amount}<br></br>
                                        +${Top3[2].dailyChange}
                                    </p>
                                </Col>
                                <br></br><br></br>
                            </Row>
                            <Row>
                                <Col>
                                    <Table style={{ borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr key="cols" className="leaderBoardHeaderStyle">
                                                {columns.map(({ label, accessor }) => {
                                                    return <th key={accessor}>{label}</th>;
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody style={{ backgroundColor: "none" }}>
                                            {RestOfLeaderBoard.map((item) => (
                                                (<Fragment key={`${item.userName}-fragment`}>
                                                    <tr key={item.userName} className="leaderboradRowStyle">
                                                        <td className="leftCurvedBorders"><center>{RestOfLeaderBoard.indexOf(item) + 4}</center></td>

                                                        <td key={item.picture}><center>
                                                            <Image src={item.picture} className="leaderBoardAvatarStyle" alt="user avatar"></Image>
                                                        </center>
                                                        </td>
                                                        <td><center>@{item.userName}</center></td>
                                                        <td><center>${item.amount.toFixed(2)}</center></td>
                                                        <td id={item.dailyChange} className="rightCurvedBorders"
                                                            style={{ verticalAlign: "middle" }}>
                                                            <center>+${item.dailyChange.toFixed(2)}<KeyboardDoubleArrowUpIcon style={{ fill: '#22ff00' }} /></center></td>
                                                    </tr>
                                                    <tr key={`${item.userName}padding`} style={{ height: "5px" }} ></tr>
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


