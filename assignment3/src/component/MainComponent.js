import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Staff from './StaffComponent';
import Header from './HeaderComponent';
import Footer from "./FooterComponent";
import StaffInfo from "./StaffInfoComponent";
import Salary from "./SalaryComponent";
import DepWithId from "./DepWithId";
import Department from "./DepartmentComponent";
import { postStaff, fetchStaffs, fetchDeps, fetchSalaries, delStaff, editStaff } from "../redux/ActionCreator";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalaries: state.staffsSalaries,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postStaff: (
        name,
        doB,
        startDate,
        department,
        salaryScale,
        annualLeave,
        overTime
    ) =>
        dispatch(
            postStaff(
                name,
                doB,
                startDate,
                department,
                salaryScale,
                annualLeave,
                overTime
            )
        ),
    fetchStaffs: () => { dispatch(fetchStaffs()) },
    fetchDeps: () => { dispatch(fetchDeps()) },
    fetchSalaries: () => { dispatch(fetchSalaries()) },
    delStaff: (staffId) => { dispatch(delStaff(staffId)) },
    editStaff: (
        id,
        name,
        doB,
        startDate,
        department,
        salaryScale,
        annualLeave,
        overTime
    ) =>
        dispatch(
            editStaff(
                id,
                name,
                doB,
                startDate,
                department,
                salaryScale,
                annualLeave,
                overTime
            )
        ),
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDeps();
        this.props.fetchSalaries();
    }

    render() {

        const StaffWithId = ({ match }) => {
            const staffSelected = this.props.staffs.staffs.filter(
                (staff) => staff.id === parseInt(match.params.id, 10)
            )[0];

            return (
                <StaffInfo
                    delStaff={this.props.delStaff}
                    editStaff={this.props.editStaff}
                    departments={this.props.departments.departments}
                    staffSelected={staffSelected}
                    department={this.props.departments.departments}
                    isLoading={this.props.staffs.isLoading}
                    errMes={this.props.staffs.errMes}
                />
            )
        }

        return (
            <div className="App">
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={500}>
                        <Switch>
                            <Route path='/staff/:id' component={StaffWithId} />
                            <Route exact path='/staffs' component={() =>
                                <Staff
                                    staffs={this.props.staffs.staffs}
                                    departments={this.props.departments.departments}
                                    postStaff={this.props.postStaff}
                                    isLoading={this.props.staffs.isLoading}
                                    errMes={this.props.staffs.errMes}
                                />}
                            />

                            <Route path="/department/:id"
                                component={(match) =>
                                    <DepWithId
                                        match={match}
                                        fetchDepStaffs={this.props.fetchDepStaffs}
                                        depStaffs={this.props.depStaffs}
                                        departments={this.props.departments.departments}
                                    />
                                }
                            />

                            <Route exact path='/departments' component={() =>
                                <Department
                                    departments={this.props.departments.departments}
                                    isLoading={this.props.departments.isLoading}
                                    errMes={this.props.departments.errMes}
                                />}
                            />
                            <Route exact path='/salary' component={() =>
                                <Salary
                                    staffsSalaries={this.props.staffsSalaries.staffsSalaries}
                                    isLoading={this.props.staffsSalaries.isLoading}
                                    errMes={this.props.staffsSalaries.errMes}
                                />}
                            />
                            <Redirect to="/staffs" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));