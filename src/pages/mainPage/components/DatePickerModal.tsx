// components/DatePickerModal.tsx
import React from 'react';

const SCROLL_HEIGHT = 40;

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedDate: Date) => void;
  defaultDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  defaultDate,
}) => {
  const now = new Date();
  const startYear = now.getFullYear() - 100;
  const yearList = Array.from({ length: 101 }, (_, i) => `${startYear + i}`);
  const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();
  const [yearIndex, setYearIndex] = React.useState(100);
  const [monthIndex, setMonthIndex] = React.useState(now.getMonth());
  const [dayIndex, setDayIndex] = React.useState(now.getDate() - 1);

  React.useEffect(() => {
    if (defaultDate) {
      const year = defaultDate.getFullYear();
      const month = defaultDate.getMonth();
      const day = defaultDate.getDate();
      setYearIndex(year - startYear);
      setMonthIndex(month);
      setDayIndex(day - 1);
    }
  }, [defaultDate]);

  const selectedYear = startYear + yearIndex;
  const selectedMonth = monthIndex + 1;
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const dayList = Array.from({ length: daysInMonth }, (_, i) =>
    `${i + 1}`.padStart(2, '0')
  );

  const getSelectedDate = () => {
    const year = selectedYear;
    const month = selectedMonth - 1;
    const day = dayIndex + 1;
    return new Date(year, month, day);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-md z-50 animate-slide-up">
      <div className="flex justify-around items-center py-4">
        <ScrollColumn
          items={yearList}
          selectedIndex={yearIndex}
          setSelectedIndex={setYearIndex}
        />
        <ScrollColumn
          items={monthList}
          selectedIndex={monthIndex}
          setSelectedIndex={setMonthIndex}
        />
        <ScrollColumn
          items={dayList}
          selectedIndex={Math.min(dayIndex, dayList.length - 1)}
          setSelectedIndex={setDayIndex}
        />
      </div>

      <div className="px-4 pb-6">
        <div className="flex justify-between gap-4">
          <button
            className="w-full py-3 bg-gray-200 text-gray-700 text-base rounded-lg"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="w-full py-3 bg-green-500 text-white text-base rounded-lg"
            onClick={() => {
              const date = getSelectedDate();
              onConfirm(date);
              onClose();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;

interface ScrollColumnProps {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({
  items,
  selectedIndex,
  setSelectedIndex,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: selectedIndex * SCROLL_HEIGHT,
        behavior: 'auto',
      });
    }
  }, [selectedIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newIndex = Math.round(e.currentTarget.scrollTop / SCROLL_HEIGHT);
    setSelectedIndex(Math.min(Math.max(newIndex, 0), items.length - 1));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-1/3 h-40 overflow-y-scroll no-scrollbar snap-y scroll-smooth"
      onScroll={handleScroll}
    >
      <div className="flex flex-col items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className={`h-10 flex items-center justify-center text-lg snap-start transition-all duration-200 ${
              index === selectedIndex
                ? 'text-black font-semibold'
                : 'text-gray-400'
            }`}
            style={{ height: `${SCROLL_HEIGHT}px` }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};