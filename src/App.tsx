import './App.css'
import { MantineProvider } from '@mantine/core'
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
			staleTime: 10000,
		},
	},
	mutationCache: new MutationCache({
		onSuccess: (_data, _variables, _context, mutation) => {
			queryClient.invalidateQueries({
				queryKey: mutation.options.mutationKey,
			})
		},
	}),
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreloadStaleTime: 0,
	defaultPreload: 'intent',
})

function App() {
	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</MantineProvider>
	)
}

export default App
