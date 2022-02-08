import React from 'react';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";

function RenderStaffSalary({ staff }) {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    const salary = (staff.salaryScale * basicSalary) + (staff.overTime * overTimeSalary);

    return (
        <Card className="bg-info text-white">
            <CardTitle className="ml-2 m-1 mt-2" heading="true"><b>{staff.name}</b></CardTitle>
            <CardText className="ml-2 m-1">{`Mã nhân viên: ${staff.id}`}</CardText>
            <CardText className="ml-2 m-1">{`Hệ số lương: ${staff.salaryScale}`}</CardText>
            <CardText className="ml-2 m-1">{`Số giờ làm thêm: ${staff.overTime}`}</CardText>
            <CardText className="ml-2 m-1">{`Lương: ${salary}`}</CardText>
        </Card>
    )
}

function Salary(props) {
    const staffs = (props.staffsSalaries).map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
                <RenderStaffSalary staff={staff} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {staffs}
            </div>
        </div>
    );
}

export default Salary;