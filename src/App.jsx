import { useState } from "react";
import Home from "./pages/Home";
import EmployeeForm from "./pages/EmployeeForm";

function App() {

const [selectedEmployee, setSelectedEmployee] = useState(null);
const [showForm, setShowForm] = useState(false);
const [refresh, setRefresh] = useState(false);

  return (
    <div>

    <Home
    setSelectedEmployee={setSelectedEmployee}
    refresh={refresh}
    setShowForm={setShowForm}
/>

      <EmployeeForm
    selectedEmployee={selectedEmployee}
    setSelectedEmployee={setSelectedEmployee}
    refresh={refresh}
    setRefresh={setRefresh}
    showForm={showForm}
    setShowForm={setShowForm}
/>
    </div>
  );
}

export default App;