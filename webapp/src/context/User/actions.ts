interface IupdateUserData {
  username: string;
  role: string;
  access_token: string;
}

export const updateUser = (dispatch: React.Dispatch<any>, data: IupdateUserData) => {
  dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  localStorage.setItem('jwt', data.access_token);
}


// export async function loginUser(dispatch: React.Dispatch<any>, loginPayload: IloginPayload) {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(loginPayload),
//   };
 
//   try {
//     dispatch({ type: 'REQUEST_LOGIN' });
//     let response = await fetch(`${USERS_SERVICE_URL}/auth`, requestOptions);
//     let data = await response.json();
 
//     if (data.access_token) {
//       dispatch({ type: 'LOGIN_SUCCESS', payload: data });
//       localStorage.setItem('jwt', data.access_token);
//       return data
//     }
 
//     dispatch({ type: 'AUTH_ERROR', error: data.errors[0] });
//     return;
//   } catch (error) {
//     dispatch({ type: 'AUTH_ERROR', error: error });
//   }
// }
