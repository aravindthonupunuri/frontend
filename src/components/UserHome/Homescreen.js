import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import {
  Col, Container, Ratio, Row, Navbar, Nav, NavDropdown, Button, Modal
} from 'react-bootstrap';
import moment from "moment";

import Room from "../../common-components/Room";
import Loader from "../../common-components/Loader";
import Error from "../../common-components/Error";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.get("http://hotelmanagementlb-1491587862.us-east-2.elb.amazonaws.com/api/room/getallrooms")
        ).data;
        //console.log(data);
        setRooms(data);
        setDuplicateRooms(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);
  function changeDates(dates) {
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));
    } catch (e) {
      console.log(e);
    }
  }
  function filterByDate(dates) {
    try {
      if (!dates) {
        setFromDate(null);
        setToDate(null);
        return;
      }
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));

      var tempRooms = [];
      for (const room of duplicateRooms) {
        var availability = false;
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if (
                moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        //
        if (availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
    } catch (error) { }
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((x) =>
      x.location.toLowerCase().includes(searchKey.toLowerCase())
    );
    console.log(tempRooms);
    setRooms(tempRooms);
  }
  function filterByType(type) {
    setType(type);
    console.log(type);
    if (type !== "all") {
      const tempRooms = duplicateRooms.filter(
        (x) => x.type.toLowerCase() === type.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <>
      <div >
        <div className="container" style={{ zIndex: "11" }}>
          <div className="row mt-5 bs">
            <div className="col-md-3">
              <p>FROM - TO</p>
              <RangePicker
                format="DD-MM-YYYY"
                onCalendarChange={changeDates}
                onChange={filterByDate}
                disabledDate={(current) =>
                  fromDate
                    ? current > moment(fromDate, "DD-MM-YYYY").add(7, "day")
                    : null
                }
              />
            </div>

            <div className="col-md-2">
              <p>Room Type</p>

              <select
                className="form-control"
                value={type}
                onChange={(e) => {
                  filterByType(e.target.value);
                }}
              >
                <option value="all">All</option>
                <option value="double">Double rooms</option>
                <option value="suites">Suites</option>
                <option value="single-room">Single Room</option>
              </select>
            </div>

            <div className="col-md-2">
              <p>Guest Count</p>

              <select
                className="form-control"
                value={guestCount}
                placeholder="guest count"
                onChange={(e) => {
                  setGuestCount(e.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="col-md-2">
              <p>Room Count</p>

              <select
                className="form-control"
                value={roomCount}
                placeholder="guest count"
                onChange={(e) => {
                  setRoomCount(e.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="col-md-3">
              <p>Location</p>
              <input
                type="text"
                className="form-control"
                placeholder="search rooms"
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                onKeyUp={filterBySearch}
              />
            </div>
          </div>


        </div>
        {/* <Container> */}
        <div>
          <br /><br />
          {rooms.length > 0 ? (<div className="dish-cards">
            {/* <Row lg={2} sm={1}> */}
            <Room rooms={rooms}
              fromDate={fromDate}
              toDate={toDate}
              guestCount={guestCount}
              roomCount={roomCount} />
            {/* </Row> */}
          </div>) : ''}

          {/* <div className=" mt-4">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          rooms.map((x) => {
            return (
              <div className="">
                <Room
                  room={x}
                  fromDate={fromDate}
                  toDate={toDate}
                  guestCount={guestCount}
                  roomCount={roomCount}
                />
              </div>
            );
          })
        )}
      </div>*/}
        </div>
        {/* </Container> */}
      </div>
    </>
  );
}

export default Homescreen;
