import axios from "axios";
import storage from "../storage/storage";
const axiosInstance = axios.create({
    baseURL: 'http://10.152.1.136:4000/'
});
export const getResponse = async ({ url,}) => {
    try {
        const { jwt: token } = await storage.load({
            key: 'loginState',
            autoSync: true,
            syncInBackground: true,
        });
        const response = await axiosInstance({
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}
export const getloginData = async () => {
    try {
        const loginData = await storage.load({
            key: 'loginState',
            autoSync: true,
            syncInBackground: true,
        });
        return loginData;
    } catch (error) {
        console.log(error)
    }
}
export default axiosInstance;