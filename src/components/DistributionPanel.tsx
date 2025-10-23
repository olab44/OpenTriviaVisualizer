import React from 'react'
import './DistributionPanel.css'

export const DistributionPanel: React.FC = () => {
  return (
    <div className="distribution-panel">
      <div className="dist-card">
        <h4>Question Distribution by Category</h4>
        <div className="placeholder">[Pie chart placeholder]</div>
      </div>

      <div className="dist-card">
        <h4>Difficulty Distribution</h4>
        <div className="placeholder">[Bar chart placeholder]</div>
      </div>
    </div>
  )
}
