import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import "aos/dist/aos.css";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from './components/SignUp/SignUp';
import AdminScreen from "./components/Admin/AdminScreen";
import PriceCard from "./components/Admin/PriceCard/PriceCard";
import PeakPricePage from "./components/Admin/PeakPricePage/PeakPricePage";
import Homescreen from "./components/UserHome/Homescreen";
import ProfileScreen from "./components/UserPages/ProfileScreen";
import EditBookings from "./components/UserPages/EditBookings";
import Bookingscreen from "./components/UserPages/Bookingscreen";

function NotFound() {
  return <div>not found man!!</div>;
}
function App() {
  return (<div className="App">
  <Header />
  <br />
  <br />
  <br />
    <Router>
      <Switch>
      <Route exact path="/login"> <Login /> </Route>
      <Route exact path="/signup"> <SignUp /> </Route>
      <Route exact path="/admin"> <AdminScreen /> </Route>
      <Route exact path="/price"> <PeakPricePage /> </Route>
      <Route exact path="/homescreen"> <Homescreen /> </Route>
      <Route path="/profile" exact component={ProfileScreen} />
        <Route path="/bookings" exact component={ProfileScreen} />
        <Route
          path="/editBookings/:bookingId/"
          exact
          component={EditBookings}
        />
        <Route
          path="/book/:roomid/:fromdate/:todate/:guestCount/:roomCount"
          exact
          component={Bookingscreen}
        />
        <Route path="/">
          <LandingPage />
        </Route>
        

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
