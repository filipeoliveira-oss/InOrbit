import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const goals = pgTable('goals', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    title: text('title').notNull(),
    desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const goalCompletions = pgTable('goal_completion', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    goalId: text('goal_id')
        .references(() => goals.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const calendarMod = pgTable('calendar_mood', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    date:timestamp('date', { withTimezone: true }).notNull(),
    mood: text('mood'),
    journal: text('journal')
})

// export const user = pgTable('users', {
//     id: text('id')
//         .primaryKey()
//         .$defaultFn(() => createId()),
//     name: text('name').notNull(),
//     email: text('email').notNull()
// })