import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../css/Home.css";
import DashboardCharts from "../components/DashboardCharts";
import { getAllEmployees, deleteEmployee } from "../services/EmployeeService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";



    function Home({ setSelectedEmployee, refresh, setShowForm }) {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;

      

    useEffect(() => {
    loadEmployees();
}, [refresh]);









   function loadEmployees() {

    setLoading(true);

    getAllEmployees()
        .then((response) => {

            console.log(response.data);

            setEmployees(response.data);

            setLoading(false);

        })
        .catch((error) => {

            console.log(error);

            setLoading(false);

        });

}








       function handleEdit(employee) {

    console.log(employee);

    setSelectedEmployee(employee);

    setShowForm(true);

}






    function handleDelete(id) {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel"
    }).then((result) => {

        if (result.isConfirmed) {

            deleteEmployee(id)
                .then((response) => {

                    console.log(response.data);

                    toast.success("🗑 Employee Deleted Successfully");

                    loadEmployees();

                })
                .catch((error) => {

                    console.log(error);

                    toast.error("❌ Failed to Delete Employee");

                });

        }

    });

}



function exportToExcel() {

    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const data = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
    );

    saveAs(data, "Employee_List.xlsx");
}




function exportToPDF() {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Management System", 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [[
            "ID",
            "Name",
            "Email",
            "Mobile",
            "Department",
            "Designation",
            "Salary",
            "Address",
            "Joining Date"
        ]],

        body: filteredEmployees.map(employee => [
            employee.id,
            employee.name,
            employee.email,
            employee.mobile,
            employee.department,
            employee.designation,
            employee.salary,
            employee.address,
            employee.joiningDate
        ])
    });

    doc.save("Employee_List.pdf");

}



    const filteredEmployees = employees.filter((employee) =>



    employee.name.toLowerCase().includes(search.toLowerCase()) ||

    employee.email.toLowerCase().includes(search.toLowerCase()) ||

    employee.mobile.includes(search) ||

    employee.department.toLowerCase().includes(search.toLowerCase()) ||

    employee.designation.toLowerCase().includes(search.toLowerCase()) ||

    employee.address.toLowerCase().includes(search.toLowerCase())

);


if (sortOption === "nameAsc") {
    filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
}

if (sortOption === "nameDesc") {
    filteredEmployees.sort((a, b) => b.name.localeCompare(a.name));
}

if (sortOption === "salaryAsc") {
    filteredEmployees.sort((a, b) => a.salary - b.salary);
}

if (sortOption === "salaryDesc") {
    filteredEmployees.sort((a, b) => b.salary - a.salary);
}


const sortedEmployees = [...filteredEmployees];

const lastIndex = currentPage * recordsPerPage;
const firstIndex = lastIndex - recordsPerPage;

const currentEmployees = sortedEmployees.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(sortedEmployees.length / recordsPerPage);



const totalEmployees = employees.length;

const totalITEmployees = employees.filter(
    (employee) => employee.department.toLowerCase() === "it"
).length;

const totalSalary = employees.reduce(
    (sum, employee) => sum + Number(employee.salary),
    0
);



const averageSalary =
    employees.length > 0
        ? Math.round(totalSalary / employees.length)
        : 0;




    return (
  <div className="container mt-4">
    <h1 className="text-center text-primary fw-bold mb-4">Employee Management System</h1>


<div className="row mb-4">

    <div className="col-md-3">
        <div className="card text-white bg-primary shadow dashboard-card">
            <div className="card-body text-center">
                <h5>
    <i className="bi bi-people-fill me-2"></i>
    Total Employees
</h5>
                <h2>{totalEmployees}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-3">
           <div className="card text-white bg-success shadow dashboard-card">
            <div className="card-body text-center">
                <h5>
    <i className="bi bi-pc-display me-2"></i>
    IT Employees
</h5>
                <h2>{totalITEmployees}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-white bg-warning shadow dashboard-card">
            <div className="card-body text-center">
                <h5>
    <i className="bi bi-currency-rupee me-2"></i>
    Total Salary
</h5>
                <h2>₹{totalSalary.toLocaleString("en-IN")}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-white bg-danger shadow dashboard-card">
            <div className="card-body text-center">
                <h5>
    <i className="bi bi-graph-up-arrow me-2"></i>
    Average Salary
</h5>
                <h2>₹{averageSalary.toLocaleString("en-IN")}</h2>
            </div>
        </div>
    </div>

</div>



<DashboardCharts employees={employees} />


<div className="row mb-3 g-3 align-items-center">
    

    <div className="col-12 col-md-3 d-flex gap-2 flex-wrap">

    <button
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
    >
        <i className="bi bi-person-plus-fill me-2"></i>
        Add Employee
    </button>

    <button
        className="btn btn-success"
        onClick={exportToExcel}
    >
        <i className="bi bi-file-earmark-excel-fill me-2"></i>
        Export
    </button>


    <button
    className="btn btn-danger"
    onClick={exportToPDF}
>
    <i className="bi bi-file-earmark-pdf-fill me-2"></i>
    PDF
</button>



</div>

    <div className="col-12 col-md-7">

    <div className="input-group">

        <span className="input-group-text">
            🔍
        </span>

        <input
            type="text"
            className="form-control"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
            <button
                className="btn btn-outline-secondary"
                onClick={() => setSearch("")}
            >
                ❌
            </button>
        )}

    </div>

    <p className="mt-2 text-muted fw-bold">
        Showing {filteredEmployees.length} of {employees.length} Employees
    </p>

</div>

        <div className="col-12 col-md-2">
        <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
        >
            <option value="">Sort Employees</option>
            <option value="nameAsc">Name (A → Z)</option>
            <option value="nameDesc">Name (Z → A)</option>
            <option value="salaryAsc">Salary (Low → High)</option>
            <option value="salaryDesc">Salary (High → Low)</option>
        </select>
    </div>

</div>




{
    loading ? (
        <div className="text-center my-5">
            <div
                className="spinner-border text-primary"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>

            <p className="mt-3 fw-bold">
                Loading Employees...
            </p>
        </div>
    ) : (


<>

    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Salary</th>
          <th>Address</th>
          <th>Joining Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>


            {currentEmployees.map((employee) => (

          <tr key={employee.id}>

            <td>{employee.id}</td>

            <td>{employee.name}</td>

            <td>{employee.email}</td>

            <td>{employee.mobile}</td>

            <td>{employee.department}</td>

            <td>{employee.designation}</td>

            <td>{employee.salary}</td>

            <td>{employee.address}</td>

            <td>{employee.joiningDate}</td>

            <td>

             <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => handleEdit(employee)}
>
    Edit
</button>             

           

    <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(employee.id)}
>
    Delete
</button>

         
</td>

          </tr>

        ))}


        {filteredEmployees.length === 0 && (
    <tr>
        <td colSpan="10" className="text-center text-danger fw-bold">
            No Employee Found
        </td>
    </tr>
)}

      </tbody>

    </table>


<div
    className="d-flex flex-wrap justify-content-center justify-content-md-between align-items-center gap-2 mt-3"
>

    <button
        className="btn btn-primary"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
    >
        ⬅ Previous
    </button>

    <div className="d-flex flex-wrap justify-content-center">

        {[...Array(totalPages)].map((_, index) => (

            <button
                key={index}
                className={`btn mx-1 ${
                    currentPage === index + 1
                        ? "btn-primary"
                        : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </button>

        ))}

    </div>

    <button
        className="btn btn-primary"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
    >
        Next ➡
    </button>

</div>


</>
)

}

  </div>
);

}

export default Home;