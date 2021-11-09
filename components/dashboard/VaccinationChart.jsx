import { format } from "date-fns";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart
} from "@visx/xychart";

const tickLabelOffset = 10;

const accessors = {
  xAccessor: (d) => new Date(`${d.x}T00:00:00`),
  yAccessor: (d) => d.y
};

const VaccinationChart = ({currentNum}) => {

    const data1 = [
        {
          x: "2020-09-01",
          y: 0
        },
        {
          x: "2020-10-01",
          y: 0
        },
        {
          x: "2020-11-01",
          y: 1
        },
        {
            x: "2020-11-01",
            y: currentNum ? currentNum : 0
        },
      ];  

    return (
        <XYChart
            height={200}
            margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
            xScale={{ type: "time" }}
            yScale={{ type: "linear" }}
        >
            <AnimatedGrid
            columns={false}
            numTicks={4}
            lineStyle={{
                stroke: "#e1e1e1",
                strokeLinecap: "round",
                strokeWidth: 1
            }}
            strokeDasharray="0, 4"
            />
            <AnimatedAxis
            hideAxisLine
            hideTicks
            orientation="bottom"
            tickLabelProps={() => ({ dy: tickLabelOffset })}
            left={30}
            numTicks={4}
            />
            <AnimatedAxis
            hideAxisLine
            hideTicks
            orientation="left"
            numTicks={4}
            tickLabelProps={() => ({ dx: -10 })}
            />

            <AnimatedLineSeries
            stroke="#008561"
            dataKey="primary_line"
            data={data1}
            {...accessors}
            />
            <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showSeriesGlyphs
            glyphStyle={{
                fill: "#008561",
                strokeWidth: 0
            }}
            renderTooltip={({ tooltipData }) => {
                return (
                <div className="p-4">
                    {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                    const [key, value] = lineDataArray;

                    return (
                        <div className="row" key={key}>
                        <div className="date">
                            {format(accessors.xAccessor(value.datum), "MMM d")}
                        </div>
                        <div className="value">
                            <div className="w-1 h-1 bg-green-500"></div>
                            {accessors.yAccessor(value.datum)}
                        </div>
                        </div>
                    );
                    })}
                </div>
                );
            }}
            />
        </XYChart>
    );
};

export default VaccinationChart


