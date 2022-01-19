import React from 'react';
import { Card, CardGroup, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

function RenderStaff(staff) {
    const dateOfBirth = dateFormat(staff.staff.doB, "dd/mm/yyyy")
    const startDate = dateFormat(staff.staff.startDate, "dd/mm/yyyy")
    return (
        <CardGroup>
            <Card className="bg-info p-2 col-sm-4 col-md-3 col-lg-4 m-0" >
                <CardImg src={staff.staff.image} alt={staff.staff.name} />
            </Card>
            <Card className="bg-info text-white p-2">
                <CardTitle><b>{`Họ và tên: ${staff.staff.name}`}</b></CardTitle>
                <CardText>{`Ngày sinh: ${dateOfBirth}`}</CardText>
                <CardText>{`Ngày vào công ty: ${startDate}`}</CardText>
                <CardText>{`Phòng ban: ${staff.staff.department.name}`}</CardText>
                <CardText>{`Ngày nghỉ còn lại: ${staff.staff.annualLeave}`}</CardText>
                <CardText>{`Số giờ đã làm thêm : ${staff.staff.overTime}`}</CardText>
            </Card>
        </CardGroup>
    );
}

const StaffInfo = (props) => {
    if (props.staff != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 m-1">
                        <RenderStaff staff={props.staff} />
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}

export default StaffInfo;