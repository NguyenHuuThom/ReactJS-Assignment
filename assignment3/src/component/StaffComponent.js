import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardImg,
    CardTitle,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";

// form validation 
const required = (value) => value && value.length > 0;
const maxlength = (len) => (value) => !(value) || (value.length <= len);
const isNumber = (value) => !(value) || !isNaN(Number(value));
const maxnum = (value) => value >= 1 && value <= 3;

const StaffList = ({ staffs, postStaff, isLoading, errMes }) => {
    // set state for name & search for search function
    const [Name, setName] = useState(null);
    const [SEARCH, setSEARCH] = useState(null);

    // set state for doB & startDate
    const [doB, setdoB] = useState('');
    const [startDate, setstartDate] = useState('');

    // set state to toggle add modal
    const [modalOpen, setModalOpen] = useState(false);

    // render full staff list
    const STAFFS = staffs.map((staff) => {
        return (
            <Link
                to={`/staff/${staff.id}`}
                className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
                style={{ textDecoration: "none" }}
                key={staff.id}
            >
                <div key={staff.id}>
                    <Card className="bg-info mt-4">
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
                    </Card>
                </div>
            </Link>
        );
    });

    // render search by name results
    const handleSearch = (event, Name) => {
        event.preventDefault();
        const name = Name.value;
        const X = staffs
            .filter((staff) => {
                if (name === "") {
                    return staff;
                } else {
                    if (staff.name.toLowerCase().includes(name.toLowerCase())) {
                        return staff;
                    }
                }
            })
            .map((staff) => {
                return (
                    <Link
                        to={`/staff/${staff.id}`}
                        className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
                        style={{ textDecoration: "none" }}
                        key={staff.id}
                    >
                        <div key={staff.id}>
                            <Card className="bg-info mt-4">
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardTitle className="text-center m-1 text-white" heading="true">{staff.name}</CardTitle>
                            </Card>
                        </div>
                    </Link>
                );
            });
        setSEARCH(X);
        Name.value = "";
    };

    // handle add submit
    const handleSubmit = (values) => {

        setModalOpen(!modalOpen);

        const isoDate = new Date().toISOString();
        const newTime = isoDate.slice(10);
        const timedDoB = doB !== '' ? doB.concat(newTime) : null;
        const timedStartDate = startDate !== '' ? startDate.concat(newTime) : null;

        postStaff(values.name, timedDoB, timedStartDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime)
    };

    // return part
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>
                {/* Add new button */}
                <div className="col-md-1">
                    <button
                        className="btn btn-primary"
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        <span className="fa fa-plus fa-lg"></span>
                    </button>
                </div>
                {/* Seach form */}
                <div className="col-md-6">
                    <form className="form-inline">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tìm nhân viên theo tên"
                            ref={(input) => {
                                return setName(input);
                            }}
                            className="form-control mr-2 mb-1 mt-1"
                        ></input>
                        <button
                            type="submit"
                            onClick={(event) => handleSearch(event, Name)}
                            className="btn btn-primary"
                        >
                            <span className="fa fa-search fa-lg"></span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Return full staffs list if user has not performed search, return message if there is no search results, return results if there is results */}
            <div className="row">
                {isLoading ? <Loading />
                    : (errMes != null) ? errMes
                        : SEARCH === null ? STAFFS
                            : SEARCH.length === 0 ? "Không tìm thấy nhân viên nào"
                                : SEARCH}
            </div>

            {/* Modal */}

            <div>
                <Modal
                    isOpen={modalOpen}
                    toggle={(modalOpen) => setModalOpen(!modalOpen)}
                >
                    <ModalHeader
                        isOpen={modalOpen}
                        toggle={(modalOpen) => setModalOpen(!modalOpen)}
                    >
                        Thêm nhân viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm
                            onSubmit={(values) => {
                                handleSubmit(values);
                            }}
                        >
                            <FormGroup>
                                <Label htmlFor="name" >
                                    Họ và tên
                                </Label>

                                <Control.text
                                    model=".name"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    validators={{ required, maxLength: maxlength(15) }}
                                ></Control.text>
                                <Errors
                                    model=".name"
                                    show={(field) => field.touched && !field.focus}
                                    messages={{
                                        required: "Vui lòng nhập đầy đủ thông tin!",
                                        maxLength: "Hãy nhập dưới 15 ký tự.",
                                    }}
                                    className="text-danger"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="doB" >
                                    Ngày sinh
                                </Label>

                                <Input
                                    type="date"
                                    id="doB"
                                    name="doB"
                                    value={doB}
                                    onChange={(event) => {
                                        return setdoB(event.target.value);
                                    }}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="startDate" >
                                    Ngày vào công ty
                                </Label>

                                <Input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(event) => {
                                        return setstartDate(event.target.value);
                                    }}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="departmentId" >
                                    Phòng ban
                                </Label>

                                <Control.select
                                    model=".departmentId"
                                    id="departmentId"
                                    name="departmentId"
                                    className="form-control"
                                    defaultValue="Dept01"
                                >
                                    <option value="Dept04">IT</option>
                                    <option value="Dept02">HR</option>
                                    <option value="Dept01">Sale</option>
                                    <option value="Dept05">Finance</option>
                                    <option value="Dept03">Marketing</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="salaryScale" >
                                    Hệ số lương
                                </Label>

                                <Control.text
                                    model=".salaryScale"
                                    id="salaryScale"
                                    name="salaryScale"
                                    className="form-control"
                                    validators={{ required, isNumber, maxnum }}
                                ></Control.text>
                                <Errors
                                    model=".salaryScale"
                                    show={(field) => field.touched && !field.focus}
                                    messages={{
                                        required: "Vui lòng nhập đầy đủ thông tin!",
                                        isNumber: "Hãy nhập số",
                                        maxnum: "Hãy nhập số nhỏ hơn hoặc bằng 3",
                                    }}
                                    className="text-danger"
                                ></Errors>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="annualLeave" >
                                    Số ngày nghỉ còn lại
                                </Label>

                                <Control.text
                                    model=".annualLeave"
                                    id="annualLeave"
                                    name="annualLeave"
                                    className="form-control"
                                    validators={{ required, isNumber }}
                                ></Control.text>
                                <Errors
                                    model=".annualLeave"
                                    show={(field) => field.touched && !field.focus}
                                    messages={{
                                        required: "Vui lòng nhập đầy đủ thông tin!",
                                        isNumber: "Hãy nhập số",
                                    }}
                                    className="text-danger"
                                ></Errors>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="overTime" >
                                    Số giờ làm thêm
                                </Label>

                                <Control.text
                                    model=".overTime"
                                    id="overTime"
                                    name="overTime"
                                    className="form-control"
                                    validators={{ required, isNumber }}
                                ></Control.text>
                                <Errors
                                    model=".overTime"
                                    show={(field) => field.touched && !field.focus}
                                    messages={{
                                        required: "Vui lòng nhập đầy đủ thông tin!",
                                        isNumber: "Hãy nhập số",
                                    }}
                                    className="text-danger"
                                ></Errors>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" className="btn btn-info">
                                    Thêm nhân viên
                                </Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
};

export default StaffList;