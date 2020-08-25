import React, { useEffect, useState, Component } from 'react';
import { getUserFullDetails, updateUser} from "../../../api/api";

const ProfilePage = () => {
    const [user_name, setUserName] = useState("");
    var [user_phone, setUserPhone] = useState("");
    var [user_city, setUserCity] = useState("");
    var [user_address, setUserAddress] = useState("");

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
        updateUser(userData);
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
                  value={user_name}
                  onChange={e => setUserName(e.target.value)}
                  onClick={e => (e.target.value="")}
                  placeholder="Full Name"
                  disabled
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
                  value={user_phone}
                  onChange={e => setUserPhone(e.target.value)}
                  onClick={e => (e.target.value="")}
                  placeholder="Phone Number"
                  disabled
                />
              </div>
              <div className="input-field col s12">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={user_city}
                  onChange={setUserCity}
                  placeholder="City"
                  disabled
                />
              </div>
              <div className="input-field col s12">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  value={user_address}
                  onChange={setUserAddress}
                  placeholder="Address"
                  disabled
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