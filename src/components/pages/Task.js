import { useEffect, useState } from "react";
import logo from '../img/logo.svg';
import edit from '../img/edit.svg';
import close from '../img/close.svg';
import save from '../img/save.svg';
import Title from '../Title';
import { useParams, useOutletContext } from "react-router-dom";

const Task = () => {
    const [task, setTask] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const { user } = useOutletContext(); // get user context
    let { id } = useParams();

    useEffect(() => {
        if (user) {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers,
            };

            fetch(`http://localhost:8080/tasks/${id}`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setTask(data);
                    setEditedTitle(data.title);
                    setEditedDescription(data.description);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [id, user]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "ToDo":
                return "btn-danger";
            case "Doing":
                return "btn-warning";
            case "Done":
                return "btn-success";
            default:
                return "btn-secondary"; // fallback color
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
                title: editedTitle,
                description: editedDescription,
            }),
        };

        fetch(`http://localhost:8080/tasks/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTask(data);
                setIsEditing(false); // close editing 
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleCancelClick = () => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setIsEditing(false);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value);
    };

    const handleStatusClick = () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "PUT",
            headers: headers,
        };

        fetch(`http://localhost:8080/tasks/${id}/update`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTask(data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-left">
                    <div className="col">
                        {!user ? (
                            <div className="alert alert-warning" role="alert">
                                Please log in to see your task.
                            </div>
                        ) : (
                            <>
                                <div className="d-flex align-items-center mb-3">
                                    <Title className="" icon={logo} text={task.title} />
                                    {!isEditing ? (
                                        <img
                                            alt="icon-title"
                                            src={edit}
                                            width="30"
                                            height="30"
                                            className="ms-2 cursor-pointer"
                                            onClick={handleEditClick}
                                        />
                                    ) : (
                                        <>
                                            <img
                                                alt="icon-save"
                                                src={save}
                                                width="30"
                                                height="30"
                                                className="ms-2 cursor-pointer"
                                                onClick={handleSaveClick}
                                            />
                                            <img
                                                alt="icon-close"
                                                src={close}
                                                width="30"
                                                height="30"
                                                className="ms-2 cursor-pointer"
                                                onClick={handleCancelClick}
                                            />
                                        </>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editedTitle}
                                                onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="card">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <button
                                                className={`btn ${getStatusBadgeClass(task.status)} cursor-pointer`}
                                                onClick={handleStatusClick}
                                            >
                                                Status: {task.status}
                                            </button>
                                        </div>
                                        {!isEditing ? (
                                            <p className="card-text mt-2">{task.description}</p>
                                        ) : (
                                            <textarea
                                                className="form-control mt-2"
                                                value={editedDescription}
                                                onChange={handleDescriptionChange}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task;
