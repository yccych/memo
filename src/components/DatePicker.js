import React from 'react';
import './DatePicker.css';

const DatePicker = ({ value, min, max, onChange }) => {
  return (
    <div className="date-picker">
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker; 