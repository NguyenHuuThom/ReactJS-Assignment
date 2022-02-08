import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button, CardImg, Modal, ModalBody, ModalHeader, FormGroup, Label, Col, Input, Card, CardGroup, CardText, CardTitle } from "reactstrap";
import { Link, withRouter } from 'react-router-dom';
import dateFormat from "dateformat";
import { Loading } from './LoadingComponent';
import { LocalForm, Errors, Control } from "react-redux-form";
import { FadeTransform } from 'react-animation-components'

const required = (value) => value && value.length > 0;
const maxlength = (len) => (value) => !(value) || (value.length <= len);
const isNumber = (value) => !(value) || !isNaN(Number(value));

class Staff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen1: false,
            modalOpen2: false,
            startDate: '',
            doB: '',
        }

        this.setModalOpen1 = this.setModalOpen1.bind(this);
        this.setModalOpen2 = this.setModalOpen2.bind(this);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.setdoB = this.setdoB.bind(this);
        this.setstartDate = this.setstartDate.bind(this);
    }

    componentDidMount() {
        const oldDoB = this.props.staffSelected ? this.props.staffSelected.doB ? this.props.staffSelected.doB.slice(0, 10) : '' : '';
        const oldStartDate = this.props.staffSelected ? this.props.staffSelected.startDate ? this.props.staffSelected.startDate.slice(0, 10) : '' : '';

        this.setdoB(oldDoB);
        this.setstartDate(oldStartDate);
    }

    // toggle confirm popup
    setModalOpen1() {
        this.setState({
            modalOpen1: !this.state.modalOpen1
        })
    }

    // toggle edit popup
    setModalOpen2() {
        this.setState({
            modalOpen2: !this.state.modalOpen2
        })
    }

    // handle click no on confirm popup
    handleClickNo() {
        this.setModalOpen1();
    }

    // handle click yes on confirm popup
    handleClickYes(staff) {
        this.props.delStaff(staff.id);
        this.props.history.push("/")
    }

    //setdoB
    setdoB(value) {
        this.setState({
            doB: value
        })
    }

    //setstartDate
    setstartDate(value) {
        this.setState({
            startDate: value
        })
    }

    // edit staff info
    handleSubmitEdit(values) {
        const isoDate = new Date().toISOString();
        const newTime = isoDate.slice(10);

        const timedDoB = this.state.doB !== '' ? this.state.doB.concat(newTime) : null;
        const timedStartDate = this.state.startDate !== '' ? this.state.startDate.concat(newTime) : null;

        this.props.editStaff(this.props.staffSelected.id, values.name, timedDoB, timedStartDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime);
        this.setModalOpen2();
    }

    // render staff information in case a staff is selected, return empty div if none is selected
    renderStaff(staff) {
        const department = this.props.departments.filter(
            (dep) => dep.id === staff.departmentId
        )[0];
        const depName = department ? department.name : '';

        return (
            <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                <CardGroup>
                    <Card className="bg-info p-2 col-sm-4 col-md-3 col-lg-4 m-0" >
                        <CardImg src={staff.image} alt={staff.name} />
                    </Card>
                    <Card className="bg-info text-white p-2">
                        <CardTitle><b>{`Họ và tên: ${staff.name}`}</b></CardTitle>
                        <CardText>{`Ngày sinh: ${staff.doB ? dateFormat(staff.doB, "dd/mm/yyyy") : 'N/A'}`}</CardText>
                        <CardText>{`Ngày vào công ty: ${staff.startDate ? dateFormat(staff.startDate, "dd/mm/yyyy") : 'N/A'}`}</CardText>
                        <CardText>{`Phòng ban: ${depName}`}</CardText>
                        <CardText>{`Ngày nghỉ còn lại: ${staff.annualLeave}`}</CardText>
                        <CardText>{`Số giờ đã làm thêm : ${staff.overTime}`}</CardText>
                        <button
                            className="btn btn-danger"
                            onClick={this.setModalOpen1}
                        >
                            Xóa nhân viên
                        </button>

                        <button
                            className="btn btn-warning text-white mt-3"
                            onClick={this.setModalOpen2}
                        >
                            Sửa thông tin
                        </button>
                    </Card>
                </CardGroup>
            </FadeTransform>
        );
    }

    render() {
        let rendered = <div></div>;
        let name = <div></div>;

        const oldDoB = this.props.staffSelected ? this.props.staffSelected.doB ? this.props.staffSelected.doB.slice(0, 10) : '' : '';
        const oldStartDate = this.props.staffSelected ? this.props.staffSelected.startDate ? this.props.staffSelected.startDate.slice(0, 10) : '' : '';

        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="FormGroup">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.errMes != null) {
            return (
                <div className="container">
                    <div className="FormGroup">
                        {this.props.errMes}
                    </div>
                </div>
            )
        } else if (this.props.staffSelected) {
            rendered = this.renderStaff(this.props.staffSelected);
            name = this.props.staffSelected.name;
        }

        return (
            <div className="container">

                {/* Breadcrumb */}
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <h1 className="pb-3 text-dark">Thông tin nhân viên</h1>

                <div>{rendered}</div>

                <div className="FormGroup">
                    <Link to="/" className="col-12 pt-3">
                        &#8592; Trở về Danh sách nhân viên
                    </Link>
                </div>

                {/* Confirm popup */}
                <div>
                    <Modal
                        isOpen={this.state.modalOpen1}
                        toggle={this.setModalOpen1}
                    >
                        <ModalHeader isOpen={this.state.modalOpen1}
                            toggle={this.setModalOpen1}>Xóa nhân viên {this.props.staffSelected.name}, mã nhân viên {this.props.staffSelected.id} ?</ModalHeader>
                        <ModalBody>

                            <button className="btn btn-info mt-1" onClick={() => this.handleClickYes(this.props.staffSelected)}>Xóa</button> <button className="btn btn-info mt-1 ml-1" onClick={this.handleClickNo}>Không</button>
                        </ModalBody>
                    </Modal>
                </div>

                {/* Edit popup */}
                <div>
                    <Modal
                        isOpen={this.state.modalOpen2}
                        toggle={this.setModalOpen2}
                    >
                        <ModalHeader
                            isOpen={this.state.modalOpen12}
                            toggle={this.setModalOpen2}
                        >
                            Thay đổi thông tin nhân viên
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm
                                onSubmit={(values) => this.handleSubmitEdit(values)}
                            >
                                <FormGroup>
                                    <Label htmlFor="name">
                                        Họ và tên
                                    </Label>

                                    <Control.text
                                        model=".name"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        validators={{ required, maxLength: maxlength(15) }}
                                        defaultValue={this.props.staffSelected.name}
                                    ></Control.text>
                                    <Errors
                                        model=".name"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            required: "Yêu cầu nhập.",
                                            maxLength: "Hãy nhập dưới 15 ký tự.",
                                        }}
                                        className="text-danger"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="doB">
                                        Ngày sinh
                                    </Label>

                                    <Input
                                        type="date"
                                        id="doB"
                                        name="doB"
                                        onChange={(event) => {
                                            return this.setdoB(event.target.value);
                                        }}
                                        defaultValue={oldDoB}
                                    ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="startDate">
                                        Ngày vào công ty
                                    </Label>

                                    <Input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        onChange={(event) => {
                                            return this.setstartDate(event.target.value);
                                        }}
                                        defaultValue={oldStartDate}
                                    ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="departmentId">
                                        Phòng ban
                                    </Label>

                                    <Control.select
                                        model=".departmentId"
                                        id="departmentId"
                                        name="departmentId"
                                        className="form-control"
                                        defaultValue={this.props.staffSelected.departmentId}
                                    >
                                        <option value="Dept04">IT</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept05">Finance</option>
                                        <option value="Dept03">Marketing</option>
                                    </Control.select>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="salaryScale">
                                        Hệ số lương
                                    </Label>

                                    <Control.text
                                        model=".salaryScale"
                                        id="salaryScale"
                                        name="salaryScale"
                                        className="form-control"
                                        validators={{ isNumber }}
                                        defaultValue={this.props.staffSelected.salaryScale}
                                    ></Control.text>
                                    <Errors
                                        model=".salaryScale"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            isNumber: "Hãy nhập số.",
                                        }}
                                        className="text-danger"
                                    ></Errors>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="annualLeave">
                                        Số ngày nghỉ còn lại
                                    </Label>

                                    <Control.text
                                        model=".annualLeave"
                                        id="annualLeave"
                                        name="annualLeave"
                                        className="form-control"
                                        validators={{ isNumber }}
                                        defaultValue={this.props.staffSelected.annualLeave}
                                    ></Control.text>
                                    <Errors
                                        model=".annualLeave"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            isNumber: "Hãy nhập số.",
                                        }}
                                        className="text-danger"
                                    ></Errors>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="overTime">
                                        Số giờ làm thêm
                                    </Label>

                                    <Control.text
                                        model=".overTime"
                                        id="overTime"
                                        name="overTime"
                                        className="form-control"
                                        validators={{ isNumber }}
                                        defaultValue={this.props.staffSelected.overTime}
                                    ></Control.text>
                                    <Errors
                                        model=".overTime"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            isNumber: "Hãy nhập số.",
                                        }}
                                        className="text-danger"
                                    ></Errors>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" className="btn btn-info">
                                        Sửa thông tin
                                    </Button>
                                </FormGroup>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default withRouter(Staff);