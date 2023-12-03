export const logout = (setUser, navigate) => {
    setUser(null);
  
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  
    navigate('/Login');
  };