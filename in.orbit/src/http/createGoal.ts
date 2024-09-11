interface createGoals{
    title:string,
    desiredWeeklyFrequency:number
}

export default async function createGoal({title, desiredWeeklyFrequency}:createGoals) {
    const res = await fetch('http://localhost:3333/goals',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title,
            desiredWeeklyFrequency
        })
    })
}