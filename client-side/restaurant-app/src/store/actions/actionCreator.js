import {
  BASE_URL,
  ITEMS_BY_ID_FETCH_SUCCESS,
  ITEMS_FETCH_SUCCESS,
} from "./actionType";
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

export const itemsFetchSuccess = (payload) => {
  return {
    type: ITEMS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const itemByidFetchSuccess = (payload) => {
  return {
    type: ITEMS_BY_ID_FETCH_SUCCESS,
    payload: payload,
  };
};

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(BASE_URL + "/items");
      if (!response.ok) throw new Error("upss something wrong");
      let data = await response.json();
      dispatch(itemsFetchSuccess(data));
    } catch (error) {
      console.log(error, "<<<dari action");
    }
  };
};

export const fetchItemById = (id) => {
  return async (dispatch) => {
    try {
      let response = await fetch(BASE_URL + "/items/" + id);
      if (!response.ok) throw new Error("upss something wrong");
      let data = await response.json();
      dispatch(itemByidFetchSuccess(data));
    } catch (error) {
      console.log(error, "<<<dari action");
    }
  };
};

export const registerHandler = (form) => {
  return async (dispatch) => {
    try {
      
      const response = await fetch(BASE_URL + "/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'register successfully',
            showConfirmButton: false,
            timer: 1500
          })
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};

export const loginHandler = (form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("access_token", data[0].data.access_token);
      localStorage.setItem("userId", data[0].data.id);
      localStorage.setItem("username", data[0].data.username);
      localStorage.setItem("email", data[0].data.email);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};


export const orderHandler = (form, type = "") => {
  return async (dispatch) => {
    try {

      form.portion = parseInt(form.portion);
      form.userId = parseInt(form.userId);
      form.itemId = parseInt(form.itemId);
      const response = await fetch(BASE_URL + "/api/order", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (type === "special") {
        let response = await fetch(BASE_URL + "/items/" + form.itemId);
        if (!response.ok) throw new Error("upss something wrong");
        let item = await response.json();

        const arr = form.specialRequest;
        const product = item;
        
        let emailContent = `Product Information:\n`;
        emailContent += `Name: ${product.name}\n`;
        emailContent += `Description: ${product.description}\n`;
        emailContent += `Price: Rp. ${product.price}\n`;
        emailContent += `Portion: ${form.portion} portion \n\n`;
        
        if (arr[0].request !== "") {
          emailContent += `Below is a list of special requests:\n`;
          arr.forEach((item, index) => {
            emailContent += `${index + 1}. ${item.request}\n`;
          });
        }
        
        const contentEmail = {
          email: localStorage.email,
          username:localStorage.username,
          message: emailContent
        };
      emailjs.send('service_6c5pkoo', 'template_cq2x1xx', contentEmail, 'zFpm9v01FSEMLFuOE')
      .then((result) => {
          console.log(result.text);
          console.log("terkirim kawan!!!!");
      }, (error) => {
          console.log(error.text);
          Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.text,
      });
      });
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "We will process your order immediately",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error,"ini apa");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};