import React, { useState, useEffect } from "react";
import axios from "axios";
import moment, { max } from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../../common-components/Loader";
import Error from "../../common-components/Error";
import "../../App.css";
import { amenities } from "../../common-components/Amenities";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [useRewards, setUseRewards] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amenitiesAmount, setAmenitiesAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [checkedState, setCheckedState] = useState(
    new Array(amenities.length).fill(false)
  );
  const [newtotal, setnewtotal] = useState(0);
  const [offer, setnewOffer] = useState("");
  const [extra, setExtra] = useState("");
  const [display, setDisplay] = useState(false);

  const [rewards, setRewards] = useState();
  const [updateUserRewards, setUpdateUserRewarrds] = useState(false);

  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + amenities[index].price;
        }
        return sum;
      },
      0
    );
    const totalPriceForAmenities = totalPrice * totalDays;
    setAmenitiesAmount(totalPriceForAmenities);
    setDisplay(false);
  };

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const guestCount = parseInt(match.params.guestCount);
  const roomCount = match.params.roomCount;
  console.log('######', fromdate)

  const handleCheck = (event) => {
    var updatedList = [...amenitiesList];
    if (event.target.checked) {
      updatedList = [...amenitiesList, event.target.value];
    } else {
      updatedList.splice(amenitiesList.indexOf(event.target.value), 1);
    }
    setAmenitiesList(updatedList);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUserName"));

    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.get("http://localhost:8080/api/room/getroombyid/"+match.params.roomid)
        ).data;
        console.log(data);
        setRoom(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    console.log('totalDays',totalDays)
    setTotalDays(totaldays);
    const roomrent = totalDays * room.rentPerDay;
    setTotalAmount(roomrent);
  }, [room]);

  const handleUseReedem = () => {
    console.log(useRewards);
    setDisplay(false);
    setUseRewards(!useRewards);
    const rewards = JSON.parse(localStorage.getItem("rewards"));
    console.log(useRewards)
    if (useRewards === true) {
      const updatedCostAfterRewards = totalAmount - rewards;
      setTotalAmount(updatedCostAfterRewards);
      setRewards(0);
    } else {
      setRewards(rewards);
      const updatedCostAfterRewards = totalAmount + rewards;
      setTotalAmount(updatedCostAfterRewards);
    }
  };

  const handlePrice = async () => {
     const fromDate = moment(match.params.fromdate, "DD-MM-YYYY");
     const toDate = moment(match.params.todate, "DD-MM-YYYY");
     console.log('@@',fromDate._i, totalAmount, amenitiesAmount)
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUserId")),
      fromdate : fromDate._i,
      todate : toDate._i,
      guestCount,
      totalamount: totalAmount + amenitiesAmount,
      totaldays: totalDays,
      remainingAmount: room.rentperday,
      extracostapplied: "",
      offerapplied: "",
    };

    // console.log(JSON.stringify(bookingDetails))
    console.log(bookingDetails)


    axios
      .post("http://localhost:8080/api/bookings/getUpdatedPrice", bookingDetails)
      .then((result) => {
        console.log(result);
        console.log(typeof ((guestCount - 2)*15))
        console.log(typeof(result.data.body.totalAmount))

        var newRoomCost = 0;
        if (guestCount > 2) {
          newRoomCost = parseInt(result.data.body.totalAmount) + (guestCount - 2) * 15;
          if (roomCount > 1) {
            newRoomCost = newRoomCost * roomCount;
          }
        } else {
          newRoomCost = result.data.body.totalAmount;
          if (roomCount > 1) {
            newRoomCost = newRoomCost * roomCount;
          }
        }
console.log(newRoomCost)
        setnewtotal(newRoomCost);
        setnewOffer(result.data.body.offerapplied);
        setExtra(result.data.body.extracostapplied);
        setDisplay(true);
        // setUpdateUserRewarrds(true);
        if (result.data.body.offerapplied !== "") {
          console.log(
            "====================================== RP" +
              Number(JSON.parse(localStorage.getItem("rewards"))) +
              5
          );
          // console.log(JSON.parse(localStorage.getItem("currentUser")).rewards);
          // const result = axios
          //   .put(
          //     "http://localhost:8080/api/users/updateUserRewards/" +
          //       JSON.parse(localStorage.getItem("currentUserId")),
          //     {
          //       rewardsPoints:
          //         Number(
          //           JSON.parse(localStorage.getItem("rewards"))
          //         ) + 5,
          //     }
          //   )
          //   .then((userRes) => {
          //     setIsRoomBooked(true);
          //     console.log(userRes);
          //     let rewards =
          //       Number(
          //         JSON.parse(localStorage.getItem("rewards"))
          //       ) + 5;
          //       //
          //     localStorage.setItem("rewards", JSON.stringify(rewards));
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBooking = async () => {
    const fromDate = moment(match.params.fromdate, "DD-MM-YYYY");
    const toDate = moment(match.params.todate, "DD-MM-YYYY");
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUserId")),
      fromdate : fromDate._i,
      todate : toDate._i,
      guestCount,
      totalamount: newtotal,
      totaldays: totalDays,
      remainingAmount: room.rentperday,
      extracostapplied: "extra cost",
      offerapplied: "offer",
      status: "booked"
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "http://localhost:8080/api/bookings/bookroom",
        bookingDetails
      );
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          setIsRoomBooked(true);
          if (rewards === 0) {
            const result = axios
              .put(
                "http://localhost:8080/api/users/updateUserRewards/" +
                  JSON.parse(localStorage.getItem("currentUserId")),
                { rewardsPoints: 0 }
              )
              .then((userRes) => {
                setIsRoomBooked(true);
                console.log(userRes);
                let rewards = 0;
                localStorage.setItem("rewards", JSON.stringify(rewards));
              })
              .catch((error) => {
                console.log(error);
              });
            // window.location.href = "/home";
          } else {
            window.location.href = "/home";
          }
        }
        window.location.href = "/bookings";
      });
    } catch (error) {
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);   
  };

 

  if (isRoomBooked) {
    // code of decreasing room count
    console.log(match.params.roomCount);
    console.log(room.maxcount);
    const totalRooms = room.maxcount - match.params.roomCount;
    console.log(totalRooms);
    console.log(room._id);
    axios
      .put("http://localhost:8080/api/rooms/updateRoom/" + room.id, {
        totalRooms,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="col">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div
          style={{ marginLeft: "1.5px" }}
          className="row justify-content-center mt-5 bs"
        >
          <div className="col">
            <h1 style={{ color: "rgb(144 92 15)", fontWeight: "bold" }}>
              {room.name}
            </h1>
           { room.imageUrls && room.imageUrls.length > 0 ?  <img src={room.imageUrls[0]} className="bigimg" alt="" /> : ''}
          </div>
          <div className="col">
            <div style={{ textAlign: "right" }}>
              <h1>
                <u>Booking Detailss</u>
              </h1>
              <hr />
              <b>
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUserName")).name}
                </p>
                <p>From Date : {match.params.fromdate}</p>
                <p>To Date : {match.params.todate}</p>
                <p>Max Count : {room.maxCount}</p>
                <p>Guest Count: {match.params.guestCount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1>
                <u>Amenities</u>
              </h1>
              <hr />
              <div className="col">
                <ul>
                  {amenities.map(({ name, price }, index) => {
                    return (
                      <li key={index}>
                        <div className="amenities">
                          <div
                            className="amenities-items"
                            style={{
                              width: "20px",
                              marginLeft: "100%",
                              marginBottom: "-35px",
                            }}
                          >
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={name}
                              value={name}
                              checked={checkedState[index]}
                              onChange={() => handleOnChange(index)}
                            />
                          </div>
                          <p
                            style={{ marginRight: "15px" }}
                            htmlFor={`custom-checkbox-${index}`}
                          >
                            {name} ({getFormattedPrice(price)})
                          </p>
                          <p className="amenities-items"></p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1>
                <u>Amount</u>
              </h1>
              <hr />
              <b>
                <p>Total Days : {totalDays}</p>
                <p>Rent per day : {room.rentPerDay}</p>

                {JSON.parse(localStorage.getItem("rewards")) !==
                0 ? (
                  <>
                    <p style={{ marginRight: "4%" }}>Use Rewards</p>

                    <div
                      className="amenities-items"
                      style={{
                        width: "20px",
                        marginLeft: "97%",
                        marginTop: "-45px",
                        // position: "relative",
                      }}
                    >
                      <div>
                        <input type="checkbox" onChange={handleUseReedem} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "10px", color: "red" }}>
                      **You used all your rewards
                    </div>
                  </>
                )}

                {/* <p>Total Amount : {Number(totalAmount + amenitiesAmount)}</p> */}

                <button onClick={handlePrice} className="btn btn-primary">
                  Check Updated Price
                </button>
                {display && (
                  <div>
                    <br></br>
                    Updated Cost: {newtotal}
                    <br></br>
                    {offer}
                    <br></br>
                    {extra}
                  </div>
                )}
              </b>
            </div>
            <div
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px",
                marginLeft: "36%",
                // backgroundColor: "yellow",
              }}
            >
              **Cannot choose Amenities, once price is updated!**
            </div>

            <div style={{ float: "right" }}>
              {/* <StripeCheckout
                amount={totalAmount * 100}
                currency="USD"
                token={onToken}
                stripeKey="YOUR PUBLIC STRIP API KEY"
              ></StripeCheckout> */}

              {display && (
                <button onClick={handleBooking} className="btn btn-primary">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
