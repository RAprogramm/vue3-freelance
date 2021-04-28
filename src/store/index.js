import { createStore } from 'vuex'

export default createStore({
	state() {
		return {
			tasks: JSON.parse(localStorage.getItem('my-tasks')) ?? []
		}
	},
	mutations: {
		createTask(state, task) {
			state.tasks.push(task)
			localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
		},
		changeTask(state, task) {
			const idx = state.tasks.findIndex(t => t.id === task.id)
			state.tasks[idx] = task
			localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
		},
		removeTask(state, task) {
			const idx = state.tasks.findIndex(t => t.id === task.id)
			state.tasks.splice(idx, 1)
			localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
		}
	},
	actions: {
		createTask({commit}, task) {
			if (task.date < new Date()) {
				task.status = 'canceled'
			}
			commit('createTask', task)
		},
		changeTask({commit}, task) {
			commit('changeTask', task)
		},
		removeTask({commit}, task) {
			commit('removeTask', task)
		}
	},
	getters: {
		tasks(state) {
			return state.tasks
		},
		taskById(_, getters) {
			return id => getters.tasks.find(t => t.id === id)
		},
		activeTaskCount(state) {
			return state.tasks.filter(t => t.status === 'active').length
		},
		completedTaskCount(state) {
			return state.tasks.filter(t => t.status === 'done').length
		},
		canceledTaskCount(state) {
			return state.tasks.filter(t => t.status === 'canceled').length
		},
		pendingTaskCount(state) {
			return state.tasks.filter(t => t.status === 'pending').length
		}
	}
})
