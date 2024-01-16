import { useState } from 'react';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { poolData, getCognitoIdentityCredentials } from '../cognito/config';

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async ({ email, password, idToken, cameraNumber }) => {
    try {
      const userPool = new CognitoUserPool(poolData);
      const authenticationData = { Username: email, Password: password };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const userData = { Username: email, Pool: userPool };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          getCognitoIdentityCredentials(idToken);
          setIsLoggedIn(true);
          setUserDetails({ email, idToken, cameraNumber }); // You can add more user details here
        },
        onFailure: function (err) {
          setErrorMessage(err.message || 'Login failed');
        },
      });
    } catch (error) {
      setErrorMessage('An error occurred during login');
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    if (userPool) {
      userPool.getCurrentUser().signOut();
    }
    setIsLoggedIn(false);
    setUserDetails(null);
  };

  return { isLoggedIn, userDetails, login, logout, errorMessage };
};

export default useAuthentication;
