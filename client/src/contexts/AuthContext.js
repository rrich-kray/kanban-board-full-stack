import React, { useState, useEffect, useContext, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(false);

	const register = async (firstName, lastName, email, password, url) => {
		try {
			await axios
				.post(url, {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				})
				.then((userData) => {
					localStorage.setItem('sid', JSON.stringify(userData.data[1]));
					// setCurrentUser(userData.data); // This is queued and doesn't occur until the other components are loaded, at which point the currentUser value is still undefined
				});
		} catch (e) {
			console.log(e);
		}
	};

	const login = async (email, password, url) => {
		await axios
			.post(url, {
				email: email,
				password: password,
			})
			.then((userData) => {
				localStorage.setItem('sid', JSON.stringify(userData.data[1]));
				// setCurrentUser(userData);
			});
	};
	/* 
	When you call the authSetter(true);, the state update is queued and once the then callback completes it goes to the next then in the chain which has your authGetter(). Now the state update does not happen immediately as I explained, it is queued. So when the last then callback is executed the state update which is queued has not happened and you still see false which is the old value.
	*/

	const logout = () => {
		localStorage.removeItem('sid');
		setCurrentUser();
		window.location.replace('/register');
	};

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('sid'));
		if (token) {
			setCurrentUser(jwt_decode(token));
		}
	}, []);

	const value = {
		currentUser,
		login,
		logout,
		register,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
