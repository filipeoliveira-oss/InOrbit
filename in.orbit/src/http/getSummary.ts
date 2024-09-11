interface goalPerDay{
    id:string,
        title:string,
        completedAt:string
}

interface summaryInterface {
    completed: number;
    total: number;
    goalsPerDay:goalPerDay;
}

export default async function getSummary():Promise<summaryInterface> {
    const res = await fetch('http://localhost:3333/summary')
    const data = await res.json()
    return data
}