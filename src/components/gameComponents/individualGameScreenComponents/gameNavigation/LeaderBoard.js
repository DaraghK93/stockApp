
import { Image, Row, Col, Table, Container } from 'react-bootstrap';


function LeaderBoard() {

    const leaderBoardData = [
        {
            userName: "joey1",
            amount: 10000000,
            dailyChange: 20,
            picture: "/testAvatar.png"
        },
        {
            userName: "joey2",
            amount: 1000000,
            dailyChange: 20,
            picture: "/testAvatar.png"
        },
        {
            userName: "joey3",
            amount: 100000,
            dailyChange: 20,
            picture: "/testAvatar.png"
        },
        {
            userName: "joey4",
            amount: 10000,
            dailyChange: 20,
            picture: "/testAvatar.png"
        },
        {
            userName: "joey5",
            amount: 1000,
            dailyChange: 20,
            picture: "/testAvatar.png"
        },
        {
            userName: "joey6",
            amount: 100,
            dailyChange: 20,
            picture: "/testAvatar.png"
        }, {
            userName: "joey7",
            amount: 10,
            dailyChange: 20,
            picture: "/testAvatar.png"
        }

    ]

    //top 3
    //rest

    // console.log(leaderBoardData[2])
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
            <Row xs={3}>
                <Col style={{ textAlign: "center" }}>
                    <Image src={"/testAvatar.png"} style={{ width: "100%", marginTop: "5rem", borderRadius: "50%", }}></Image>
                    <p>{Top3[1].userName}
                        <br></br>
                        ${Top3[1].amount}
                        <br></br>
                        <strong>2nd place</strong>
                    </p>
                </Col>
                <Col style={{ textAlign: "center" }}>
                    <Image src={"/crown.png"} style={{ width: "50%" }}></Image>
                    <Image src={"/testAvatar.png"} style={{ width: "100%", borderRadius: "50%", marginTop: 0 }}></Image>
                    <p>{Top3[0].userName}
                        <br></br>
                        ${Top3[0].amount}
                        <br></br>
                        <strong>1st place</strong>
                    </p>
                </Col>
                <Col style={{ textAlign: "center" }}>
                    <Image src={"/testAvatar.png"} style={{ width: "100%", marginTop: "6rem", borderRadius: "50%" }}></Image>
                    <p>{Top3[2].userName}
                        <br></br>
                        ${Top3[2].amount}
                        <br></br>
                        <strong>3rd place</strong>
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr key="cols">
                                {columns.map(({ label, accessor }) => {
                                    return <th key={accessor}>{label}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {RestOfLeaderBoard.map((item) => (
                                <tr key={item.userName}>
                                    <td>{RestOfLeaderBoard.indexOf(item) + 4}</td>
                                    <td>{item.picture}</td>
                                    <td>{item.userName}</td>
                                    <td>${item.amount}</td>
                                    <td>{item.dailyChange}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default LeaderBoard;