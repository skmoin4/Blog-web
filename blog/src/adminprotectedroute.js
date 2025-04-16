


const adminProtectedRoute = ({ children }) => {

  const isLoggedIna = localStorage.getItem("isLoggedIna");

  return children;
};

export default adminProtectedRoute;
