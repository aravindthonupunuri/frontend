import React, { useState, useEffect, Component } from "react";
import { Modal, Button, Carousel, Col } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Room extends Component {

   displayRooms = () => {
  console.log('niin');
    const { rooms,  fromDate, toDate, guestCount, roomCount } = this.props;
    const noofrooms = rooms.length;
    let dishCard = [];
    for (let i = 0; i < noofrooms; i += 1) {
      const room = rooms[i];
      // if (i % 3 === 0) imgSrc = burger;
      // else if (i % 3 === 1) imgSrc = noodles;
      // else if (i % 3 === 2) imgSrc = pasta;
      // console.log(imgSrc);
      dishCard.push(
        <>
         <div className="dish-item-card" style={{"width":"49%"}} role="button">
          <Col>
            {/* // lg={6} md={5} sm={12}> */}
            <div className="card">
              {
                room.imageUrls && room.imageUrls.length > 0 ? <img src={room.imageUrls[0]}  width="150px" height="200px"  className="smallimg" alt="" /> : ''
              }
              {/* <img src={imgSrc} width="150px" height="200px" className="card-img-top" alt="hduhd" /> */}
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <b style={{ fontWeight: "550" }}>
          <p>Location : {room.location}</p>
          {/* <p>Phone Number : {room.phonenumber}</p> */}
          <p>Rooms Remaining : {room.maxCount} &nbsp;&nbsp;&nbsp;&nbsp;Type : {room.type}</p>
          <p></p>
          <p>Rent per extra guest : {room.rentPerExtraGuestPerDay}</p> 
        </b>
        {room.maxCount >= roomCount && fromDate && toDate && (
            <Link
              to={`/book/${room.id}/${fromDate}/${toDate}/${guestCount}/${roomCount}`}
            >
              <button
                className="btn btn-primary m-2"
                style={{ border: "none" }}
              >
                Book Now
              </button>
            </Link>
          )}
                {/* <Button>Add to cart</Button> */}
              </div>
            </div>
          </Col>
          <br />
        </div>
        </>
      );
    }

    return dishCard;
}


  render() {
    return (
      <>
        {this.displayRooms()}
      </>
    );
  }
}

export default Room;


// function Room({ room, fromDate, toDate, guestCount, roomCount }) {
//   const [show, setShow] = useState(false);

//   console.log('****', room);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <div className="row">
//       <>
        
//       </>
//       {/* <div className="col-md-4">
//         {
//          room.imageUrls && room.imageUrls.length > 0 ?  <img src={room.imageUrls[0]} className="smallimg" alt="" /> : ''
//         }
       
//       </div>
//       <div className="col-md-5">
//         <h1 style={{ color: "rgb(150 177 231)", fontWeight: "bold" }}>
//           {room.name}
//         </h1>
//         <b style={{ fontWeight: "550" }}>
//           <p>Location : {room.location}</p>
//           <p>Phone Number : {room.phonenumber}</p>
//           <p>Rooms Remaining : {room.maxCount}</p>
//           <p>Type : {room.type}</p>
//           {/* <p>Free guest count : {room.freeguestcount}</p>
//           <p>Rent per extra guest : {room.rentperextraguestperday}</p> 
//         </b>

//         <div style={{ float: "right" }}>
//           {room.maxCount >= roomCount && fromDate && toDate && (
//             <Link
//               to={`/book/${room.id}/${fromDate}/${toDate}/${guestCount}/${roomCount}`}
//             >
//               <button
//                 className="btn btn-primary m-2"
//                 style={{ border: "none" }}
//               >
//                 Book Now
//               </button>
//             </Link>
//           )}

//           {room.maxCount >= 1 ? (
//             <button
//               className="btn btn-primary"
//               style={{
//                 border: "none",
//                 marginRight: "-82px",
//               }}
//               onClick={handleShow}
//             >
//               View Detail
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary"
//               style={{
//                 border: "none",
//                 marginRight: "-82px",
//                 cursor: "not-allowed",
//               }}
//               onClick={handleShow}
//               disabled
//             >
//               View Detail
//             </button>
//           )}
//         </div>
//       </div> */}

//       {/* <Modal show={show} onHide={handleClose} size="lg">
//         <Modal.Header>
//           <Modal.Title>
//             <h1 style={{ color: "black", fontWeight: "bold" }}>{room.name}</h1>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Carousel prevLabel="" nextLabel="">
//             {
//               room.imageUrls && room.imageUrls.length > 0 ?
//                 room.imageUrls.map((url) => {
//                   return (
//                     <Carousel.Item>
//                       <img
//                         className="d-block w-100 bigimg"
//                         src={url}
//                         alt="First slide"
//                       />
//                     </Carousel.Item>
//                   );
//                 })
//                 : ''
//             }


//           </Carousel>
//           <label style={{ fontWeight: "bold" }}>Description:&nbsp;</label>
//           <label> {room.description}</label>
//           <br></br>
//           <label style={{ fontWeight: "bold" }}>Rooms Remaining : &nbsp;</label>
//           <label>{room.maxCount}</label>
//           <br></br>
//           <label style={{ fontWeight: "bold" }}>Type : &nbsp;</label>
//           <label>{room.type}</label>
//           <br></br>
//           <label style={{ fontWeight: "bold" }}>Rent:&nbsp;</label>
//           <label> {room.rentperday}$ per Day</label>
//           <br></br>
//           {/* <label style={{ fontWeight: "bold" }}>
//             No. of free guests allowed : &nbsp;
//           </label>
//           <label>{room.freeguestcount}</label>
//           <br></br>
//           <label style={{ fontWeight: "bold" }}>
//             Rent per extra guest per day : &nbsp;
//           </label>
//           <label>{room.rentperextraguestperday}</label>
//           <br></br> 
//           <label style={{ fontWeight: "bold" }}>Location:&nbsp;</label>
//           <label> {room.location}</label>
//           <br></br>
//           <label style={{ fontWeight: "bold" }}>Contact details:&nbsp;</label>
//           <label>{room.phonenumber}</label>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal> */}
//     </div>
//   );
// }

// export default Room;
