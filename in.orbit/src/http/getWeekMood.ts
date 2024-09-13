interface weekMoodInterface {
    mood: string;
    date: Date;
}

export default async function getWeekMood():Promise<weekMoodInterface[]> {
    const res = await fetch('http://localhost:3333/week_mood')
    const data = await res.json()
    return data
}