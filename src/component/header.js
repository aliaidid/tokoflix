import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(){
        super();
        this.state = {
            saldo: 100000,
        }
    }
  render() {
    return (
      <div>
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link to="/" className="logo">
            <img src="tokoflix.png" alt="tokoflix"/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#lin">
            <span className="navbar-toggler-icon"></span>
        </button>
        </nav>
        </header>
      </div>
    );
  }
}

export default Header;
