// Atar un comportamiento a la propiedad "done" de modo que la casilla de verificación ejecute un fetch toogleado con "done": "true"/"false"
// Editar una tarea una vez escrita

import React, { useState, useEffect, useContext } from "react"; // Due imports of React and React's hooks

import { Context } from "../context/ContextCreator.jsx";

const Tasklist = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    const { username, setUsername } = useContext(Context);

    let taskListLength = taskList.length;

    //  Definimos la función «addTask» para que escuche un evento (e)
    const addTask = (e) => {
        //  Cuando dicho evento sea igual a presionar «Enter»
        if (e.key === "Enter") {
            //  Si la tarea que estoy añadiendo tiene una longitud diferente a 0
            if (task.length !== 0) {
                //  ¿Qué estoy haciendo aquí?
                let theseTasks = [...taskList, { label: task, done: false }];
                //  Actualiza la lista de tareas a partir de la variable «theseTasks»
                setTaskList(theseTasks);
                //  Haz un fetch...
                fetch(
                    //  ... a esta URL...
                    "https://assets.breatheco.de/apis/fake/todos/user/" +
                        //  ... con el «username» que hemos traído de Context...
                        username,
                    {
                        //  ... utilizando el método PUT...
                        method: "PUT",
                        //  ¿Son estos «headers» fundamentales?
                        headers: {
                            "Content-Type": "application/json",
                        },
                        //  ¿Qué hace concretamente esta línea de código?
                        body: JSON.stringify(theseTasks),
                    }
                )
                    //  Entonces, lo que te llega (encapsulado en la variable «resp»)...
                    .then((resp) => {
                        //  ... conviértelo en un JSON...
                        return resp.json();
                    })
                    //  ... y, entonces, toma ese JSON (objeto) al que ahora vamos a encapsular como «data»...
                    .then((data) => {
                        //  ... y crea una alerta con la propiedad «result» de dicho objeto («data»)...
                        alert(
                            data.result +
                                //  ... y una suerte de notificación que confirme la nueva tarea añadida.
                                "! The most recently added task is '" +
                                task +
                                "'."
                        );
                    })
                    //  Y si en algún momento encuentras un error encapsulado como «error»...
                    .catch((error) => {
                        // ...  notifícamelo a través de la consola
                        console.log(error);
                    });
            }
            //  Finalmente, vuelve a poner el campo del formulario en blanco.
            setTask("");
        }
    };

    const deleteTask = (item) => {
        let listWithDeletedElement = taskList.filter(
            (task) => item.label !== task.label
        );
        console.log(listWithDeletedElement.length);
        fetch("https://assets.breatheco.de/apis/fake/todos/user/" + username, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                listWithDeletedElement && listWithDeletedElement.length === 0
                    ? [{ label: "sample task", done: false }]
                    : listWithDeletedElement
            ),
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                //  Crea una alerta con la propiedad «msg» del objeto proveniente del `.then` anterior (encapsulado como «data»)...
                console.log(data);
                alert(
                    data.msg +
                        //  ... junto a una suerte de notificación que confirme la nueva tarea eliminada.
                        "! The most recently deleted task is '" +
                        item.label +
                        "'."
                );
            })
            .catch((error) => {
                console.log(error);
            });
        setTaskList(listWithDeletedElement);
    };

    useEffect(() => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/" + username, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
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
                            {taskList.map((task, index) =>
                                taskList && task.label === "sample task" ? (
                                    false
                                ) : (
                                    <li
                                        key={index}
                                        className="text-danger p-2 d-flex justify-content-between"
                                    >
                                        <span className="pe-2">
                                            {task.label}
                                        </span>
                                        <div className="d-flex justify-content-end align-items-center flex-row w-25 p-1">
                                            {/* <div className="form-check">
                                                <input
                                                    className="form-check-input checkbox"
                                                    type="checkbox"
                                                />
                                            </div> */}
                                            <button
                                                className="delete"
                                                onClick={() => {
                                                    deleteTask(task);
                                                }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center bg-light py-2 mx-auto my-3 px-3 fs-5 w-25">
                {taskList && taskList[0]?.label === "sample task"
                    ? taskListLength - 1
                    : taskListLength}{" "}
                tasks left to do!
            </div>
        </>
    );
};

export default Tasklist;
