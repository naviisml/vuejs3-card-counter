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
}

// actions
export const actions = {
	add ({ commit, dispatch }, payload) {
		commit("SNACKBAR_ADD", payload)
	},
}

export const namespaced = true
