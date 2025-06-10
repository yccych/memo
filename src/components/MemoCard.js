import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles/MemoCard.scss';

const MemoCard = ({ memo, onNext, onPrev, isFirst, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  console.log('Memo content:', memo); // 调试信息

  const handleOpen = () => {
    setIsOpen(true);
    setShowContent(true);
  };

  // 添加错误处理
  if (!memo) {
    return (
      <div className="memo-page">
        <div className="card-container">
          <div className="paper-wrapper">
            <div className="memo-content">
              <div className="typewriter-text">
                暂无内容
              </div>
            </div>
          </div>
        </div>
        <div className="navigation-arrows">
          <button 
            className="nav-arrow" 
            onClick={onPrev} 
            disabled={isFirst}
          >
            ←
          </button>
          <button 
            className="nav-arrow" 
            onClick={onNext} 
            disabled={isLast}
          >
            →
          </button>
        </div>
      </div>
    );
  }

  // 将文本分成句子，每个句子单独显示
  const sentences = memo.split(/[。！？.!?]/).filter(s => s.trim());

  return (
    <div className="memo-page">
      <div className="card-container">
        <div className="paper-wrapper">
          {!isOpen ? (
            <button 
              className="open-button" 
              onClick={handleOpen}
            >
              撕开纸条
            </button>
          ) : (
            <div className="memo-content open">
              {showContent && (
                <TypeAnimation
                  sequence={[
                    memo + "by 爱你的YY",
                    1000,
                  ]}
                  wrapper="div"
                  speed={30}
                  className="typewriter-text"
                  cursor={true}
                  repeat={0}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="navigation-arrows">
        <button 
          className="nav-arrow" 
          onClick={onPrev} 
          disabled={isFirst}
        >
          ←
        </button>
        <button 
          className="nav-arrow" 
          onClick={onNext} 
          disabled={isLast}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MemoCard; 