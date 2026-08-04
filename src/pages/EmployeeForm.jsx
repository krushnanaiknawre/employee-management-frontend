import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveEmployee, updateEmployee } from "../services/EmployeeService";
function EmployeeForm({
    selectedEmployee,
    setSelectedEmployee,
    setRefresh,
    showForm,
    setShowForm
}) {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [mobile, setMobile] = useState("");
const [department, setDepartment] = useState("");
const [designation, setDesignation] = useState("");
const [salary, setSalary] = useState("");
const [address, setAddress] = useState("");
const [joiningDate, setJoiningDate] = useState("");

const [id, setId] = useState("");

const [errors, setErrors] = useState({});



useEffect(() => {

    if (selectedEmployee != null) {

        setId(selectedEmployee.id);
        setName(selectedEmployee.name);
        setEmail(selectedEmployee.email);
        setMobile(selectedEmployee.mobile);
        setDepartment(selectedEmployee.department);
        setDesignation(selectedEmployee.designation);
        setSalary(selectedEmployee.salary);
        setAddress(selectedEmployee.address);
        setJoiningDate(selectedEmployee.joiningDate);

    }

}, [selectedEmployee]);




function validateForm() {

    let newErrors = {};

    if (name.trim() === "") {
        newErrors.name = "Name is required";
    }

    if (email.trim() === "") {
        newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Enter a valid email";
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        newErrors.mobile = "Mobile must be 10 digits";
    }

    if (department.trim() === "") {
        newErrors.department = "Department is required";
    }

    if (designation.trim() === "") {
        newErrors.designation = "Designation is required";
    }

    if (salary === "" || Number(salary) <= 0) {
        newErrors.salary = "Salary must be greater than 0";
    }

    if (address.trim() === "") {
        newErrors.address = "Address is required";
    }

    if (joiningDate === "") {
        newErrors.joiningDate = "Joining Date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
}


function clearForm() {

    setId("");
    setName("");
    setEmail("");
    setMobile("");
    setDepartment("");
    setDesignation("");
    setSalary("");
    setAddress("");
    setJoiningDate("");

    setErrors({});

    setShowForm(false);

    setSelectedEmployee(null);

}




function handleSubmit(e) {

    e.preventDefault();

    if (!validateForm()) {
    return;
}

    const employee = {
        name,
        email,
        mobile,
        department,
        designation,
        salary,
        address,
        joiningDate
    };

    console.log(employee);

if (id === "") {

    saveEmployee(employee)
        .then((response) => {

            console.log(response.data);

            toast.success("✅ Employee Saved Successfully");

            clearForm();

            setRefresh((prev) => !prev);

            

        })
        .catch((error) => {

    console.log(error);

    if (error.response && error.response.status === 400) {

        setErrors(error.response.data);

    } else {

        toast.error("❌ Failed to Save Employee");

    }

});
} else {

    employee.id = id;

    updateEmployee(employee)
        .then((response) => {

            console.log(response.data);

            toast.info("✏️ Employee Updated Successfully");

            clearForm();

            setRefresh((prev) => !prev);

           

        })
        .catch((error) => {

    console.log(error);

    if (error.response && error.response.status === 400) {

        setErrors(error.response.data);

    } else {

        toast.error("❌ Failed to Update Employee");

    }

});

}

}


    if (!showForm) {
    return null;
}


    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary mb-4">
    {id ? "Update Employee" : "Add Employee"}
</h2>

            

            <form onSubmit={handleSubmit} className="row g-3">
                

               <input
    type="text"
    className="form-control"
    placeholder="Enter Name"
    value={name}
    onChange={(e) => {
    setName(e.target.value);

    setErrors({
        ...errors,
        name: ""
    });
}}
/>

{errors.name && (
    <small className="text-danger">
        {errors.name}
    </small>
)}

               <input
    type="email"
    className="form-control"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => {
    setEmail(e.target.value);

    setErrors({
        ...errors,
        email: ""
    });
}}
/>

{errors.email && (
    <small className="text-danger">
        {errors.email}
    </small>
)}

                <input
    type="text"
    className="form-control"
    placeholder="Enter Mobile"
    value={mobile}
    onChange={(e) => {
    setMobile(e.target.value);

    setErrors({
        ...errors,
        mobile: ""
    });
}}
/>

{errors.mobile && (
    <small className="text-danger">
        {errors.mobile}
    </small>
)}

                <input
    type="text"
    className="form-control"
    placeholder="Enter Department"
    value={department}
    onChange={(e) => {
    setDepartment(e.target.value);

    setErrors({
        ...errors,
        department: ""
    });
}}
/>

{errors.department && (
    <small className="text-danger">
        {errors.department}
    </small>
)}


                <input
    type="text"
    className="form-control"
    placeholder="Enter Designation"
    value={designation}
    onChange={(e) => {
    setDesignation(e.target.value);

    setErrors({
        ...errors,
        designation: ""
    });
}}
/>

{errors.designation && (
    <small className="text-danger">
        {errors.designation}
    </small>
)}


                <input
    type="number"
    className="form-control"
    placeholder="Enter Salary"
    value={salary}
    onChange={(e) => {
    setSalary(e.target.value);

    setErrors({
        ...errors,
        salary: ""
    });
}}
/>

{errors.salary && (
    <small className="text-danger">
        {errors.salary}
    </small>
)}


              <input
    type="text"
    className="form-control"
    placeholder="Enter Address"
    value={address}
    onChange={(e) => {
    setAddress(e.target.value);

    setErrors({
        ...errors,
        address: ""
    });
}}
/>

{errors.address && (
    <small className="text-danger">
        {errors.address}
    </small>
)}


            <input
    type="date"
    className="form-control"
    value={joiningDate}
    onChange={(e) => {
    setJoiningDate(e.target.value);

    setErrors({
        ...errors,
        joiningDate: ""
    });
}}
/>

{errors.joiningDate && (
    <small className="text-danger">
        {errors.joiningDate}
    </small>
)}


            <button
    type="submit"
    className="btn btn-success w-100"
>

    {id === "" ? "Save Employee" : "Update Employee"}

</button>

<button
    type="button"
    className="btn btn-secondary w-100 mt-2"
    onClick={clearForm}
>
    Cancel
</button>

            </form>

        </div>

    );

}

export default EmployeeForm;