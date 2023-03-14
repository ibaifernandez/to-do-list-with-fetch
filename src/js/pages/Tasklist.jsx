import React, { useState, useEffect } from "react"; // Due imports of React and React's hooks

export const TaskList = () => {
    const [user, setUser] = useState("");
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    // useEffect(()=>{setUser(prompt("What's you name?"))},[])

    let taskListLength = taskList.length;

    const addTask = (e) => {
        if (e.key === "Enter") {
            if (task.length !== 0) {
                let theseTasks = [...taskList, { label: task, done: false }];
                setTaskList(theseTasks);
                // console.log('theseTasks');
                // console.log(theseTasks);
                // console.log('Task List');
                // console.log(taskList);
                // console.log(JSON.stringify(theseTasks));
                fetch(
                    "https://assets.breatheco.de/apis/fake/todos/user/" + user,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(theseTasks),
                    }
                )
                    .then((resp) => {
                        // console.log("STATUS");
                        // console.log(resp.status);
                        return resp.json();
                    })
                    .then((data) => {
                        // console.log("console de la data");
                        // console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            setTask("");
        }
    };

    const removeTask = (item) => {
        let removeList = taskList.filter((task) => item.label !== task.label);
        fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(removeList),
        })
            .then((resp) => {
                // console.log("STATUS");
                // console.log(resp.status);
                return resp.json();
            })
            .then((data) => {
                // console.log("console de la data");
                // console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTaskList(removeList);
    };

    useEffect(() => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                // console.log("STATUS");
                // console.log(resp.status);
                return resp.json();
            })
            .then((data) => {
                // console.log("console de la data");
                // console.log(data);
                setTaskList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="container d-flex justify-content-center flex-column mx-auto bg-dark w-50 mt-3">
                <div className="d-flex justify-content-center flex-column mx-auto">
                    <h1 className="my-3 text-info text-center">
                        ~ To Do List ~
                    </h1>
                    <input
                        type="text"
                        className="border-0 px-2 py-2 fs-6"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Add a new task"
                        onKeyDown={addTask}
                    />
                </div>
                {task !== "" ? (
                    <span className="text-white text-center mt-2">
                        Adding a new task...
                    </span>
                ) : (
                    false
                )}
                <div className="container bg-dark mx-auto mt-3">
                    <div className="d-flex justify-content-center flex-row">
                        <ul className="p-0 w-100">
                            {taskList.map((task, index) => (
                                <li
                                    key={index}
                                    className="text-danger p-2 d-flex justify-content-between"
                                >
                                    <span className="pe-2">{task.label}</span>
                                    <div className="d-flex justify-content-end align-items-center flex-row w-25 p-1">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input checkbox"
                                                type="checkbox"
                                                value=""
                                            />
                                        </div>
                                        <button
                                            className="delete"
                                            onClick={() => {
                                                removeTask(task);
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center bg-light py-2 mx-auto my-3 px-3 fs-5 w-25">
                {taskListLength} tasks left to do!
            </div>
        </>
    );
};
