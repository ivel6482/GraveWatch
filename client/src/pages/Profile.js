import { useLocation } from 'react-router-dom'

export default function Profile() {
	const location = useLocation()
	const { name, email, _id } = location.state
	console.log(location)
	return (
		<>
			<h1>Profile</h1>
			<p>Id: {_id}</p>
			<p>Username: {name}</p>
			<p>Email: {email}</p>
		</>
	)
}
