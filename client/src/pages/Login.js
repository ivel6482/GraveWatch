import Button from '../components/UI/Button'
import { useState } from 'react'
export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const checkHandlerEmail = (e) => {
		e.preventDefault()
		setEmail(e.target.value)
	}

	const checkHandlerPassword = (e) => {
		e.preventDefault()
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		alert(email)
		alert(password)
		setEmail('')
		setPassword('')
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
