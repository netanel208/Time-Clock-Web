import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

function getUserByEmail(email){
  return api.get(`/users/${email}`);
}

export function fetchShifts(email) {
  var get = getUserByEmail(email).then((res) => {
    var user = res.data.data;
    var id = user._id;
    return api.get(`/shifts/${id}`);
  });
    return get;
}

export function startShift(email) {
  var get = getUserByEmail(email).then((res) => {
    var user = res.data.data;
    var id = user._id;
    return api.post(`/shifts/start`, {
      user_id: id,
      start: Date.now(),
      status: 0,
    });
  });
  return get;
}

export function endShift(id) {
  return api.put(`/shifts/stop/${id}`, {
    stop: Date.now(),
    status: 1,
  });
}

export function openShifts(email){
  let open_shifts = [];
  const get = fetchShifts(email).then((res) => {
    var shifts = [];
    if(!Array.isArray(res.data.data)){
      shifts = [res.data.data];
    } else {
      shifts = res.data.data;
    }
    open_shifts = shifts.filter((item) => (item.status == 0));
    return open_shifts;
  })
  return get;
}

export function getUserFullDetails(){
  let email = localStorage.getItem("email");
  var get = getUserByEmail(email).then((res) => {
    var user = res.data.data;
    var details = {
      name: user.name,
      phone: user.phone,
      city: user.city,
      address: user.address
    }
    return details; 
  })
  return get;
}

export function updateUser(user_data){
  let email = localStorage.getItem("email");
  var get = getUserByEmail(email).then((res) => {
    var user = res.data.data;
    var id = user._id;
    return api.put(`/users/update/${id}`, {
      name: user_data.name,
      phone: user_data.phone,
      city: user_data.city,
      address: user_data.address,
    });
  });
  return get;
}