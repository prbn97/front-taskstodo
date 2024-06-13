import { useEffect, useState } from "react";
import logo from '../img/logo.svg';
import Title from '../Title';
import { Link, useOutletContext } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useOutletContext(); // Obter o estado do usuário do contexto

    useEffect(() => {
        if (user) { // Só carregar as tarefas se o usuário estiver logado
            let mockTaskList = [
                {
                    id: 1,
                    title: "Task 1",
                    description: "description of the task #1",
                    status: "toDo",
                },
                {
                    id: 2,
                    title: "Task 2",
                    description: "description of the task #2",
                    status: "ToDo",
                },
            ];
            setTasks(mockTaskList);
        }
    }, [user]);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Title icon={logo} text="List of Tasks" />
                    </div>
                </div>
                <div className="row m-4">
                    <div className="col">
                        {!user ? (
                            <div className="alert alert-warning" role="alert">
                                Please log in to see your tasks.
                            </div>
                        ) : (
                            tasks.map((listItem) => (
                                <Link key={listItem.id} to={`/tasks/${listItem.id}`}>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{listItem.title}</h5>
                                            <p className="card-text">{listItem.description}</p>
                                            <span className="badge bg-danger">Status: {listItem.status}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tasks;
