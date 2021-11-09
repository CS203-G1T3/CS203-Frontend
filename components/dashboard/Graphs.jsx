// import { useState } from "react";
// import { Pie } from "@visx/shape";
// import { Group } from "@visx/group";
// import { Text } from "@visx/text";

// const elements = [
//   { symbol: "Vaccinated", amount: 500000, color: "#A569BD"},
//   { symbol: "Unvaccinated", amount: 20530, color: "#CACFD2"}
// ];

// export default function Graphs({industry}) {
//   const [active, setActive] = useState(null);
//   const width = 200;
//   const half = width / 2;

//   return (
//     <main>
//       <svg width={width} height={width}>
//         <Group top={half} left={half}>
//           <Pie
//             data={elements}
//             pieValue={(data) => data.amount}
//             outerRadius={half}
//             innerRadius={({ data }) => {
//               const size = active && active.symbol == data.symbol ? 12 : 10;
//               return half - size;
//             }}
//             padAngle={0.01}
//           >
//             {(pie) => {
//               return pie.arcs.map((arc) => {
//                 return (
//                   <g
//                     key={arc.data.symbol}
//                     onMouseEnter={() => setActive(arc.data)}
//                     onMouseLeave={() => setActive(null)}
//                   >
//                     <path d={pie.path(arc)} fill={arc.data.color}></path>
//                   </g>
//                 );
//               });
//             }}
//           </Pie>

//           {active ? (
//             <>
//               <Text textAnchor="middle" fill="#1F618D" fontSize={25} dy={-20}>
//                 {active.amount}
//               </Text>

//               <Text textAnchor="middle" fill={active.color} fontSize={20} dy={20}>
//                 {active.symbol}
//               </Text>
//             </>
//           ) : (
//             <>
//               <Text textAnchor="middle" fill="#1F618D" fontSize={25} dy={-20}>
//                  501530
//               </Text>

//               <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
//                 {industry}
//               </Text>
//             </>
//           )}
//         </Group>
//       </svg>
//     </main>
//   );
// }


import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip
} from "@visx/xychart";

const data1 = [
  { x: "2020-01-01", y: 50 },
  { x: "2020-01-02", y: 10 },
  { x: "2020-01-03", y: 20 }
];

const data2 = [
  { x: "2020-01-01", y: 30 },
  { x: "2020-01-02", y: 40 },
  { x: "2020-01-03", y: 80 }
];

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y
};

function LineChart() {
  return (
    <XYChart height={300} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={4} />
      <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
      <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {", "}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
};

export default LineChart
