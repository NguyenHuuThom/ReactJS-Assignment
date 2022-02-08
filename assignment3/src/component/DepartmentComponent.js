import React from 'react';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';

function RenderDepartment({ department }) {
    return (
        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>

            <Card className="bg-info text-white">
                <CardTitle className=" mt-2 m-1" heading="true"><b>{department.name}</b></CardTitle>
                <CardText className=" m-1">{`Số lượng nhân viên: ${department.numberOfStaff}`}</CardText>
            </Card>

        </FadeTransform>
    )
}

function Department(props) {
    const departments = props.departments.map((department) => {
        return (
            <div key={department.id} className=" col-12 col-md-6 col-lg-4 mt-4">
                <Link style={{ textDecoration: "none" }} to={`/department/${department.id}`}>
                    <RenderDepartment department={department} />
                </Link>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Phòng ban</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {departments}
            </div>
        </div>
    );
}

export default Department;