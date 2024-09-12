import { lte, and, gte, asc} from "drizzle-orm";
import { db } from "../db";
import { calendarMood, } from "../db/schema";
import dayjs from "dayjs";


export async function getWeekMood() {
    const lastDayOfWeek = dayjs().endOf("week").toDate();
    const firstDayOfWeek = dayjs().startOf("week").toDate();

    const result = await db
        .select({
            mood: calendarMood.mood,
            date: calendarMood.date
        })
        .from(calendarMood)
        .where(
            and(
                gte(calendarMood.date, firstDayOfWeek),
                lte(calendarMood.date, lastDayOfWeek)
            )
        ).orderBy(asc(calendarMood.date))

    return {
        weekMood: result,
    };
}
