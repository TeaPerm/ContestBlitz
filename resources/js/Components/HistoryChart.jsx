import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Round 1',
    SemiAnalysis: 18,
    'The Pragmatic Engineer': 17,
  },
  {
    date: 'Round 2',
    SemiAnalysis: 15,
    'The Pragmatic Engineer': 14,
  },
  {
    date: 'Round 3',
    SemiAnalysis: 5,
    'The Pragmatic Engineer': 9,
  },
  {
    date: 'Round 4',
    SemiAnalysis: 1,
    'The Pragmatic Engineer': 0,
  },
];

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function HistoryChart() {
  return (
    <AreaChart
      className="h-80"
      data={chartdata}
      index="date"
      categories={['SemiAnalysis', 'The Pragmatic Engineer']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
