import React from "react";

const Shift = ({ shift }) => {
  const startTime = shift.start;
  const endTime = shift.stop;

  //convert all dates to be humanable to read in UI
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const date = startDate.toDateString();
  let endDateStr = "";
  let hours;

  if(isNaN(endDate))
  {
    endDateStr = "";
    hours = (Date.now() - startDate)/1000/60/60;
  } else {
    hours = (endDate - startDate)/1000/60/60;
    endDateStr = endDate.toLocaleTimeString();
  }

  return (
    <li className="shift-item">
      <div>{date}</div>
      <div>{startDate.toLocaleTimeString()}</div>
      <div>{endDateStr}</div>
      <div>{hours.toPrecision(3)}</div>
    </li>
  );
};

export default Shift;