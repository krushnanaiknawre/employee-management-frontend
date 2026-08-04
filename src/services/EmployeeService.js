import axios from "axios";

const BASE_URL = "http://localhost:8090";

export const getAllEmployees = () => {
    return axios.get(BASE_URL + "/getAllEmployees");
};

export const saveEmployee = (employee) => {
    return axios.post(BASE_URL + "/saveEmployee", employee);
};


export const deleteEmployee = (id) => {
    return axios.delete(BASE_URL + "/deleteEmployee/" + id);
};



export const updateEmployee = (employee) => {
    return axios.put(BASE_URL + "/updateEmployee", employee);
};