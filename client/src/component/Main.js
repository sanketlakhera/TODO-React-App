import React, { useState, useEffect } from "react";
import Nav from "./Nav";

function Main({ socket }) {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const generateID = () => Math.random().toString(36).substring(2, 10);

    const handleAddTodo = (e) => {
        e.preventDefault();
        socket.emit("addTodo", {
            id: generateID(),
            todo,
            comments: [],
        });
        setTodo("");
    };

    useEffect(() => {
        socket.on("todos", (data) => setTodoList(data));
    }, [socket]);

    return (
        <div>
            <Nav />
            <form className='form' onSubmit={handleAddTodo}>
                <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className='input'
                    required
                />
                <button className='form__cta'>ADD TODO</button>
            </form>

            <div className='todo__container'>
                {todoList.map((item) => (
                    <div className='todo__item' key={item.id}>
                        <p>{item.todo}</p>
                        <div>
                            <button className='commentsBtn'>View Comments</button>

                            <button className='deleteBtn'>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;