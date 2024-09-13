import { eq } from "drizzle-orm"
import { db } from "../db"
import { calendarMood } from "../db/schema"


export async function getMoodDay({date}:{date:Date}) {
    
    const moodDay = db.select({
        date: calendarMood.date
    }).from(calendarMood).where(eq(calendarMood.date, new Date()))

    return{
        moodDay
    }
}
