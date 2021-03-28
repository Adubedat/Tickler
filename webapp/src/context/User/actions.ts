import { USERS_SERVICE_URL } from '../../constants';

interface IupdateUserData {
  id: string;
  username: string;
  role: string;
  access_token: string;
}

export const updateUser = (dispatch: React.Dispatch<any>, data: IupdateUserData) => {
  dispatch({ type: 'AUTH_SUCCESS', payload: data });
  localStorage.setItem('jwt', data.access_token);
}

export const disconnectUser = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('jwt');
}

export const checkUserAuth = async (dispatch: React.Dispatch<any>) => {
  const jwt = localStorage.getItem('jwt');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    },
  };
  
  try {
    let response = await fetch(`${USERS_SERVICE_URL}/users/me`, requestOptions);
    let data = await response.json();
    if (response.status === 200) {
      dispatch({ type: 'AUTH_SUCCESS', payload: data.data });
    }
  } catch (error) {
    dispatch({ type: 'LOGOUT' });
  }
}
