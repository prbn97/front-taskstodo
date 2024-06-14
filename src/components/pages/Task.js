import { useEffect, useState } from "react";
import logo from '../img/logo.svg';
import Title from '../Title';
import { useParams } from "react-router-dom";

const Task = () => {
    const [task, setTask] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`http://localhost:8080/tasks/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTask(data);
            })
            .catch(err => {
                console.log(err);
            })
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