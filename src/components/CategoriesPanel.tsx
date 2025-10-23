import React from 'react'
import './CategoriesPanel.css'

export const CategoriesPanel: React.FC<{
  categories?: string[]
  selected?: string
  onSelect?: (name: string) => void
}> = ({ categories = [], selected, onSelect }) => {
  const list = categories;
  const ALL_KEY = 'ALL_QUESTIONS' 
  const displayList = [
    { name: 'All', key: ALL_KEY },
    ...list.map(c => ({ name: c, key: c }))
  ]
  const handleSelect = (key: string) => {
    if (onSelect) {
      const selection = key === ALL_KEY ? '' : key;
      onSelect(selection);
    }
  }
  const isAllSelected = selected === '' || selected === undefined || selected === null;

  return (
    <div className="categories-panel">
      <h3>Categories</h3>
      <ul>
        {displayList.map(({ name, key }) => {
          const isActive = key === ALL_KEY ? isAllSelected : selected === key;
          
          return (
            <li 
              key={key} 
              onClick={() => handleSelect(key)} 
              style={{ 
                cursor: onSelect ? 'pointer' : 'default', 
                fontWeight: isActive ? '700' : '400' 
              }}
            >
              {name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}