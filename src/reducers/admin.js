import api from '../api/index';
export const ACTIONS = {
  ADMINN_FETCH_ADMINN: 'ADMINN_FETCH_ADMINN',
  ADMINN_SET_CURRENT_PAGE: 'ADMINN_SET_CURRENT_PAGE',
};

const initialState = {
  admin: [],
  currentPage: 1,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADMINN_FETCH_ADMINN:
      return {
        ...state,
        admin: action.admin,
      };
    case ACTIONS.ADMINN_SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return { ...state };
  }
};

export const createAdmin = (admin) => () => {
  return api.callApi('admin', 'post', { admin }, 'token').then(res => {
    return res;
  })
};
export const fetchAdmin = () => (dispatch) => {
  api.callApi('admin', 'get').then(res => {
    dispatch(addAdmin(res.data));
  })
};
export const addAdmin = (admin) => ({
  type: ACTIONS.ADMINN_FETCH_ADMINN,
  admin,
});
export const setCurrentPage = (page) => ({
  type: ACTIONS.ADMINN_SET_CURRENT_PAGE,
  page,
});
