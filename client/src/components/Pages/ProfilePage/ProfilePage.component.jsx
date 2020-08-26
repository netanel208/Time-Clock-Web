import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import { getUserFullDetails, updateUser} from "../../../api/api";

const ProfilePage = () => {
    const [user_name, setUserName] = useState("");
    var [user_phone, setUserPhone] = useState("");
    var [user_city, setUserCity] = useState("");
    var [user_address, setUserAddress] = useState("");
    let history = useHistory();

    getUserFullDetails().then((res) => {
      setUserName(res.name);
      setUserPhone(res.phone);
      setUserCity(res.city);
      setUserAddress(res.address);
      return res;
    })

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(document.getElementById("name").placeholder);
        const userData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            city: document.getElementById("city").value,
            address: document.getElementById("address").value
        };
        console.log(userData);
        updateUser(userData).then((res) => (history.go(0)));
    };

    return (
        <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Employee profile</b>
              </h4>
            </div>
            <form noValidate onSubmit={submitHandler}>
              <div className="input-field col s12">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  defaultValue={user_name}
                  onChange={e => setUserName(e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <div className="input-field col s12">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={localStorage.getItem("email")}
                  disabled
                />
              </div>
              <div className="input-field col s12">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="phone"
                  defaultValue={user_phone}
                  onChange={e => setUserPhone(e.target.value)}
                  placeholder="Phone Number"
                />
              </div>
              <div className="input-field col s12">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  defaultValue={user_city}
                  onChange={e => setUserCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="input-field col s12">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  defaultValue={user_address}
                  onChange={e => setUserAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    height: "40px",
                    border: "0px solid",
                    borderRadius: "4px",
                    background: "rgb(151, 187, 255)",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "10px"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
};


export default ProfilePage;
