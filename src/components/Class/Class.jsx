
import ActiveTasks from '../ActiveTasks/ActiveTasks';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import ClassMembers from '../ClassMembers/ClassMembers';

const Class = () => {
  
    return (
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto">
            <ActiveTasks />
            <CompletedTasks />
            <ClassMembers />
          </div>
        </div>
    );
};

export default Class;