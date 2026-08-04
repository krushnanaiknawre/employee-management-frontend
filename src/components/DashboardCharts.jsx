import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function DashboardCharts({ employees }) {

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF",
        "#FF4560"
    ];

    // Department Wise Data
    const departmentData = [];

    employees.forEach((employee) => {

        const existing = departmentData.find(
            (item) => item.name === employee.department
        );

        if (existing) {
            existing.value++;
        } else {
            departmentData.push({
                name: employee.department,
                value: 1
            });
        }

    });

    // Salary Data
    const salaryData = employees.map((employee) => ({
        name: employee.name,
        salary: employee.salary
    }));

    return (

        <div className="row my-4">

            <div className="col-md-6">

                <div className="card shadow p-3">

                    <h4 className="text-center mb-3">
                        Department Wise Employees
                    </h4>

                    <ResponsiveContainer width="100%" height={350}>

                        <PieChart>

                            <Pie
                                data={departmentData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >

                                {departmentData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />

                                ))}

                            </Pie>

                            <Tooltip />
                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="col-md-6">

                <div className="card shadow p-3">

                    <h4 className="text-center mb-3">
                        Employee Salary
                    </h4>

                    <ResponsiveContainer width="100%" height={350}>

                        <BarChart data={salaryData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="salary"
                                fill="#0d6efd"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;