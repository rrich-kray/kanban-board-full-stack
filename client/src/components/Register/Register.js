import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

const Register = ({ baseUrl }) => {
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	console.log(formState);

	const { register, currentUser } = useAuth();

	console.log(currentUser);
	const handleChange = (e) => {
		const { name, value } = e.target;
		return setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<div className="register flex-row justify-center align-center">
			<form className="register-form form flex-col justify-center align-center">
				<div className="first-name input">
					<label htmlFor="firstName">First Name</label>
					<input name="firstName" id="firstName" onChange={handleChange} />
				</div>
				<div className="last-name input">
					<label htmlFor="lastName">Last Name</label>
					<input name="lastName" id="lastName" onChange={handleChange} />
				</div>
				<div className="email input">
					<label htmlFor="email">Email</label>
					<input name="email" id="email" onChange={handleChange} />
				</div>
				<div className="password input">
					<label htmlFor="password">Password</label>
					<input name="password" id="password" onChange={handleChange} />
				</div>
				<button
					className="register-btn"
					onClick={() =>
						register(
							formState.firstName,
							formState.lastName,
							formState.email,
							formState.password,
							`${baseUrl}/kanban-board-full-stack/api/register`
						)
					}
				>
					Register
				</button>
				<div
					className="flex-row justify-center align-center"
					style={{ width: '100%', marginTop: '10px' }}
				>
					<span style={{ color: 'white' }}>
						Already registered? <Link to="/login">Login</Link>
					</span>
				</div>
			</form>
		</div>
	);
};

export default Register;
