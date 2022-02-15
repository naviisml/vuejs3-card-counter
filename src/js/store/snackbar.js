// state
export const state = {
	list: []
}

// getters
export const getters = {
	list: state => state.list
}

// mutations
export const mutations = {
	["SNACKBAR_ADD"] (state, { options, actions }) {
		state.list.push({ options: options, actions: actions })
	},
	["SNACKBAR_REMOVE"] (state, { id }) {
		state.list = state.list.slice(id + 1, 1)
	},
}

// actions
export const actions = {
	add ({ commit, dispatch }, payload) {
		commit("SNACKBAR_ADD", payload)
	},
	remove ({ commit, dispatch }, payload) {
		console.log(payload)
		commit("SNACKBAR_REMOVE", payload)
	},
}

export const namespaced = true
