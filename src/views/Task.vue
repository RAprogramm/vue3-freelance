<template>
	<div class="card" v-if="task">
		<h2>{{task.title}}</h2>
		<p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
		<p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
		<p><strong>Описание</strong>: {{ task.description }}</p>
		<div class="for-delete">
			<div>
				<button class="btn" @click="setStatus('pending')">take to work</button>
				<button class="btn primary" @click="setStatus('done')">complete</button>
				<button class="btn danger" @click="setStatus('canceled')">cancel</button>
			</div>
			<button class="btn black" @click="removeTask">Delete</button>
		</div>
	</div>
	<h3 class="text-white center" v-else>
		There is no task with id {{id}}
	</h3>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
	components: {AppStatus},
	props: ['id'],
	setup(props) {
		const store = useStore()
		const router = useRouter()

		const id = props.id
		const task = computed(() => store.getters.taskById(id))

		const setStatus = status => {
			const updated = {...task.value, status}
			store.dispatch('changeTask', updated)
		}

		const check = () => {
			console.log(task.value)
		}

		const removeTask = () => {
			const update = {...task.value}
			store.dispatch('removeTask', update)
			router.push('/')
		}

		return {
			task,
			id,
			setStatus,
			check,
			removeTask
		}
	}
}
</script>

<style scoped>
.for-delete {
	justify-content: space-between;
	display: flex;
}
</style>
