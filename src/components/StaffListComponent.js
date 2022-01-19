import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardTitle, CardImg, Button, FormGroup, Input, Form, Col } from 'reactstrap';
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

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Form className="ml-auto mt-4" onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Col md={12} className='d-flex'>
                        <Input
                            type="text"
                            id="searchname"
                            name="searchname"
                            placeholder="Tìm theo tên"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <Button
                            className='ml-2'
                            outline
                            type="submit"
                            value="submit"
                            color="primary"
                        >
                            <span className="fa fa-search fa-lg"></span>
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
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
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>

                <NameForm props={props} />
            </div>
            <div className="row">
                {staff}
            </div>
        </div>
    );
}

export default StaffList