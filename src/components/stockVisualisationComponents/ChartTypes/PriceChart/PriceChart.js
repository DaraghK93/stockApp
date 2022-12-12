import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip
} from "recharts";

import { useState, useEffect } from "react";
import CustomToolTip from "../../../widgets/ToolTip/ToolTip"
import moment from "moment";

function StockPriceChart({ data, lineColor, gradientColor, dataKey, datetype }) {

    const [noOfTicks, setNoOfTicks] = useState("")


    useEffect(() => {

        function showTick(event) {
            if (window.innerWidth >= 800 ) {
                if (datetype === "yearly"){
                    setNoOfTicks(20)
                }
                else if (datetype === "monthly"){
                    setNoOfTicks(2)
                }
                else if (datetype === "weekly"){
                    setNoOfTicks(0)
                }
                else if (datetype === "daily"){
                    setNoOfTicks(-11)
                }
            }
            else {
                if (datetype === "yearly"){
                    setNoOfTicks(80)
                }
                else if (datetype === "monthly"){
                    setNoOfTicks(5)
                }

                else if (datetype === "weekly"){
                    setNoOfTicks(0)
                }
                
                else if (datetype === "daily"){
                    setNoOfTicks(-11)
                }
            }
        }
        showTick()
        window.addEventListener("resize", showTick);
        return () => {
            window.removeEventListener("resize", showTick);
        };
        
    }, [datetype]);


    const dateFormatter = (value) => {
    if (datetype === "daily"){
        return moment(value).format('h:mma')
    }
    else if (datetype === "weekly") {
        return moment(value).format('MMM Do')
    }
    else if (datetype === "monthly") {
        return moment(value).format('MMM Do')
    }
    else {
        return moment(value).format('MMM YYYY')
    }
}

    return (
        <ResponsiveContainer width="100%" height={400} margin={100}>
            <AreaChart width="100%" height={250} data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: -25,
                    bottom: 0
                }}>
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                <Tooltip content={<CustomToolTip />} />

                <XAxis 
                dataKey="date"
                    stroke="#595959"
                    interval={noOfTicks}
                    // tickCount={20}
                    tickFormatter={(value) => dateFormatter(value)}
                    // tickInterval={"2"}
                    // type="datetime"
                    // tickInterval={30 * 24 * 3600 * 1000}
                    // allowDataOverflow 
                >
                </XAxis>
                <YAxis 
                    width={100}
                    stroke="#595959"
                    // interval={2}
                    // tickInterval= {0}
                    // tickCount={3}
                    tickFormatter={(value) => parseInt(value).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                    type= "number"
                    domain = {["dataMin", "dataMax"]}
                    allowDecimals={false}
             
                    />
                <Area type="monotone" dataKey={dataKey} stroke={lineColor} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
        </ResponsiveContainer>

    )
};

export default StockPriceChart;