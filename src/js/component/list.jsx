import React from "react";

const List = ({list, updateTask,allTasks}) => {
    return (
        <ul className="list-group pe-3 fs-1">
            {list.map((task)=>{
                return (
                    !(!allTasks && task.is_done) && 
                    <li key={task.id} className={"list-group-item d-flex justify-content-between p-0 w-100 my-1 " + (allTasks && task.is_done ? "border border-success rounded" : "border-0")}>
                        <span className={"taskText " + (allTasks && task.is_done ? "ms-2" : "")}>
                            {task.label}
                        </span>
                        <span className={allTasks && task.is_done ? "d-flex align-items-center" : ""}>
                            <button className={(!task.is_done ? "deleteButton" : "") + " border-0 me-2"} onClick={updateTask}>
                                <i id={task.id} className={"fa-solid " + (task.is_done ? "fa-circle-check" : "fa-duotone fa-x fa-xs text-danger")} aria-readonly={task.label}></i>
                            </button>
                        </span>
                    </li>
                    )
                })
            }
        </ul>
    )
}

export default List