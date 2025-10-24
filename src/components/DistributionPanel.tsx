import React, { useMemo } from 'react'
import './DistributionPanel.css'
import type { TriviaQuestion } from '../hooks/useFetchTrivia'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'

const BAR_COLORS = ['#4CAF50', '#36A2EB', '#FFCE56', '#9966FF', '#FF9F40', '#F44336']
const DIFFICULTY_COLORS = ['#4CAF50', '#FF9F40', '#F44336']
type ChartData = { name: string; value: number }

const processCategoryData = (questions: TriviaQuestion[]): ChartData[] => {
  const map = new Map<string, number>()
  for (const q of questions) {
    map.set(q.category, (map.get(q.category) || 0) + 1)
  }
  const arr = Array.from(map.entries()).map(([name, value]) => ({ name, value }))

  arr.sort((a, b) => a.name.length - b.name.length)
  return arr
}

const processDifficultyData = (questions: TriviaQuestion[]) => {
  const counts = { easy: 0, medium: 0, hard: 0 }
  for (const q of questions) {
    switch (q.difficulty) {
      case 'easy':
        counts.easy += 1
        break
      case 'medium':
        counts.medium += 1
        break
      case 'hard':
        counts.hard += 1
        break
    }
  }
  const data: ChartData[] = [
    { name: 'Easy', value: counts.easy },
    { name: 'Medium', value: counts.medium },
    { name: 'Hard', value: counts.hard },
  ]
  const total = counts.easy + counts.medium + counts.hard
  return { data, total }
}

const CategoryBarChart: React.FC<{ data: ChartData[] }> = ({ data }) => (
  <div style={{ width: '100%', height: 540, overflow: 'visible' }}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 140 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={140} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" name="Count">
          {data.map((_, index) => (
            <Cell key={`bar-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
)

const DifficultyPieChart: React.FC<{ data: ChartData[]; total: number }> = ({ data, total }) => {
  const tooltipFormatter = (value: number, name: string) => {
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
    return [`${value} (${pct}%)`, name]
  }

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {data.map((_, index) => (
              <Cell key={`cell-diff-${index}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const DistributionPanel: React.FC<{ questions?: TriviaQuestion[] }> = ({ questions = [] }) => {
  const categoryData = useMemo(() => processCategoryData(questions), [questions])
  
  const { data: difficultyData, total: totalDifficulty } = useMemo(
    () => processDifficultyData(questions),
    [questions]
  )

  return (
    <div className="distribution-panel">
      <div className="dist-card">
        <h4>Question Distribution by Category</h4>
        <CategoryBarChart data={categoryData} />
      </div>

      <div className="dist-card">
        <h4>Question Difficulty Distribution</h4>
        <DifficultyPieChart data={difficultyData} total={totalDifficulty} />
      </div>
    </div>
  )
}