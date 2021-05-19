export default function Button({ type, children, handleClick }) {
	return (
		<button type={type || 'button'} onClick={handleClick}>
			{children}
		</button>
	)
}
