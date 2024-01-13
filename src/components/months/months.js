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

  const [keysMonths, setKeysMonths] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("events")) {
      let a = JSON.parse(localStorage.getItem("events"));
      let keysMassive = [];
      for (let i = 0; i < Object.keys(a).length; i++) {
        keysMassive.push(Object.keys(a)[i].split("-"));
      }
      setKeysMonths(keysMassive);
    }
  }, []);

  let datesMass = [];
  const checker = (i) => {
    keysMonths.forEach((numb) => {
      if (
        parseInt(numb[1]) === i &&
        parseInt(numb[0]) === currentDate.getFullYear()
      ) {
        datesMass.push(parseInt(numb[1]));
      }
    });
  };


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
