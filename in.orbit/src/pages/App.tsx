import { Dialog } from "../components/ui/dialog";
import CreateGoal from "../components/createGoal";
import EmptyGoals from "../components/emptyGoals";
import Summary from "../components/summary";
import { useQuery } from "@tanstack/react-query";
import getSummary from "../http/getSummary";

export default function App() {
    
    const { data } = useQuery({
        queryKey:['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60 //60 seconds
    })

    return (
        <Dialog>

            {data && data.total > 0 ? <Summary/> : <EmptyGoals/>}

            <CreateGoal/>
        </Dialog>
    );
}
