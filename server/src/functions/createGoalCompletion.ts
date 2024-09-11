import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

interface creategoalCompletionsRequest {
	goalId: string
}

export async function createGoalCompletion({ goalId }: creategoalCompletionsRequest) {
	const lastDayOfWeek = dayjs().endOf('week').toDate()
	const firstDayOfWeek = dayjs().startOf('week').toDate()

	const goalsCompletionCounts = db.$with('goal_completion_counts').as(
		db
			.select({
				completionCount: count(goalCompletions.goalId).as('completionCount'),
				goalId: goalCompletions.goalId,
			})
			.from(goalCompletions)
			.where(
				and(
					gte(goalCompletions.createdAt, firstDayOfWeek),
					lte(goalCompletions.createdAt, lastDayOfWeek),
					eq(goalCompletions.goalId, goalId)
				)
			)
			.groupBy(goalCompletions.goalId)
	)

	const result = await db
		.with(goalsCompletionCounts)
		.select({
			desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
			completionCount:sql`COALESCE(${goalsCompletionCounts.completionCount}, 0)`.mapWith(
				Number
			),
			
		})
		.from(goals)
		.leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id)).where(eq(goals.id, goalId)).limit(1)

	
	const {completionCount, desiredWeeklyFrequency} = result[0]

	if(completionCount >= desiredWeeklyFrequency){
		throw new Error('Goal already complete this week')
	}
	
	const insertResult = await db
		.insert(goalCompletions)
		.values({
			goalId,
		})
		.returning()

	const goalCompletion = insertResult[0]


	return {
		goalCompletion,
	}
}
