import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  format,
  parse,
  isAfter,
  isBefore,
  startOfDay,
  addDays,
  subDays,
} from "date-fns";
import { zhCN } from "date-fns/locale";
import MemoCard from "./components/MemoCard";
import LuckyWheel from "./components/LuckyWheel";
import { memos, wheelItems } from "./data/memos";
import "./styles/App.scss";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMemo, setCurrentMemo] = useState(null);
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  // Get current date in China timezone (UTC+8)
  const getCurrentChinaDate = () => {
    const now = new Date();
    const chinaTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    return startOfDay(chinaTime);
  };

  console.log(getCurrentChinaDate());

  useEffect(() => {
    const formattedDate = format(selectedDate, "MM-dd-yyyy");
    const memo = memos.find((m) => m.date === formattedDate);
    setCurrentMemo(memo);
    setIsMemoOpen(false);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentMemo(null);
    setIsMemoOpen(false);
  };

  const handleMemoOpen = () => {
    setIsMemoOpen(true);
  };

  const handlePrevDay = () => {
    const prevDate = subDays(selectedDate, 1);
    if (!isBefore(prevDate, new Date("2025-06-05"))) {
      handleDateChange(prevDate);
    }
  };

  const handleNextDay = () => {
    const nextDate = addDays(selectedDate, 1);
    if (!isAfter(nextDate, getCurrentChinaDate())) {
      handleDateChange(nextDate);
    }
  };

  const isFutureDate = isAfter(startOfDay(selectedDate), getCurrentChinaDate());
  const isFirstDay = format(selectedDate, "MM-dd-yyyy") === "06-05-2025";
  const isLastDay =
    format(selectedDate, "MM-dd-yyyy") ===
    format(getCurrentChinaDate(), "MM-dd-yyyy");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
      <div className="app-container">
        <header className="header">
          <h1 className="title">YY&NN的异地时光</h1>
          <div className="date-picker-container">
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              maxDate={getCurrentChinaDate()}
              minDate={new Date("06-10-2025")}
              format="yyyy年MM月dd日"
            />
          </div>
        </header>

        {currentMemo && (
          <MemoCard
            date={currentMemo.date}
            memo={currentMemo.memo}
            isFuture={isFutureDate}
            onOpen={handleMemoOpen}
            onPrev={handlePrevDay}
            onNext={handleNextDay}
            isFirst={isFirstDay}
            isLast={isLastDay}
          />
        )}
        {isMemoOpen && currentMemo?.luckyWheelEnabled && (
          <LuckyWheel items={wheelItems} />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default App;
