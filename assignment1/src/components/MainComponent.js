import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from './StaffListComponent';
import { STAFFS } from '../shared/staffs';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      selectedStaff: null,
    }
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  render() {

    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} selectedStaff={this.state.selectedStaff} />
      </div>
    );
  }
}

export default Main;