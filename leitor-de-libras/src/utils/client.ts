import api from "../constants/api.json";
import axios from "axios";

export default axios.create({ baseURL: api.address });
