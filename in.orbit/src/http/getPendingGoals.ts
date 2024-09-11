interface pendingGoalsInterface {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
}

export default async function getPendingGoals():Promise<pendingGoalsInterface[]> {
    const res = await fetch('http://localhost:3333/pending_goals')
    const data = await res.json()
    return data
}