import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalGridLines } from 'react-vis';


function PriceChartReactVis() {
    // const data = [
    // { name: 'Day 1', price: 400, price2: 100 },
    // { name: 'Day 2', price: 500, price2: 300 },
    // { name: 'Day 3', price: 60, price2: 500 },
    // { name: 'Day 4', price: 700, price2: 200 },
    // { name: 'Day 5', price: 800, price2: 900 },
    // { name: 'Day 6', price: 200, price2: 100 },
    // { name: 'Day 7', price: 1000, price2: 150 },
    // { name: 'Day 8', price: 1100, price2: 800 }]

    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 2 },
        { x: 9, y: 0 }
    ];
    return (
        <>
            <div style={{
                // backgroundColor: "#242424", 
                padding: "100px"
            }}>


<XYPlot height={200} width={200}>
  <LineSeries data={data} />
</XYPlot>
            </div>
        </>
    );
}

export default PriceChartReactVis;