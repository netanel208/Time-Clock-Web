import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchShifts, endShift, startShift, openShifts } from "../api/api";
import Shift from "./Shift.component";

const ShiftList = () => {
  const [shifts, setShifts] = useState([]);
  const [open_shifts, setOpenShifts] = useState([]);
  var [disabled_start, setDisabledStart] = useState(false);
  var [disabled_end, setDisabledEnd] = useState(true);
  var [curr_shift_id, setCurrShiftId] = useState("");
  let history = useHistory();

  //happen when component will render
  useEffect(() => {
    var email = localStorage.getItem("email");
    openShifts(email).then((res) => (setOpenShifts(res)));
    if(open_shifts.length > 0){
      setDisabledStart(true);
      setDisabledEnd(false);
      setCurrShiftId(open_shifts[0]._id);
    }
    //add loader disable buttons
    fetchShifts(email)
      .then((res) => {
        var shiftsApi;
        if(!Array.isArray(res.data.data)){
          shiftsApi = [res.data.data];
        } else {
          shiftsApi = res.data.data;
        }
        //sort shifts
        //find not finished shit if exists
        // in case of all finished - show start
        // else show stop
        setShifts(shiftsApi);
      })
      .catch(console.log)
      .finally(/*finish loader and enable buttons*/);
  }, [open_shifts]);
  

  const handleStartShift = () => {
    //add loader
    //disable buttons
    setDisabledStart(true);
    setDisabledEnd(false);
    console.log("start clicked");
    startShift(localStorage.getItem("email"))
      .then((res) => {
        setCurrShiftId(res.data.id);
        // localStorage.setItem("current_shift",curr_shift_id);
        history.go(0);
      })
      .catch(console.log)
      .finally(/*finish loader*/);
  };

  const handleStopShift = () => {
    //add loader
    //disable buttons
    setDisabledEnd(true);
    setDisabledStart(false);
    console.log("end clicked");
    console.log("curr_shift_id = "+curr_shift_id);
    endShift(curr_shift_id)
      .then((res) => {
        history.go(0);
      })
      .catch(console.log)
      .finally(localStorage.removeItem("current_shift"));
  };

  return (
    <div>
      <div className="shifts-buttons">
        <button onClick={handleStartShift} disabled={disabled_start} className="submit-button" id="start">
          Start
        </button>
        <button onClick={handleStopShift} disabled={disabled_end} className="submit-button" id="end">
          End
        </button>
      </div>
      <ul className="shifts-list">
        {shifts.map((item) => (
          <Shift key={item._id} shift={item} />
        ))}
      </ul>
    </div>
  );
};

export default ShiftList;
