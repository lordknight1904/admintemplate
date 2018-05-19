import api from '../api/index';
export const ACTIONS = {
  ADMIN_FETCH_ADMIN: 'ADMIN_FETCH_ADMIN',
  ADMIN_SET_CURRENT_PAGE: 'ADMIN_SET_CURRENT_PAGE',
  ADMIN_SET_EDIT: 'ADMIN_SET_EDIT',
};

const initialState = {
  admin: [],
  currentPage: 0,
  edit: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADMIN_FETCH_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    case ACTIONS.ADMIN_SET_EDIT:
      return {
        ...state,
        edit: action.edit,
      };
    case ACTIONS.ADMIN_SET_CURRENT_PAGE:
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
  type: ACTIONS.ADMIN_FETCH_ADMIN,
  admin,
});
export const setCurrentPage = (page) => ({
  type: ACTIONS.ADMIN_SET_CURRENT_PAGE,
  page,
});
export const setEdit = (edit) => ({
  type: ACTIONS.ADMIN_SET_EDIT,
  edit,
});
