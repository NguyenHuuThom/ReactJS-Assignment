import React from 'react';
import { Card, CardTitle, } from 'reactstrap';

function RenderStaffList({ staff }) {
    return (
        <Card className="btn-linkedin">
            <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
        </Card>
    )
}

const StaffList = (props) => {
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
                {staff}
            </div>
        </div>
    );
}

export default StaffList