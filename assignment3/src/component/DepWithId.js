import React, { Component } from "react";
import DepStaffs from './DepStaffsComponent';
import { fetchDepStaffs } from "../redux/ActionCreator";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    depStaffs: state.depStaffs
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDepStaffs: (depId) => { dispatch(fetchDepStaffs(depId)) },
});

class DepWithId extends Component {

  componentDidMount() {
    const id = this.props.match.match.params.id;
    this.props.fetchDepStaffs(id);
  }

  render() {

    const dep = this.props.departments.filter(
      (dep) => dep.id === this.props.match.match.params.id
    )[0];
    const depName = dep ? dep.name : ''

    return (

      <DepStaffs
        depName={depName}
        depStaffs={this.props.depStaffs}
        fetchDepStaffs={this.props.fetchDepStaffs}
        depId={this.props.depId}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepWithId);