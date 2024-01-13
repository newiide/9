import { useContext, useEffect, useState } from "react";
import "./style.css";
import CalendarContext from "../../context/calendar.context";
import { MONTHS } from "../shared/months";

const MonthsComponent = () => {
  const { setCurrentDate, currentDate } = useContext(CalendarContext);

  const click = (index) => {
    setCurrentDate((preCurrentDate) => {
      const newDate = new Date(preCurrentDate);
      newDate.setMonth(index);
      return newDate;
    });
  };

  useEffect(() => {
    if (localStorage.getItem("events")) {
      const events = JSON.parse(localStorage.getItem("events"));
      const keysMassive = Object.keys(events).map((key) => {
        return key.split("-").map(Number); // Перетворюємо рядок в числа
      });
      setKeysMonths(keysMassive);
    }
  }, []);
  
  let datesMass = [];
  const checker = (i) => {
    keysMonths.forEach((numb) => {
      const [year, month] = numb;
      if (month === i && year === currentDate.getFullYear()) {
        datesMass.push(month);
      }
    });
  };
  
  const [keysMonths, setKeysMonths] = useState([])  


  return (
    <div className="months-wrapper content-wrapper">
      <div className="header">{MONTHS[currentDate.getMonth()]}</div>
      {MONTHS.map((month, i) => {
        checker(i);
        return (
          <div
            key={i}
            className={
              datesMass.includes(i)
                ? "month content-item green"
                : "month content-item "
            }
            onClick={() => {
              click(i);
            }}
          >
            {month}
          </div>
        );
      })}
    </div>
  );
};


export default MonthsComponent;
