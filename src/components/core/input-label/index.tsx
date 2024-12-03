export const InputLabel = ({ label }: { label: string }) => {
	return (
		<div className="flex flex-col justify-center items-center">
			<span className="text-sm font-medium truncate mx-auto text-center">{label}</span>
		</div>
	)
}
