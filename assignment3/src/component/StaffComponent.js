import React, { useState } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Label, Button, Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, } from 'reactstrap';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors, } from 'react-redux-form';


function RenderStaffList({ staff, onClick, }) {
    return (
        <Card className="bg-info">
            <Link to={`/staff/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
            </Link>
        </Card>
    )
}

const Staffs = (props) => {
    const storageStaffs = JSON.parse(localStorage.getItem('staffs'))

    const [staffs, setStaffs] = useState(storageStaffs || props.staffs);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }

    const [name, setName] = useState('')
    const [dateofbirt, setDateofbirt] = useState('')
    const [startdate, setStartdate] = useState('')
    const [department, setDepartment] = useState('Sale')
    const [scalesalary, setScalesalary] = useState('')
    const [halowin, setHalowin] = useState('')
    const [overtime, setOvertime] = useState('')

    // set state for touch
    const [touchName, settouchName] = useState(false);
    const [touchdoB, settouchdoB] = useState(false);
    const [touchstartDate, settouchstartDate] = useState(false);
    const [touchsalaryScale, settouchsalaryScale] = useState(false);
    const [touchannualLeave, settouchannualLeave] = useState(false);
    const [touchoverTime, settouchoverTime] = useState(false);

    // form validation

    const validate = (name, doB, startDate, salaryScale, annualLeave, overTime) => {
        const error = {
            name: "",
            doB: "",
            startDate: "",
            department: "",
            salaryScale: "",
            annualLeave: "",
            overTime: "",
        };

        if (touchName && name.length > 20) {
            error.name = "Vui lòng nhập tên dưới 20 ký tự";
        }

        if (touchsalaryScale && isNaN(salaryScale)) {
            error.salaryScale = "Vui lòng nhập giá trị số từ 1 -> 3";
        }

        if (salaryScale < 0 || salaryScale > 3) {
            error.salaryScale = "Vui lòng nhập giá trị số từ 1 -> 3";
        }

        if (touchannualLeave && isNaN(annualLeave)) {
            error.annualLeave = "Vui lòng nhập giá trị số";
        }

        if (touchoverTime && isNaN(overTime)) {
            error.overTime = "Vui lòng nhập giá trị số";
        }

        return error;
    };

    const error = validate(name, dateofbirt, startdate, scalesalary, halowin, overtime)

    const handleAdd = (event) => {
        event.preventDefault();
        toggleModal()

        const newStaff = {
            id: staffs.length,
            name: name,
            doB: dateofbirt,
            startDate: startdate,
            department: department,
            salaryScale: scalesalary,
            annualLeave: halowin,
            overTime: overtime,
            image: '/assets/images/alberto.png',
        }


        setStaffs(prev => {
            const newStaffs = [...prev, newStaff]

            //save to local storage
            const jsonStaffs = JSON.stringify(newStaffs)
            localStorage.setItem('staffs', jsonStaffs)

            return storageStaffs || newStaffs
        })

        console.log(newStaff);
    }

    let searchnameee;
    const handleSearch = (event) => {
        event.preventDefault();
        const searchname = searchnameee.value.toLowerCase()
        const staffsearch = (storageStaffs || staffs).filter(staff => staff.name.toLowerCase().split(' ').find(item => item === searchname) !== undefined);
        console.log(staffsearch);
        setStaffs(staffsearch)
    }

    const staff = (staffs).map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 col-xl-2 mt-4">
                <RenderStaffList staff={staff} onClick={props.onClick} />
            </div>
        );
    })

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>


                <Button outline onClick={toggleModal} color="primary">
                    <span className="fa fa fa-plus fa-lg"></span>
                </Button>
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(value) => handleAdd(value)}>
                            <FormGroup>
                                <Label htmlFor="name">Họ tên</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required onBlur={(touch) => { return settouchName(true) }} />
                                <p className="text-danger">{error.name}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="dateofbirt">Ngày sinh</Label>
                                <Input value={dateofbirt} onChange={(e) => setDateofbirt(e.target.value)} type="date" id="dateofbirt" name="dateofbirt" required onBlur={(touch) => { return settouchdoB(true) }} />

                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="startdate">Ngày vào công ty</Label>
                                <Input value={startdate} onChange={(e) => setStartdate(e.target.value)} type="date" id="startdate" name="startdate" required onBlur={(touch) => { return settouchstartDate(true) }} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="department">Phòng ban</Label>
                                <Input value={department} onChange={(e) => setDepartment(e.target.value)} type="select" id="department" name="department" required >
                                    <option >Sale</option>
                                    <option >IT</option>
                                    <option >HR</option>
                                    <option >Finance</option>
                                    <option >Marketing</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="scalesalary">Hệ số lương</Label>
                                <Input value={scalesalary} onChange={(e) => setScalesalary(e.target.value)} type="text" id="scalesalary" name="scalesalary" required onBlur={(touch) => { return settouchsalaryScale(true) }} />
                                <p className="text-danger">{error.salaryScale}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="halowin">Ngày nghỉ còn lại</Label>
                                <Input value={halowin} onChange={(e) => setHalowin(e.target.value)} type="text" id="halowin" name="halowin" required onBlur={(touch) => { return settouchannualLeave(true) }} />
                                <p className="text-danger">{error.annualLeave}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="overtime">Số giờ đã làm thêm</Label>
                                <Input value={overtime} onChange={(e) => setOvertime(e.target.value)} type="text" id="overtime" name="overtime" required onBlur={(touch) => { return settouchoverTime(true) }} />
                                <p className="text-danger">{error.overTime}</p>
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Thêm mới</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Form className="ml-auto mt-4" onSubmit={handleSearch}>
                    <FormGroup row>
                        <Col md={12} className='d-flex'>
                            <Input
                                type="text"
                                id="searchname"
                                name="searchname"
                                placeholder="Tìm theo tên"
                                innerRef={(input) => (searchnameee = input)}
                            />
                            <Button
                                className='ml-2'
                                outline
                                type="submit"
                                value="submit"
                                color="primary">
                                <span className="fa fa-search fa-lg"></span>
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
            <div className="row">
                {staff}
            </div>
        </div>
    );
}

export default Staffs