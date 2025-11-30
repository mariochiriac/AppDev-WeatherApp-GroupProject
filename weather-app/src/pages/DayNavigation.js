import React from 'react'
import './DayNavigation.css'

export default function DayNavigation({currentDay, totalDays, onPrevious, onNext}) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    const dayName = daysOfWeek[currentDay % daysOfWeek.length];
    return (
    <div className='day-nav'>
            {/* Previous Button */}
            <button
                onClick={onPrevious}
                disabled={currentDay === 0}
                className='day-nav-button'
            >
                <span className='day-nav-icon'>&#8592;</span>
            </button>
        
       {/* Center Day Label */}
        <div className='day-nav-label-group'>
            <div className='day-nav-title'>{dayName}</div>
            <div className='day-nav-subtitle'>
                Day {currentDay + 1} of {totalDays}
            </div>
        </div>

        {/* Next Button */}
        <button
            onClick={onNext}
            disabled={currentDay === totalDays - 1}
            className='day-nav-button'   
        >
            <span className='day-nav-icon'>&#8594;</span>
        </button>
    </div>
  )
}
