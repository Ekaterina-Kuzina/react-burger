import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

export function ProtectedRoute({ children, ...rest }) {
  const userInfo = useSelector((state) => state.saveUserInfo.userInfo);
  console.log(userInfo);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
