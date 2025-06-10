import React, { useState } from 'react';
import { LuckyWheel } from '@lucky-canvas/react';
import '../styles/LuckyWheel.scss';

const LuckyWheelComponent = ({ items }) => {
  const [result, setResult] = useState(null);
  const [canSpin, setCanSpin] = useState(true);

  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', // Coral Red
      '#4ECDC4', // Turquoise
      '#FFD93D', // Yellow
      '#95E1D3', // Mint
      '#FF8B94', // Pink
      '#6C5CE7', // Purple
      '#A8E6CF'  // Light Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const defaultConfig = {
    width: '400px',
    height: '400px',
    blocks: [
      { padding: '10px', background: '#fff' }
    ],
    prizes: items.map(item => ({
      name: item.label,
      probability: item.percentage,
      background: getRandomColor()
    })),
    buttons: [
      {
        radius: '40%',
        background: '#ff69b4',
        fonts: [{ text: '开始\n抽奖', fontSize: '20px', fontColor: '#fff' }]
      }
    ],
    defaultStyle: {
      fontSize: '16px',
      fontColor: '#333',
      fontWeight: 'bold',
      fontFamily: '"Ma Shan Zheng", cursive'
    },
    defaultConfig: {
      gutter: 0
    }
  };

  const handleEnd = (prize) => {
    setResult(prize);
    if (prize.name === '再转一次') {
      setCanSpin(true);
    } else {
      setCanSpin(false);
    }
  };

  return (
    <div className="lucky-wheel-section">
      <h2 className="wheel-title">🎡 幸运大转盘 🎡</h2>
      <div className="wheel-container">
        <div className="pointer-container">
          <div className="pointer"></div>
        </div>
        <LuckyWheel
          {...defaultConfig}
          onEnd={handleEnd}
          disabled={!canSpin}
        />
      </div>
      {result && (
        <div className="result-modal">
          <div className="result-content">
            <h3>🎉 恭喜你抽中了：</h3>
            <p className="result-text">{result.name}</p>
            <button onClick={() => setResult(null)}>确定</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuckyWheelComponent; 