import React, { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vérifier si un token est présent dans le sessionStorage
        const storedToken = sessionStorage.getItem('token');
        console.log('===>', storedToken);
        if (storedToken) {
            // Décoder le token JWT
            try {
                const decodedToken = jwt_decode(storedToken);
                console.log('test3 ==>', decodedToken);
                // Vérifier si le token est valide (vous pouvez ajouter d'autres vérifications ici)
                if (decodedToken) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log('Invalid token');
            }
        }
        setIsLoading(false); // Met à jour isLoading une fois la vérification terminée
    }, []);

    if (isLoading) {
        // Afficher un indicateur de chargement pendant la vérification
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;