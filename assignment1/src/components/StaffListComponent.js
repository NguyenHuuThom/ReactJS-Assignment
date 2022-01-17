import React from 'react';
import { Card, CardTitle, } from 'reactstrap';

const Staff = (props) => {
    const staff = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 col-xl-2 mt-4">
                <Card>
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
        </div>
    );
}

export default Staff