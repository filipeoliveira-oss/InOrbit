import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoalCompletion } from '../../functions/deleteGoalCompletion'

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {
	app.delete(
        '/delete_completion',
        {
            schema: {
                body: z.object({
                    completionId: z.string(),
                }),
            },
        },
        async request => {
            const { completionId } = request.body
    
            await deleteGoalCompletion(completionId)
        }
    )
}
