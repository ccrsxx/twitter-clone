import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/login.module.css';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { poolData, getCognitoIdentityCredentials } from '../cognito/config';

const LoginForm = ({ onLoginSuccess, onLoginFailure }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Declare userPool here
    const userPool = new CognitoUserPool(poolData);
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        getCognitoIdentityCredentials(idToken);
    
        // Fetch user attributes to get the camera number
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            // Handle error in fetching attributes
            console.log(err.message);
            onLoginFailure(err.message);
          } else {
            // Find the camera number attribute
            const cameraNumberAttribute = attributes.find(attr => attr.getName() === 'custom:camera_number');
            const cameraNumber = cameraNumberAttribute ? cameraNumberAttribute.getValue() : null;
    
            // Pass idToken, email, and cameraNumber to the parent component
            console.log("Got cameranumber from Login Form", cameraNumber);
            onLoginSuccess({ email, password, idToken, cameraNumber });
          }
        });
      },
      onFailure: (err) => {
        setErrorMessage(err.message || 'Login failed');
        onLoginFailure(err.message); // Assuming you want to handle login failure in the parent component
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <form onSubmit={handleLogin}>
      <h1>Login</h1>
        <div className={styles.inputBox}>
            <input type="text" placeholder="Email" required 
            onChange={(e) => setEmail(e.target.value)}/>
            <i className="bx bxs-user"></i>
        </div>

        <div className={styles.inputBox}>
            <input type="password" placeholder="Password" required 
            onChange={(e) => setPassword(e.target.value)}/>
            <i className="bx bxs-lock-alt"></i>
        </div>

        <div className={styles.rememberForget}>
            <label><input type="checkbox" /> Remember me </label>
            <Link href="/resetPassword" passHref>
            Forgot password?
            </Link>
        </div>

        <button type="submit" className={styles.btn}>Log in</button>

        <div className={styles.registerLink}>
            <p>Don't have an account? <Link href="/register" passHref>
            Register
            </Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
