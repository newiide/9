import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import CalendarContext from "../../context/calendar.context";



const YearsComponent = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);

  const [year, setYear] = useState(currentDate.getFullYear());

  const halfCount = 12;

  const years = [];
  for (let i = year - halfCount; i <= year + halfCount; i++) {
    years.push(i);
  }

  const nextPage = () => {
    setYear((prevYear) => prevYear + 25);
  };

  const prevPage = () => {
    setYear((prevYear) => prevYear - 25);
  };

  const click = (year) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
  };

  const [keysYears, setKeysYears] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("events")) {
      let events = JSON.parse(localStorage.getItem("events"));
      let keysMassive = Object.keys(events).map((key) => {
        return key.split("-")[0];
      });
      setKeysYears(keysMassive);
    }
  }, []);

  return (
    <div className="years-wrapper content-wrapper">
      <div className="header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="arrow-left"
          onClick={prevPage}
        />
        {year}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="arrow-right"
          onClick={nextPage}
        />
      </div>
      {Array(halfCount * 2 + 1)
        .fill(null)
        .map((_, index) => {
          const showYear = year - halfCount + index;

          return (
            <div
              key={index}
              className={
                keysYears.includes(showYear.toString())
                  ? "year content-item green"
                  : "year content-item"
              }
              onClick={() => {
                click(showYear);
              }}
            >
              {showYear}
            </div>
          );
        })}
    </div>
  );
};


export default YearsComponent;

