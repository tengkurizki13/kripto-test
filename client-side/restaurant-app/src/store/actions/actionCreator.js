import {
  BASE_URL,
  ITEMS_BY_ID_FETCH_SUCCESS,
  ITEMS_FETCH_SUCCESS,
} from "./actionType";
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


// fuction to create data to reducer
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


// fucntions api to server

// this fucntion api get items from server
export const fetchItems = () => {
  return async (dispatch) => {
    try {
      // api
      let response = await fetch(BASE_URL + "/items");

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");

      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(itemsFetchSuccess(data));
    } catch (error) {
      // log error
      console.log(error);
    }
  };
};


// this fucntion api get item by id from server
export const fetchItemById = (id) => {
  return async (dispatch) => {
    try {

      // api
      let response = await fetch(BASE_URL + "/items/" + id);

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");

      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(itemByidFetchSuccess(data));
    } catch (error) {

      // log error
      console.log(error);
    }
  };
};


// this fucntion api register from server
export const registerHandler = (form) => {
  return async (dispatch) => {
    try {
      
      // api
      const response = await fetch(BASE_URL + "/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();


      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'register successfully',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {

      // sweet alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};


// this fucntion api login from server
export const loginHandler = (form) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);


      // set localstore
      localStorage.setItem("access_token", data[0].data.access_token);
      localStorage.setItem("userId", data[0].data.id);
      localStorage.setItem("username", data[0].data.username);
      localStorage.setItem("email", data[0].data.email);

      // sweet alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {

      // sweet alert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};


export const orderHandler = (form, type = "") => {
  return async (dispatch) => {
    try {
      // change type data form to number
      form.portion = parseInt(form.portion);
      form.userId = parseInt(form.userId);
      form.itemId = parseInt(form.itemId);

      // api order
      const response = await fetch(BASE_URL + "/api/order", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);


      // contional to chechk type order
      if (type === "special") {

        // api to get item for content email
        let response = await fetch(BASE_URL + "/items/" + form.itemId);

        // change data response to json
        let item = await response.json();

        // contional  if error
        if (!response.ok) throw new Error("upss something wrong");

        // inisialize arr varialble arr to make content email
        const arr = form.specialRequest;

        // inisialize arr varialble item to make content email
        const product = item;
        

        // make content to sent email
        let emailContent = `Product Information:\n`;
        emailContent += `Name: ${product.name}\n`;
        emailContent += `Description: ${product.description}\n`;
        emailContent += `Price: Rp. ${product.price}\n`;
        emailContent += `Portion: ${form.portion} portion \n\n`;
        

        // contional to special request
        if (arr[0].request !== "") {
          emailContent += `Below is a list of special requests:\n`;
          arr.forEach((item, index) => {
            emailContent += `${index + 1}. ${item.request}\n`;
          });
        }
        

        // object content email to admin
        const contentEmail = {
          email: localStorage.email,
          username:localStorage.username,
          message: emailContent
        };

        // send email
        emailjs.send('service_6c5pkoo', 'template_cq2x1xx', contentEmail, 'zFpm9v01FSEMLFuOE')
          .then((result) => {
            // log success
              console.log(result.text);
              console.log("terkirim kawan!!!!");
          }, (error) => {
            // log error
              console.log(error.text);
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.text,
            });
          });
      }


      // sweet alert success
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "We will process your order immediately",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {

      // sweet alert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};