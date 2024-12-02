import React, {useEffect, useState} from "react";
import List from "./list";

//create your first component
const Home = () => {
	const [textInput, setTextInput] = useState("");
	const [userInput, setUserInput] = useState("");
	const [allTasks, setAllTasks] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [listServer, setListServer] = useState([]);
	const [userName, setUserName] = useState("");
	
	const getUsers = async () => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100",{
				method:'GET'
			});
			if (response.ok){
				let data = await response.json();
				setAllUsers(data.users);
				return true;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}
	useEffect(()=>{
		const getUsersFirst = getUsers;
		getUsersFirst();
	},[]);

	const createUser = async (nameText) => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/users/"+nameText,{
				method:'POST'
			});
			setUserName(nameText);
			getTodoList(nameText);
			if (response.ok){
				console.log("User created: " + nameText);
				getUsers();
				return true;
			} else{
				console.log("User can't be created");
				return false;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}

	const deleteUser = async () => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/users/"+userName,{
				method:'DELETE'
			});
			if (response.ok){
				console.log("User deleted: " + userName);
				getUsers();
				return true;
			} else{
				console.log("User can't be deleted");
				return false;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}
	
	const createToDo = async (taskText) => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/todos/"+userName,{
				method:'POST',
				body: JSON.stringify({
					"label": taskText,
					"is_done": false
				  }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok){
				let data = await response.json();
				console.log("Task added: ");
				console.log(data);
				setListServer([...listServer, data]);
				return true;
			} else{
				console.log("Task no added");
				return false;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}
	
	const updateTodoList = async (taskID,taskText,visible) => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/todos/"+ taskID,{
				method:'PUT',
				body: JSON.stringify({
					"label": taskText,
					"is_done": visible
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok){
				console.log("Task completed: " + taskText);
				getTodoList(userName);
				return true;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}

	const getTodoList = async (nameText) => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/users/"+nameText,{
				method:'GET'
			});
			if (response.ok){
				let data = await response.json();
				console.log("Tasks on server:");
				console.log(data.todos);
				setListServer(data.todos);
				return true;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}

	const deleteList = async (taskID,taskText) => {
		try{
			let response = await fetch("https://playground.4geeks.com/todo/todos/"+taskID,{
				method:'DELETE'
			});
			if (response.ok){
				console.log("Task deleted: " + taskText);
				return true;
			}else{
				console.log("Task no deleted: " + taskText);
				return false;
			}
		} catch (error){
			console.log("FETCH ",error);
			return ;
		}
	}

	function addTask (e){
		if (e.key === "Enter") {
			if (e.target.value === "") alert("Task can't be empty");
			else if (userName === "") alert("Introduce your user");
			else {
				createToDo(textInput);
				setTextInput("");
			}
		}
	}
	
	function addUser (e){
		if (e.key === "Enter") {
			if (e.target.value === "") alert("User can't be empty");
			else {
				if (allUsers.some((user)=>user.name === userInput)){
					setUserName(userInput);
					getTodoList(userInput);
				} else {
					createUser(userInput);
				}
				setUserInput("");
			}
		}
	}
	
	function updateTask(index){
		updateTodoList(index.target.id,index.target.ariaReadOnly,index.target.className.includes("duotone"));
		setListServer(listServer);
	}
	
	function deleteAllTask (){
		listServer.map((task)=>{
			deleteList(task.id, task.label);
		});
		setListServer([]);
	}

	function deleteUserFunc (){
		deleteUser();
		setUserName("");
		setListServer([]);
	}

	return (
		<>
			<h1 className="title mb-3 text-center">todos</h1>
			<h2 className="text-center my-3">User: {userName}</h2>
			<div className="container d-flex justify-content-center gap-3 my-4">
				<div className="row d-flex justify-content-between justify-items-center w-75">
					<div className="col-12 col-lg-5 my-4">
						<div className="input-group flex-nowrap">
							<span className="input-group-text" id="addon-wrapping"><i className="fa-regular fa-user"></i></span>
							<input type="text" className="form-control" onChange={e => setUserInput(e.target.value)} onKeyDown={addUser} value={userInput} placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/>
						</div>
					</div>
					<button className="btn btn-secondary col-5 col-lg-2 m-2" onClick={()=>setAllTasks(!allTasks)}>{allTasks ? "Hide done" : "Show all"} tasks</button>
					<button className="btn btn-warning col-5 col-lg-2 m-2" onClick={deleteUserFunc}>Delete user</button>
					<div className="d-flex justify-content-center col-lg-2">
						<button className="btn btn-danger col-12 m-2" onClick={deleteAllTask}>Clear TODO list</button>
					</div>
				</div>
			</div>
			<div className="container main d-flex flex-column justify-content-center w-75 mb-3">
				<input className="w-100 border-0 mb-3" id="input" type="text" onChange={e => setTextInput(e.target.value)} onKeyDown={addTask} value={textInput} placeholder="What needs to be done?"/>
				<List list={listServer} updateTask={updateTask} allTasks={allTasks}/>
				<div className="d-flex justify-content-between mt-3">
					<p className="items-left ps-2">{listServer.filter((task)=>!task.is_done).length} {listServer.filter((task)=>!task.is_done).length === 1 ? "item" : "items"} to do</p>
					<p className="items-left pe-2">Total: {listServer.length} {listServer.length === 1 ? "item" : "items"}</p>
				</div>
			</div>
		</>
	);
};

export default Home;
