import axiosLib from "axios";
import { apiUrl } from "../config";

const axios = axiosLib.create({
  baseURL: apiUrl,
});

export default axios;
