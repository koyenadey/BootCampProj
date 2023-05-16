import jwtDecode from 'jwt-decode';

 export function getToken(token){
  const jwt = jwtDecode(token);
  return jwt;
}
