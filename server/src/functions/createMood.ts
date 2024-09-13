
import { db } from '../db'
import { calendarMood} from '../db/schema'

interface creategoalCompletionsRequest {
	mood: string,
    journal: string,
    date: Date
}

export async function createMood({ mood, journal,date }: creategoalCompletionsRequest) {


	const result = await db.insert(calendarMood).values({
        mood,
        journal,
        date: new Date(date)
    }).returning()

    const returnMood = result[0]

	return {
		returnMood,
	}
}
