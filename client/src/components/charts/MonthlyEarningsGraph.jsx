import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function MonthlyEarningsGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', fontSize: 13 }}
          formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Earnings']}
          cursor={{ fill: 'rgba(124,38,234,0.06)' }}
        />
        <Bar dataKey="income" radius={[8, 8, 0, 0]} fill="#7c26ea" maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  )
}
