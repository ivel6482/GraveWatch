import { Link } from 'react-router-dom'

export default function Navbar() {
	// TODO: When the user is logged in, display their name in the navbar
	// Add Input
	// We add form
	//

	return (
		<nav className='bg-gray-200 '>
			<section className='container mx-auto flex justify-between p-4'>
				<Link to='/' className='hover:text-gray-700'>
					<h1>Searching4u</h1>
				</Link>
				<section className='space-x-4'>
					<Link
						to='/signup'
						className='bg-gray-400 text-gray-100 px-3 py-2 hover:bg-gray-500 transition'
					>
						Add a missing person
					</Link>
					<Link to='/login' className='hover:text-gray-700'>
						Login
					</Link>
				</section>
			</section>
		</nav>
	)
}
