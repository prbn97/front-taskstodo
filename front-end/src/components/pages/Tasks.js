import { useEffect, useState } from "react";
import logo from '../img/logo.svg';
import Title from '../Title';
import { Link, useOutletContext } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useOutletContext(); // get user context 

    useEffect(() => {
        if (user) { // mock login

            const headers = new Headers();
            headers.append("Content-Type", "application/json")

            const requestOptions = {
                method: "GET",
                headers: headers,
            }
            fetch(`http://localhost:8080/tasks`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setTasks(data);
                })
                .catch(err => {
                    console.log(err);
                })
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
