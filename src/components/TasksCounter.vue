<template>
	<div class="total-tasks">
		<h4 class="text-white">Total active tasks: {{ activeTasksCount }}</h4>
		<h4 class="text-white">Total completed tasks: {{ completedTasksCount }}</h4>
		<h4 class="text-white">Total canceled tasks: {{ canceledTasksCount }}</h4>
		<h4 class="text-white">Total pending tasks: {{ pendingTasksCount }}</h4>
	</div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
	setup() {
		const store = useStore()

		const activeTasksCount = computed(() => store.getters.activeTaskCount)
		const completedTasksCount = computed(() => store.getters.completedTaskCount)
		const canceledTasksCount = computed(() => store.getters.canceledTaskCount)
		const pendingTasksCount = computed(() => store.getters.pendingTaskCount)

		return {
			activeTasksCount,
			completedTasksCount,
			canceledTasksCount,
			pendingTasksCount,
		}
	},
}
</script>

<style scoped>
.total-tasks {
	display: flex;
	justify-content: space-between;
}
</style>
