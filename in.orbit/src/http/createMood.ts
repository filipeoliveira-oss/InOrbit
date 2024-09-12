export default async function createMood({mood, journal, date = new Date()}: {mood:string, journal:string, date: Date}) {
    const res = await fetch('http://localhost:3333/mood',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            mood,
            journal,
            date
        })
    })
}