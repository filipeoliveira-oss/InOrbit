

export default async function deleteCompletionGoal(completionId:string) {
    const res = await fetch('http://localhost:3333/delete_completion',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            completionId
        })
    })
}