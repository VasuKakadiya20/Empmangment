import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("https://empmangment-backend.onrender.com" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const editdata = async (url, updatedata) => {
  const { res } = await axios.put(`https://empmangment-backend.onrender.com${url}`, updatedata);
  return res;
};

// export const postData = async (url, fromdata) => {
//   try {
//     const { data } = await axios.post("https://empmangment-backend.onrender.com" + url, fromdata);
//     return data;
//   } catch (error) {
//     console.error("POST Error:", error.response?.data || error.message);
//     throw error;
//   }
// };
export const postData = async (url, formData, isFormData = false) => {
  try {
    const config = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };

    const { data } = await axios.post("https://empmangment-backend.onrender.com" + url, formData, config);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginData = async (url, formData) => {
  try {
    const { data } = await axios.post("https://empmangment-backend.onrender.com" + url, formData);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deletedata = async (url) =>{
  try{
    const {data} = await axios.delete(`https://empmangment-backend.onrender.com${url}`);
    return data;
  }catch (error){
    console.error("delete error :" ,error)
    return error;
  }
}


// https://empbackend-ten.vercel.app