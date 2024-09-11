import { Dialog } from "./components/ui/dialog";
import CreateGoal from "./components/createGoal";
import EmptyGoals from "./components/emptyGoals";
import Summary from "./components/summary";

export default function App() {
    return (
        <Dialog>
            {/* <EmptyGoals/> */}
            <Summary/>
            <CreateGoal/>
        </Dialog>
    );
}
