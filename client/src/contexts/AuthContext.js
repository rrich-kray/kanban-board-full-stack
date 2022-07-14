import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

// Routes are functional... these must not be
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(false);

	const register = (e, firstName, lastName, email, password, url) => {
		e.preventDefault();
		axios
			.post(url, {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			})
			.then((userData) => {
				console.log(userData);
				setCurrentUser(userData);
			});
	};

	const login = (e, email, password, url) => {
		e.preventDefault();
		axios
			.post(url, {
				email: email,
				password: password,
			})
			.then((userData) => {
				console.log(userData);
				setCurrentUser(userData);
			});
	};

	const value = {
		currentUser,
		login,
		register,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
