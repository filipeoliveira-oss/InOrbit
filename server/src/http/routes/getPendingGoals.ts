import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPedingGoals } from '../../functions/getWeekPendingGoals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
	app.get('/pending_goals', async () => {
        const { pendingGoals } = await getWeekPedingGoals()
    
        return pendingGoals
    })
}
