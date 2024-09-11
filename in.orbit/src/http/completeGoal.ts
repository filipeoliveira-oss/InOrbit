export default async function completeGoal(goalId:string) {
    const res = await fetch('http://localhost:3333/goal_completions',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            goalId
        })
    })
}