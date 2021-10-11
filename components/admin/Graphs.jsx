import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

const elements = [
  { symbol: "Vaccinated", amount: 500000, color: "#A569BD"},
  { symbol: "Unvaccinated", amount: 20530, color: "#CACFD2"}
];

export default function Graphs({industry}) {
  const [active, setActive] = useState(null);
  const width = 200;
  const half = width / 2;

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={elements}
            pieValue={(data) => data.amount}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.symbol == data.symbol ? 12 : 10;
              return half - size;
            }}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>

          {active ? (
            <>
              <Text textAnchor="middle" fill="#1F618D" fontSize={25} dy={-20}>
                {active.amount}
              </Text>

              <Text textAnchor="middle" fill={active.color} fontSize={20} dy={20}>
                {active.symbol}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor="middle" fill="#1F618D" fontSize={25} dy={-20}>
                 501530
              </Text>

              <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                {industry}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
}