import { createStore } from '@xstate/store'

export const uomStore = createStore({
	context: { createModalOpened: false, editModalOpened: false, uomId: '' },
	on: {
		openCreateModal: {
			createModalOpened: () => true,
		},
		closeCreateModal: {
			createModalOpened: () => false,
		},
		openEditModal: {
			editModalOpened: () => true,
			uomId: (_, { id }: { id: string }) => id,
		},
		closeEditModal: {
			editModalOpened: () => false,
		},
	},
})
