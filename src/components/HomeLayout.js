import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (user) {
        console.log('user', user)
        return <Navigate to="/admin" replace />;
    }

    return (
        <div>
            {outlet}
        </div>
    );
};
