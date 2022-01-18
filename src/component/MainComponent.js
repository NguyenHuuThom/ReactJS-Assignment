import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import StaffList from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from "./FooterComponent";
import StaffInfo from "./StaffInfoComponent";
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

        const StaffWithId = ({ match }) => {
            return (
                <StaffInfo
                    staff={this.state.staffs.filter((dish) => dish.id === parseInt(match.params.staffId, 10))[0]}
                />
            )
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path='/staff/:staffId' component={StaffWithId} />
                    <Route exact path='/staffs' component={() => <StaffList staffs={this.state.staffs} />} />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;