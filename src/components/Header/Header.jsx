import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'antd';
require('./Header.css')



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userId: '',
            isAdmin: '',

        }
    }

    componentDidMount() {
        console.log("njkbvjhv")
        let userName = JSON.parse(localStorage.getItem("currentUserName"));
        let userId = JSON.parse(localStorage.getItem("currentUserId"));
        let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        this.setState({ userId, userName, isAdmin })
    }

    Logout = () =>  {
        localStorage.removeItem("currentUserName");
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("isAdmin");

        window.location.href = "/login";
    }


 menu = () => (
    <Menu
      items={[
        this.state.isAdmin ? {
            label: (
                <a rel="noopener noreferrer" href="/price">
                  Peak Pricing
                </a>
              ),
        } : {},
        {
          label: (
            <a rel="noopener noreferrer" href="/profile">
              Profile
            </a>
          ),
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="#" onClick={this.Logout()}>
              Logout
            </a>
          ),
        },
        // {
        //   label: (
        //     <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        //       3rd menu item
        //     </a>
        //   ),
        // },
      ]}
    />
  );

    

    //Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.
    //{"isAdmin":true,"rewards":100,"_id":"627d9bae80d26608a861b35e","name":"Admin","email":"admin@gmail.com"}
    render() {
        console.log(this.state)
        const { isAdmin } = this.state
        // let user = {"isAdmin":true,"rewards":100,"_id":"627d9bae80d26608a861b35e","name":"Admin","email":"admin@gmail.com"}
        return (
            <div className='header'>
                <nav className="navbar navbar-expand-lg">
                    <span className='header-title'>
                        <img src={require('../assets/spartan-logo1.png')} width="75px" height='75px' alt="not getting" />
                        <a className="navbar-brand" href="/homescreen">
                            SPARTAN HOTELS
                        </a>
                    </span>
                    {/* <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">
                            <i class="fas fa-bars" style={{ color: "white" }}></i>
                        </span>
                    </button> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* {navAction()} */}
                        {this.state.userName ?
                            // isAdmin ? (
                               <> <ul className="navbar-nav">
                                   {isAdmin ? (<li className="nav-item active">
                                        <a className="nav-link" href="/price">
                                            Peak Pricing
                                        </a>
                                    </li>) : (<li className="nav-item active">
                                        <a className="nav-link" href="/profile">
                                            Profile
                                        </a>
                                    </li>)}
                                    
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={this.Logout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            
                                <ul className="navbar-nav mr-5">
                                    {/* <div className="dropdown">
                            <button
                                className="dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={this.divElement}
                            >
                                <i class="fas fa-user mr-2"></i>
                                {this.state.userName}
                            </button>
                            <div ref={div => this.divElement} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="/profile">
                                    Profile
                                </a>
                                <a className="dropdown-item" href="#" >
                                    {/* onClick={Logout}> 
                                    Logout
                                </a>
                            </div>
                        </div> */}
                                    {/* <Dropdown overlay={this.menu} placement="bottomLeft" arrow>
                                        <Button>{this.state.userName}</Button>
                                    </Dropdown> */}
                                </ul></>
                            : (
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/signup">
                                            Register
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                </ul>
                            )}
                    </div>
                </nav >
            </div >
        );
    }
}

export default Header;