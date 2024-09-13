import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getMoodDay } from '../../functions/getMoodDay'
import z from 'zod'

export const getMoodDayRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
        '/mood_day',
        {
            schema: {
                body: z.object({
                    date: z.date(),
                }),
            },
        },
        async request => {
            const { date } = request.body
    
            await getMoodDay({
                date,
            })
        }
    )
}