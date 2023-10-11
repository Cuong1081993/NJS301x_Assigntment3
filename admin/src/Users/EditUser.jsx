import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import Footer from "../Footer/Footer";

const EditUser = () => {
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getDetail = async () => {
      const response = await UserAPI.getDetailData(userId);
      setUser(response);
    };
    getDetail();
  }, [userId]);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await UserAPI.putUpdateUser(userId, user);
    if (response) {
      navigate("/users");
    }
  };

  return (
    <div className="page-wrapper d-block">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12">
            <form className="col-10" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter Full Name"
                  required
                  defaultValue={user.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  required
                  defaultValue={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  rows="2"
                  id="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  rows="2"
                  id="phone"
                  placeholder="Enter Phone Number"
                  required
                  defaultValue={user.phone}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  className="form-control"
                  rows="2"
                  id="role"
                  required
                  onChange={handleChange}
                >
                  <option value="client" selected={user.role === "client"}>
                    client
                  </option>
                  <option
                    value="counselors"
                    selected={user.role === "counselors"}
                  >
                    counselors
                  </option>
                  <option value="admin" selected={user.role === "admin"}>
                    admin
                  </option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditUser;
