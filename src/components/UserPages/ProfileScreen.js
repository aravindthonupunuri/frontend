import React, { Component } from "react";
import { Tabs } from "antd";

import MyBookingScreen from "./MyBookingScreen";

const { TabPane } = Tabs;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: '',
        userId: '',
        isAdmin: '',
        rewards: ''

    }
}

componentDidMount() {
    console.log("njkbvjhv")
    let userName = JSON.parse(localStorage.getItem("currentUserName"));
    let userId = JSON.parse(localStorage.getItem("currentUserId"));
    let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    let rewards = JSON.parse(localStorage.getItem("rewards"));
    this.setState({ userId, userName, isAdmin, rewards })
}
  render() {
    const { userId, userName, isAdmin, rewards } = this.state;

    return (
      <div className="ml-4 mt-3">
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Profile" key="1">
          <div className="row ">
            <div className="col"></div>
            <div className="col align-items-center">
              <div className="bs">
                <h4 style={{ textAlign: "center" }}>MY PROFILE</h4>
                <p style={{ textAlign: "center" }}>Name : {userName}</p>
                {/* <p style={{ textAlign: "center"} }>Email : {user.email}</p> */}
                {/* <p>
                  IsAdmin : &nbsp;
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p> */}
                <p style={{ textAlign: "center" }} >Rewards: {rewards}$</p>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane>
      </Tabs>
    </div>
    );
  }
}

export default ProfileScreen;
