import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekMood } from '../../functions/getWeekMood'

export const getWeekMoodRoute: FastifyPluginAsyncZod = async (app) => {
	app.get('/week_mood', async () => {
        const { weekMood } = await getWeekMood()
    
        return weekMood
    })
}
