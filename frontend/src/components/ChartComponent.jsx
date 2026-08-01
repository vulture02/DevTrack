import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProgressBarChart({ data, title }) {
  const max = Math.max(...data.map(d => d.value), 1)

  return (
    <Card className="border-border">
      <CardHeader className="pt-5 pb-3 px-5">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-5 pb-5">
        {data.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item.name}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.round((item.value / max) * 100)}%`,
                  background: item.color
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function PieChartWidget({ data, title }) {
  return (
    <ProgressBarChart
      title={title}
      data={data.map((d, i) => ({
        name: d.name,
        value: d.value,
        color: ['#2a78d6', '#1baf7a', '#898781', '#eda100', '#e34948'][i % 5]
      }))}
    />
  )
}

export function BarChartWidget({ data, title, xKey, yKey }) {
  return (
    <ProgressBarChart
      title={title}
      data={data.map((d, i) => ({
        name: d[xKey],
        value: d[yKey],
        color: ['#1baf7a', '#eda100', '#e34948'][i % 3]
      }))}
    />
  )
}