import React, { Component } from "react";
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { FadeTransform } from 'react-animation-components'

class DepStaffs extends Component {

  render() {
    const STAFFS = this.props.depStaffs.depStaffs.map((staff) => {
      return (
        <Link
          to={`/staff/${staff.id}`}
          className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
          style={{ textDecoration: "none" }} key={staff.id}
        >
          <div>
            <Card className="bg-info">
              <CardImg width="100%" src={staff.image} alt={staff.name} />
              <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
            </Card>
          </div>
        </Link>
      );
    });

    return (
      <div className="container">
        <h1 className="pb-3 text-dark">Danh sách nhân viên phòng ban {this.props.depName} </h1>

        <div>
          <p>
            * Bấm vào tên nhân viên để xem thông tin.
          </p>
        </div>
        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
          <div className="row">
            {this.props.depStaffs.isLoading ? <Loading />
              : this.props.depStaffs.errMes != null ? this.props.depStaffs.errMes
                : STAFFS}
          </div>
        </FadeTransform>
      </div>
    );
  }
}

export default DepStaffs;
