import { Dialog } from "./components/ui/dialog";
import CreateGoal from "./components/createGoal";
import EmptyGoals from "./components/emptyGoals";
import Summary from "./components/summary";

import AngryFace from '../public/Angryface.tsx'
import MoodEmoji from "./components/moodEmoji.tsx";

export default function App() {
    return (
        <Dialog>
            {/* <EmptyGoals/> */}
            <Summary/>
            <CreateGoal/>
        </Dialog>
        
    );
}
