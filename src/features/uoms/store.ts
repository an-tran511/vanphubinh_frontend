import { createStore } from '@xstate/store'

export const uomStore = createStore({
	context: { createModalOpened: false },
	on: {
		openCreateModal: {
			createModalOpened: () => true,
		},
		closeCreateModal: {
			createModalOpened: () => false,
		},
	},
})
