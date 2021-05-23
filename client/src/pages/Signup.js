import { useState } from 'react'
import Button from '../components/UI/Button'

export default function Signup() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const checkHandlerEmail = (e) => {
		e.preventDefault()
		setEmail(e.target.value)
	}

	const checkHandlerPassword = (e) => {
		e.preventDefault()
		setPassword(e.target.value)
	}

	const checkHandlerName = (e) => {
		e.preventDefault()
		setName(e.target.value)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		setEmail('')
		setPassword('')
		setName('')
	}

	return (
		<form onSubmit={submitHandler}>
			<h1>Signup</h1>
			<label htmlFor='text'>Name</label>
			<input
				onChange={checkHandlerName}
				value={name}
				type='text'
				id='text'
			></input>
			<label htmlFor='email'>Email</label>
			<input
				onChange={checkHandlerEmail}
				value={email}
				type='email'
				id='email'
			></input>
			<label htmlFor='password'>Password</label>
			<input
				onChange={checkHandlerPassword}
				value={password}
				type='password'
				id='password'
			></input>

			<Button type='submit'>Signup</Button>
		</form>
	)
}
