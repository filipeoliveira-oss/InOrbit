import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createMood } from '../../functions/createMood'

export const createMoodRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
        '/create_mood',
        {
            schema: {
                body: z.object({
                    mood: z.string(),
                    journal: z.string().max(500),
                    date:z.coerce.date()
                }),
            },
        },
        async request => {
            const { mood, journal, date} = request.body
    
            await createMood({
                mood,
                journal,
                date
            })
        }
    )
}
