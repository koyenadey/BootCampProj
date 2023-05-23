import jwtDecode from 'jwt-decode';

 export function getToken(token){
  //console.log(token);
  const user = jwtDecode(token);
  console.log(user);
  return user;
}
