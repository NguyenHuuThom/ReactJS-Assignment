import React, { Component } from 'react';
import { Card, p, CardBody, CardTitle, CardImg } from 'reactstrap';
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
                <div className="col">
                    <Card className="col-12 col-md-12 col-lg-6 mt-3 bg-primary">
                        <div className="d-flex text-white">
                            <div className="m-2 mt-3">
                                <img src={staff.image} alt={staff.name} />
                            </div>
                            <div className="m-2">
                                <h5><b>{`Họ và tên: ${staff.name}`}</b></h5>
                                <p>{`Ngày sinh: ${dateOfBirth}`}</p>
                                <p>{`Ngày vào công ty: ${startDate}`}</p>
                                <p>{`Phòng ban: ${staff.department.name}`}</p>
                                <p>{`Ngày nghỉ còn lại: ${staff.annualLeave}`}</p>
                                <p>{`Số ngày đã làm thêm : ${staff.overTime}`}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )
        }
        else {
            return (
                <div className="m-3">Bấm vào tên nhân viên để xem thông tin.</div>
            )
        }
    }

    render() {
        const staff = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-sm-6 col-md-4 col-xl-2 mt-4">
                    <Card onClick={() => this.onStaffSelect(staff)} className="bg-primary">
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
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
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        );
    }
}

export default StaffList;