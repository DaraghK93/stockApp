import { ContactEmergency } from "@mui/icons-material";
import { useState, Fragment } from "react"
import { Image, Row, Col, Table, Container } from 'react-bootstrap';


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
        { label: "position", accessor: "position", sortable: false },
        { label: "avatar", accessor: "avatar", sortable: false },
        { label: "username", accessor: "username", sortable: true, sortbyOrder: "desc" },
        { label: "amount", accessor: "amount", sortable: false },
        { label: "+-", accessor: "dailyChange", sortable: false },
    ];

    return (

        <>
            <div style={{ backgroundColor: "#02478D", color: "#D6EBFF" }}>
                <Container >
                    <center>
                        <br></br><br></br>
                        <Col s={6} md={6} lg={6} xl={6}>

                            <Row xs={3}
                                style={{ color: "#D6EBFF" }}
                            >
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <Image src={"/avatar.png"} style={{ maxWidth:"10rem", width: "100%", marginTop: "5rem", borderRadius: "50%", border: "2px solid #D6EBFF" }}></Image>
                                    <p><strong><span style={{ color: "#FF7F11" }}>2nd place</span></strong>   <br></br>
                                        @{Top3[1].userName}
                                        <br></br>
                                        ${Top3[1].amount}<br></br>
                                        (+{Top3[1].dailyChange})
                                    </p>
                                </Col>
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <Image src={"/crown.png"} style={{ width: "50%" }}></Image><div style={{ height: "5px" }}></div>
                                    <Image src={"/avatar.png"} style={{ maxWidth:"10rem", width: "100%", borderRadius: "50%", marginTop: 0, border: "2px solid #D6EBFF" }}></Image>
                                    <p><strong><span style={{ color: "#FF7F11" }}>1st place</span></strong>  <br></br>
                                        @{Top3[0].userName}
                                        <br></br>
                                        ${Top3[0].amount}<br></br>
                                        (+{Top3[0].dailyChange})
                                    </p>
                                </Col>
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <Image src={"/avatar.png"} style={{ maxWidth:"10rem", width: "100%", marginTop: "6rem", borderRadius: "50%", border: "2px solid #D6EBFF" }}></Image>
                                    <p><strong><span style={{ color: "#FF7F11" }}>3rd place</span></strong><br></br>
                                        @{Top3[2].userName}
                                        <br></br>
                                        ${Top3[2].amount}<br></br>
                                        (+{Top3[2].dailyChange})
                                    </p>
                                </Col>
                                <br></br><br></br>
                            </Row>


                            <Row>
                                <Col>
                                    <Table style={{ borderCollapse: "collapse" }}>
                                        {/* <thead>
                            <tr key="cols">
                                {columns.map(({ label, accessor }) => {
                                    return <th key={accessor}>{label}</th>;
                                })}
                            </tr>
                        </thead> */}
                                        <tbody style={{ backgroundColor: "none" }}>
                                            {RestOfLeaderBoard.map((item) => (
                                                (<Fragment key={`${item.userName}-fragment`}>
                                                    <tr key={item.userName}
                                                        style={{
                                                            backgroundColor: "#0080FF", verticalAlign: "middle",
                                                            color: "#D6EBFF",
                                                            borderBottomColor: "transparent",
                                                        }}>
                                                        <td style={{ borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px" }}><center>{RestOfLeaderBoard.indexOf(item) + 4}</center></td>

                                                        <td key={item.picture} style={{
                                                            backgroundColor: "#0080FF", WebkitBackgroundClip: "padding-box",
                                                            backgroundClip: "content-box"

                                                        }}><center>

                                                                <Image src={item.picture} style={{
                                                                    width: "2.2rem",
                                                                    height: "2.2rem",
                                                                    display: "block",
                                                                    // objectFit: "contain",
                                                                    // backgroundColor:"black",
                                                                    verticalAlign: "middle",
                                                                    borderRadius: "50%",
                                                                    background: "red",
                                                                    border: "2px solid #D6EBFF"
                                                                }} alt="company logo"></Image>

                                                            </center>
                                                        </td>
                                                        <td><center>@{item.userName}</center></td>
                                                        <td><center>${item.amount.toFixed(2)}</center></td>
                                                        <td style={{ borderTopRightRadius: "6px", borderBottomRightRadius: "6px" }}><center>+${item.dailyChange.toFixed(2)}</center></td>
                                                    </tr>
                                                    <tr key={`${item.userName}padding`} style={{ height: "5px", backgroundColor: "red" }} ></tr>
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


// fix image position for diff screen sizes
// avatar images
// 