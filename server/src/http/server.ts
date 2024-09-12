import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastify } from 'fastify'
import { createGoalRoute } from './routes/createGoal'
import { createGoalCompletionRoute } from './routes/createGoalCompletion'
import { getPendingGoalsRoute } from './routes/getPendingGoals'
import { getWeekSummaryRoute } from './routes/getWeekSummary'
import fastifyCors from '@fastify/cors'
import { deleteGoalCompletionRoute } from './routes/deleteGoalCompletion'
import { createMoodRoute } from './routes/createMood'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors,{
	origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/* PLUGINS */
app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(deleteGoalCompletionRoute)
app.register(createMoodRoute)




app.listen({
	port: 3333,
}).then(() => {
	console.log('HTTP SERVER RUNNING!')
})
