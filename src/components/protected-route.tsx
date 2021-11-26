import { Redirect, Route } from 'react-router-dom';
import { useSelector } from '../services/hooks';

type TProtectedRouteProps = { 
  children: React.ReactNode;
  path: string
}

export const ProtectedRoute: React.FC<TProtectedRouteProps> =({ children, ...rest })=>{
  const userInfo = useSelector(state => state.getUserInfo.userInfo);
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
