import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import getPendingGoals from "../http/getPendingGoals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import completeGoal from "../http/completeGoal";

interface pendingGoalsInterface {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
}

export default function PendingGoals(){
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey:['pending_goals'],
        queryFn: getPendingGoals,
        staleTime: 1000 * 60 //60 seconds
    })


    if(!data){
        return null
    }

    async function handleCompleteGoal(goalId:string){
        await completeGoal(goalId)

        queryClient.invalidateQueries({queryKey:['summary']})
        queryClient.invalidateQueries({queryKey:['pending_goals']})
    }

    return(
        <div className="flex flex-wrap gap-3">
                
                {data?.map((goal:pendingGoalsInterface) =>{
                    return(
                        <OutlineButton key={goal.id} disabled={goal.completionCount >= goal.desiredWeeklyFrequency} onClick={() => handleCompleteGoal(goal.id)}>
                            <Plus className="size-4 text-zinc-600"/>
                            {goal.title}
                        </OutlineButton>
                    )
                })}
            </div>
    )
}