import { eq } from "drizzle-orm"
import { db } from "../db"
import { goalCompletions } from "../db/schema";

export async function deleteGoalCompletion(completionId:string) {
	await db.delete(goalCompletions).where(eq(goalCompletions.id, completionId));
}
