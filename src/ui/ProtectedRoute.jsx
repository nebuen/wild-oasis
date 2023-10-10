function ProtectedRoute({ children }) {
  // 1. Load the authenticated user

  // 2. While loading, show spinner

  // 3. If user is not authenticated, redirect to login page

  // 4. If user is authenticated, show the children, or render the app

  return children;
}

export default ProtectedRoute;
