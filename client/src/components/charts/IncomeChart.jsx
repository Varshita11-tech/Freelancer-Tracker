import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function IncomeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2554eb" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#2554eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c26ea" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#7c26ea" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', fontSize: 13 }}
          formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, undefined]}
        />
        <Area type="monotone" dataKey="income" stroke="#2554eb" strokeWidth={2.5} fill="url(#incomeGradient)" name="Income" />
        <Area type="monotone" dataKey="expenses" stroke="#7c26ea" strokeWidth={2} fill="url(#expenseGradient)" name="Expenses" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
