import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = {
    isAuth: Boolean;
} & RouteProps;

export const PublicRoute = ({ isAuth, ...props }: Props) => {
    return isAuth
        ? (<Redirect to="/dashboard" />)
        : (<Route {...props} />)
};

export const ProtectedRoute =  ({ isAuth, ...props }: Props) => {
    return isAuth
        ? (<Route {...props} />)
        : (<Redirect to="/login" />)
};