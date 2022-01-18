import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';
import dateFormat from "dateformat";

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff })
    }

    renderStaff(staff) {
        if (staff != null) {
            const dateOfBirth = dateFormat(staff.doB, "dd/mm/yyyy")
            const startDate = dateFormat(staff.startDate, "dd/mm/yyyy")

            return (
                <Card>
                    <CardImg src={staff.image} alt={staff.name} />
                    <CardBody>
                        <CardTitle><b>{`Họ và tên: ${staff.name}`}</b></CardTitle>
                        <CardText>{`Ngày sinh: ${dateOfBirth}`}</CardText>
                        <CardText>{`Ngày vào công ty: ${startDate}`}</CardText>
                        <CardText>{`Phòng ban: ${staff.department.name}`}</CardText>
                        <CardText>{`Ngày nghỉ còn lại: ${staff.annualLeave}`}</CardText>
                        <CardText>{`Số ngày đã làm thêm : ${staff.overTime}`}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div>Bấm vào tên nhân viên để xem thông tin.</div>
            )
        }
    }

    render() {
        const staff = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-sm-6 col-md-4 col-xl-2 mt-4">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardTitle className="text-center m-1" heading="true">{staff.name}</CardTitle>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {staff}
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 mt-4">
                        {this.renderStaff(this.state.selectedStaff)}
                    </div>
                </div>
            </div>
        );
    }
}

export default StaffList;