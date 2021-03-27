import { USERS_SERVICE_URL } from '../../constants';

interface IloginPayload {
  username: String;
  password: String;
}

export async function loginUser(dispatch: React.Dispatch<any>, loginPayload: IloginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${USERS_SERVICE_URL}/auth`, requestOptions);
    let data = await response.json();
 
    console.log("COUCOUOOOOO")
    console.log(data);
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
 
    dispatch({ type: 'AUTH_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'AUTH_ERROR', error: error });
  }
}
