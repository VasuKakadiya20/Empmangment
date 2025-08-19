import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("http://localhost:4000" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const editdata = async (url, updatedata) => {
  const { res } = await axios.put(`http://localhost:4000${url}`, updatedata);
  return res;
};

export const postData = async (url, fromdata) => {
  try {
    const { data } = await axios.post("http://localhost:4000" + url, fromdata);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginData = async (url, formData) => {
  try {
    const { data } = await axios.post("http://localhost:4000" + url, formData);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deletedata = async (url) =>{
  try{
    const {data} = await axios.delete(`http://localhost:4000${url}`);
    return data;
  }catch (error){
    console.error("delete error :" ,error)
    return error;
  }
}


// https://empbackend-ten.vercel.app