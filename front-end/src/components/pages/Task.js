import { useEffect, useState } from "react";
import logo from '../img/logo.svg';
import Title from '../Title';
import { useParams } from "react-router-dom";

const Task = () => {
    const [task, setTask] = useState({});
    let { id } = useParams();

    useEffect(() => {
        let mockTask =
        {
            id: "b950a86e8763dfdb2e70",
            title: "Task 1",
            description: "description of the task #1",
            status: "toDo",
        }
        setTask(mockTask);
    }, [id])

    return (
        <>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Title icon={logo} text={task.title} />
                    </div>
                </div>


                <div className="row m-2">
                    <div className="col">
                        <div key={task.id} className="card-body ">
                            <span className="badge bg-danger">Status: {task.status}</span>
                            <p className="card-text mt-2">{task.description}</p>
                        </div>
                    </div>


                </div>
            </div>

        </>
    );

}
export default Task;