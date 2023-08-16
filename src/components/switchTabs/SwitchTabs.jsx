import React, { useState } from 'react'
import "./style.scss"


const SwitchTabs = ({data, onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activateTab = (tab, index) => {
    setLeft(index * 100); //width of tabItem and movingBg = 100px
    setTimeout(() => {
      setSelectedTab(index)
    }, 300);
   
    onTabChange(tab, index)
  }
  return (
    <div className='switchingTabs'>
      <div className="tabItems">
        {data.map((tab, index) => (
          <span key={index}
                className={`tabItem ${selectedTab===index ? "active" : ""}`}
                onClick={() => activateTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className='movingBg' style={{left}} /> {/* equivalent to left:left */}
      </div>
    </div>
  )
}

export default SwitchTabs
