import React from "react";

const List = ({list, deleteTask}) => {
    return (
        <ul className="list-group pe-3 fs-1">
            {
            list.map((task,index)=>{
                return (
                    <li key={index} className="list-group-item border-0 d-flex justify-content-between p-0 w-100">
                        <span className="taskText">
                            {task}
                        </span>
                        <span>
                            <button id={index} className="deleteButton border-0 mb-2" onClick={deleteTask}><i className="fa-duotone fa-solid fa-x fa-xs text-danger"></i></button>
                        </span>
                    </li>
                )
            })
            }
        </ul>
    );
}

export default List