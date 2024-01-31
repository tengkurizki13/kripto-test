import {
  BASE_URL,
  ITEMS_BY_ID_FETCH_SUCCESS,
  ITEMS_FETCH_SUCCESS,
} from "./actionType";

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
