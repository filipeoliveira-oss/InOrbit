import { eq } from "drizzle-orm"
import { db } from "../db"
import { calendarMood } from "../db/schema"
import dayjs from "dayjs"


export async function getMoodDay({date}:{date:string}) {
    const day = dayjs(date).toDate()

    const moodDay = db.select({
        date: calendarMood.date,
        mood:calendarMood.mood,
        journal: calendarMood.journal
    }).from(calendarMood).where(eq(calendarMood.date, day))

    return moodDay
}
