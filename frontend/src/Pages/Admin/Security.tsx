import { useEffect, useState } from 'react';
import { config } from '../../configs/config';
import { Helmet } from 'react-helmet';

const Security = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const verifyPassword = () => {
        const trueKey = config.adminKey;
        const trueName = config.adminName;
        
        const userNameInput = prompt("Please enter Name: ");
        const userInput = prompt("Please Enter Key: ");
        
        if (userInput === trueKey && userNameInput === trueName) {
            setIsAuthenticated(true);
        } else {
            alert("Wrong Password or Name!!");
            window.location.reload();
        }
    };

    useEffect(() => {
        verifyPassword();
    }, []);

    return (
        <div>
           <Helmet> 
            <title>{config.resturant} | Admin</title>
            </Helmet>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome to the Admin Panel</h1>
                </div>
            ) : (
                <h1>Access Denied</h1>
            )}
        </div>
    );
}

export default Security;