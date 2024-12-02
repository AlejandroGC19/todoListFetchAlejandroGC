import React from "react";

const List = ({list, updateTask,allTasks}) => {
    return (
        <ul className="list-group pe-3 fs-1">
            {allTasks ?
            list.map((task)=>{
                return (
                    <li key={task.id} className={task.is_done ? "list-group-item border border-success rounded d-flex justify-content-between p-0 w-100 my-1" : "list-group-item border-0 d-flex justify-content-between p-0 w-100 my-1"}>
                        <span className="taskText ms-2">
                            {task.label}
                        </span>
                        <span className="d-flex align-items-center">
                            <button className={(!task.is_done && "deleteButton") + " border-0 me-2"} onClick={updateTask}><i id={task.id} className={task.is_done ? "fa-solid fa-circle-check" : "fa-duotone fa-solid fa-x fa-xs text-danger"} aria-readonly={task.label}></i></button>
                        </span>
                    </li>
                )
            }) 
            : list.map((task)=>{
                return (!task.is_done &&
                    <li key={task.id} className="list-group-item border-0 d-flex justify-content-between p-0 w-100 my-1">
                        <span className="taskText">
                            {task.label}
                        </span>
                        <span>
                            <button className="deleteButton border-0 mb-2" onClick={updateTask}><i id={task.id} className="fa-duotone fa-solid fa-x fa-xs text-danger" aria-readonly={task.label}></i></button>
                        </span>
                    </li>
                )
            })
            }
        </ul>
    );
}

export default List