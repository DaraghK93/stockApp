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

function StockPriceChart({ data, lineColor, gradientColor, dataKey }) {

    const [tickBoolean, setTickBoolean] = useState(false)
 
    window.addEventListener("resize", showTick);

    function showTick() {
        if (window.innerWidth >= 576) {
            setTickBoolean(true)
        }
        else {
            setTickBoolean(false)
        }
    }

    useEffect(() => {
        showTick()
    }, [])

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
                    tick={tickBoolean}
                >
                </XAxis>
                <YAxis 
                    width={100}
                    stroke="#595959"
                    // tickInterval= {10}
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