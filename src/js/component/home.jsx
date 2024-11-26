import React, {useState} from "react";
import List from "./list";

//create your first component
const Home = () => {
	const [textInput, setTextInput] = useState("");
	const [list, setList] = useState([]);

	function addTask (e){
		if (e.key === "Enter") {
			if (e.target.value === "") alert("Task can't be empty");
			else {
				localStorage.setItem(textInput,textInput)
				setList([...list, textInput]);
				setTextInput("");
			}
		}
	}

	function deleteTask(index){
		let resultado = [...list];
		resultado.splice(index.target.id,1);
		setList(resultado);
	}

	return (
		<>
			<h1 className="title mb-5 text-center">todos</h1>
			<div className="container main d-flex flex-column justify-content-center w-75">
				<input className="w-100 border-0 mb-3" id="input" type="text" onChange={e => setTextInput(e.target.value)} onKeyDown={addTask} value={textInput} placeholder="What needs to be done?"/>
				<List list={list} deleteTask={deleteTask}/>
				<p className="items-left text-start ps-2 mt-3">{list.length} {list.length === 1 ? "item" : "items"} left</p>
			</div>
		</>
	);
};

export default Home;
