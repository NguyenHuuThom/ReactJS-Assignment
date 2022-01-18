import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardTitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaffList({ staff, onClick }) {
    return (
        <Card className="bg-info">
            <Link to={`/staffs/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
            </Link>
        </Card>
    )
}

const Staffs = (props) => {
    const staff = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 col-xl-2 mt-4">
                <RenderStaffList staff={staff} onClick={props.onClick} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {staff}
            </div>
        </div>
    );
}

export default Staffs