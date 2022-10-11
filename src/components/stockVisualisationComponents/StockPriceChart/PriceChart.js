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



function PriceChartRecharts() {
    const data = [
        { name: 'Day 1', price: 400, price2: 100 },
        { name: 'Day 2', price: 500, price2: 300 },
        { name: 'Day 3', price: 60, price2: 500 },
        { name: 'Day 4', price: 700, price2: 200 },
        { name: 'Day 5', price: 800, price2: 900 },
        { name: 'Day 6', price: 200, price2: 100 },
        { name: 'Day 7', price: 1000, price2: 150 },
        { name: 'Day 8', price: 1100, price2: 800 },
        { name: 'Day 1', price: 400, price2: 100 },
        { name: 'Day 2', price: 500, price2: 300 },
        { name: 'Day 3', price: 60, price2: 500 },
        { name: 'Day 4', price: 700, price2: 200 },
        { name: 'Day 5', price: 800, price2: 900 },
        { name: 'Day 6', price: 200, price2: 100 },
        { name: 'Day 7', price: 1000, price2: 150 },
        { name: 'Day 8', price: 1100, price2: 800 },
        { name: 'Day 1', price: 400, price2: 100 },
        { name: 'Day 2', price: 500, price2: 300 },
        { name: 'Day 3', price: 60, price2: 500 },
        { name: 'Day 4', price: 700, price2: 200 },
        { name: 'Day 5', price: 800, price2: 900 },
        { name: 'Day 6', price: 200, price2: 100 },
        { name: 'Day 7', price: 1000, price2: 150 },
        { name: 'Day 8', price: 1100, price2: 800 },
    ]

    return (

        <>
            <ResponsiveContainer width="100%" height={400} margin={100}>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Legend verticalAlign="top" height={36}

                    />

                    <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>

                    <XAxis dataKey="name"
                        stroke="black"
                    >
                        <Label value="Date" position="bottom"

                        /></XAxis>
                    <YAxis dataKey="price"
                        // stroke="#4C6793"
                        stroke={false}

                    >
                        <Label
                            // stroke="#d4d4d4"
                            // fill="#d4d4d4"
                            value="Price $"
                            angle={-90}
                            position="left"
                            dy="-10"
                        /></YAxis>
                    <Tooltip />
                    <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    {/* <Area type="monotone" dataKey="price2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                </AreaChart>
            </ResponsiveContainer>


        </>
    );
}

export default PriceChartRecharts;