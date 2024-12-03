import './App.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
const router = createRouter({
	routeTree,
	defaultPreloadStaleTime: 0,
	defaultPreload: 'intent',
})

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
