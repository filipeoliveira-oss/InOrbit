import { count, lte, and, gte, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

export async function getWeekSummary() {
	const lastDayOfWeek = dayjs().endOf('week').toDate()
	const firstDayOfWeek = dayjs().startOf('week').toDate()

	const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(lte(goals.createdAt, lastDayOfWeek))
	)

	const goalsCompleteInWeek = db.$with('goal_completed_in_week').as(
		db
			.select({
				id: goalCompletions.id,
				title: goals.title,
				completeAt: goalCompletions.createdAt,
				completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as('complete_at_date'),
			})
			.from(goalCompletions)
			.innerJoin(goals, eq(goals.id, goalCompletions.goalId))
			.where(
				and(
					gte(goalCompletions.createdAt, firstDayOfWeek),
					lte(goalCompletions.createdAt, lastDayOfWeek)
				)
			)
	)

	const goalsCompleteByWeekDay = db.$with('goals_complete_by_week_day').as(
		db
			.select({
				completedAtDate: goalsCompleteInWeek.completedAtDate,
				completions: sql`
				JSON_AGG(
					JSON_BUILD_OBJECT(
						'id', ${goalsCompleteInWeek.id},
						'title', ${goalsCompleteInWeek.title},
						'completedAt', ${goalsCompleteInWeek.completeAt}
					)
				)
            `.as('completions'),
			})
			.from(goalsCompleteInWeek)
			.groupBy(goalsCompleteInWeek.completedAtDate)
	)

	const result = await db
		.with(goalsCreatedUpToWeek, goalsCompleteInWeek, goalsCompleteByWeekDay)
		.select({
			completed: sql`(SELECT COUNT(*) FROM ${goalsCompleteInWeek})`.mapWith(Number),
			total: sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(Number),
			goalsPerDay: sql`
				JSON_OBJECT_AGG(
					${goalsCompleteByWeekDay.completedAtDate},
					${goalsCompleteByWeekDay.completions}
				)
			`
		})
		.from(goalsCompleteByWeekDay)



	return {
		summary: result
	}
}
