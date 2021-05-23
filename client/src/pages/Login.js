import Button from '../components/UI/Button'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	const checkHandlerEmail = (e) => {
		e.preventDefault()
		setEmail(e.target.value)
	}

	const checkHandlerPassword = (e) => {
		e.preventDefault()
		setPassword(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// make request with axios to api
		// send email and password
		// authenticate and redirect to /profile
		try {
			const res = await axios.post(
				'/auth/login',
				{ email, password },
				{
					'Content-type': 'application/json',
				}
			)
			setEmail('')
			setPassword('')
			history.push({
				pathname: '/profile',
				state: res.data,
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<label htmlFor='email'>Email</label>
			<input
				type='email'
				id='email'
				value={email}
				onChange={checkHandlerEmail}
				className='bg-gray-100 border'
			/>
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				id='password'
				value={password}
				onChange={checkHandlerPassword}
				className='bg-gray-100 border'
			/>
			<Button type='submit'>Login</Button>
		</form>
	)
}
