import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import AdminRoomScreen from "./AdminRoomScreen";

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminScreen() {
  const user = JSON.parse(localStorage.getItem("currentUserName"));
  let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  console.log(user);

  useEffect(() => {
    if (!user || isAdmin == false) {
      window.location.href = "/homescreen";
    }
  }, []);

  return (
    <div className="ml-0 mt-3 mr-3 bs">
      <h1 className="text-center">Admin</h1>
      <AdminRoomScreen />
    </div>
  );
}

export default AdminScreen;
