import {
    AreaChart,
    Legend,
    Area,
    XAxis,
    YAxis,
    Label,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { Container } from "react-bootstrap";

function StockESGChart() {

    const data = [
        { name: 'Day 1', price: 400, price2: 100 },
        { name: 'Day 2', price: 500, price2: 300 },
        { name: 'Day 3', price: 60, price2: 500 },
        { name: 'Day 4', price: 700, price2: 200 },
        { name: 'Day 5', price: 800, price2: 900 },
        { name: 'Day 6', price: 200, price2: 100 },
        { name: 'Day 7', price: 1000, price2: 150 },
        { name: 'Day 8', price: 1100, price2: 800 },
        { name: 'Day 9', price: 400, price2: 100 },
        { name: 'Day 10', price: 500, price2: 300 },
        { name: 'Day 11', price: 60, price2: 500 },
        { name: 'Day 12', price: 700, price2: 200 },
        { name: 'Day 13', price: 800, price2: 900 },
        { name: 'Day 14', price: 200, price2: 100 },
        { name: 'Day 15', price: 1000, price2: 150 },
        { name: 'Day 16', price: 1100, price2: 800 },
        { name: 'Day 17', price: 400, price2: 100 },
        { name: 'Day 18', price: 500, price2: 300 },
        { name: 'Day 19', price: 60, price2: 500 },
        { name: 'Day 20', price: 700, price2: 200 },
        { name: 'Day 21', price: 800, price2: 900 },
        { name: 'Day 22', price: 200, price2: 100 },
        { name: 'Day 23', price: 1000, price2: 150 },
        { name: 'Day 24', price: 1100, price2: 800 },
    ]


    return (
        <>
            <Container>

                <ResponsiveContainer width="100%" height={400} margin={100}>
                    <h1>STOCK ESG CHART </h1>
                </ResponsiveContainer>


            </Container>
        </>
    )
};


export default StockESGChart;