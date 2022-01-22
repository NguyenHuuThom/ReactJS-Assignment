import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Staff from './StaffComponent';
import Header from './HeaderComponent';
import Footer from "./FooterComponent";
import StaffInfo from "./StaffInfoComponent";
import Salary from "./SalaryComponent";
import Department from "./DepartmentComponent";
import { DEPARTMENTS, STAFFS } from '../shared/staffs';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,
        }
    }

    onStaffSelect(staffId) {
        this.setState({ selectedStaff: staffId })
    }

    render() {

        const storageStaffs = JSON.parse(localStorage.getItem('staffs'))
        const StaffWithId = ({ match }) => {

            return (
                <StaffInfo
                    staff={(storageStaffs || this.state.staffs).filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                />
            )
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path='/staff/:staffId' component={StaffWithId} />
                    <Route exact path='/staffs' component={() => <Staff staffs={this.state.staffs} />} />
                    <Route exact path='/departments' component={() => <Department departments={this.state.departments} />} />
                    <Route exact path='/salary' component={() => <Salary staffs={(storageStaffs || this.state.staffs)} />} />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;