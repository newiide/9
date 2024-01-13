import { useContext, useEffect, useState } from "react";
import { MONTHS } from "../shared/months";
import "./style.css";
import CalendarContext from "../../context/calendar.context";


const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}


const MonthComponent = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysCount = getDaysInMonth(currentYear, currentMonth);

  const click = (day) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(day);
      return newDate;
    });
  };

  const [keys, setKeys] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("events")) {
      let a = JSON.parse(localStorage.getItem("events"));
      let keysMassive = [];
      for (let i = 0; i < Object.keys(a).length; i++) {
        keysMassive.push(Object.keys(a)[i].split("-"));
      }
      setKeys(keysMassive);
    }
  }, []);

  let datesMass = [];
  const checker = (i) => {
    keys.forEach((numb) => {
      if (
        numb[2] - 1 === i &&
        parseInt(numb[1]) === currentDate.getMonth() &&
        parseInt(numb[0]) === currentDate.getFullYear()
      ) {
        datesMass.push(numb[2] - 1);
      }
    });
  };
  return (
    <div className="content-wrapper month-wrapper">
      <div className="header">{MONTHS[currentMonth]}</div>
      {WEEK_DAYS.map((dayName) => (
        <div className="day-name">{dayName}</div>
      ))}
      {Array(daysCount)
        .fill(null)
        .map((el, i) => {
          const date = new Date(currentDate);
          date.setDate(i + 1);
          const dayOfWeek = date.getDay();

          checker(i);

          return (
            <div
              onClick={() => {
                click(i + 1);
              }}
              key={i}
              style={{ "--day-col-start": dayOfWeek }}
              className={
                datesMass.includes(i)
                  ? "content-item day green"
                  : "content-item day"
              }
            >
              {i + 1}
            </div>
          );
        })}
    </div>
  );
};

export default MonthComponent
