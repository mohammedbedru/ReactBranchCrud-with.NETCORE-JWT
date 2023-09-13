import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:7171/api/Branches";

const getAll = () => {
    return axios.get(API_URL,{ headers: authHeader() });
};

const getOne = (id) => {
    return axios.get(API_URL + "/" + id, { headers: authHeader() });
};

const addBranch = (data) => {
    return axios.post(API_URL , data, { headers: authHeader() });
};

const updateBranch = (id, data) => {
    return axios.put(API_URL + "/" + id, data, { headers: authHeader() });
};

const deleteBranch = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};

const UserService = {
    getAll,
    getOne,
    addBranch,
    updateBranch,
    deleteBranch
};

export default UserService;