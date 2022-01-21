import React, {useState} from 'react';
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

    const [staffs, setStaffs] = useState(() => {
        return props.staffs
    })

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

            return newStaffs
        })
        console.log(newStaff)

    }

    const handleSearch = (event) => {
        event.preventDefault();
        let searchname = this.searchname.value.toLowerCase()
        const staffsearch = staffs.filter(staff => staff.name.toLowerCase().split(' ').find(item => item === searchname) !== undefined);
        if(staffsearch.length > 0) {
            setStaffs(staffsearch)
        } else { setStaffs(staffs) }
        console.log(staffsearch);
        this.searchname.value = '';
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
                        <Form onSubmit={handleAdd}>
                            <FormGroup>
                                <Label htmlFor="name">Họ tên</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="dateofbirt">Ngày sinh</Label>
                                <Input value={dateofbirt} onChange={(e) => setDateofbirt(e.target.value)} type="date" id="dateofbirt" name="dateofbirt" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="startdate">Ngày vào công ty</Label>
                                <Input value={startdate} onChange={(e) => setStartdate(e.target.value)} type="date" id="startdate" name="startdate" required />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="department">Phòng ban</Label>
                                <Input value={department} onChange={(e) => setDepartment(e.target.value)} type="select" id="department" name="department" required
                                >
                                    <option >Sale</option>
                                    <option >IT</option>
                                    <option >HR</option>
                                    <option >Finance</option>
                                    <option >Marketing</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="scalesalary">Hệ số lương</Label>
                                <Input value={scalesalary} onChange={(e) => setScalesalary(e.target.value)} type="text" id="scalesalary" name="scalesalary" required />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="halowin">Ngày nghỉ còn lại</Label>
                                <Input value={halowin} onChange={(e) => setHalowin(e.target.value)} type="text" id="halowin" name="halowin" required />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="overtime">Số giờ đã làm thêm</Label>
                                <Input value={overtime} onChange={(e) => setOvertime(e.target.value)} type="text" id="overtime" name="overtime" required/>
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
                                innerRef={(input) => this.searchname = input}
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