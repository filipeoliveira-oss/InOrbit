import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { getMoodDay } from '../../functions/getMoodDay'

interface UserParams {
    date: string
  }

export const getMoodDayRoute: FastifyPluginAsyncZod = async (app) => {
	app.get<{ Params: UserParams }>(
        '/mood_day/:date',
        async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
            const {date} = request.params

    
            const result = await getMoodDay({
                date,
            })

            reply.send({
                resp: result
            })
        }
    )
}