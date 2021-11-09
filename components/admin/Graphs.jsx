
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip
} from "@visx/xychart";

const data1 = [
  { x: "2021-01-01", y: 10 },
  { x: "2021-03-05", y: 20 },
  { x: "2021-06-10", y: 50 }
];

const data2 = [
  { x: "2021-01-01", y: 5 },
  { x: "2021-01-02", y: 20 },
  { x: "2021-01-03", y: 30 }
];

const data3 = [
  { x: "2021-01-01", y: 8 },
  { x: "2021-01-02", y: 15 },
  { x: "2021-01-03", y: 20 }
];

const data4 = [
  { x: "2021-01-01", y: 10 },
  { x: "2021-01-02", y: 20 },
  { x: "2021-01-03", y: 35 }
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
      <AnimatedLineSeries dataKey="Food & Beverage" data={data1} {...accessors} />
      <AnimatedLineSeries dataKey="Entertainment" data={data2} {...accessors} />
      <AnimatedLineSeries dataKey="Retail" data={data3} {...accessors} />
      <AnimatedLineSeries dataKey="Office" data={data4} {...accessors} />

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