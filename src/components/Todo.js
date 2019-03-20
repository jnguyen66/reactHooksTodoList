//use means hook functions
import React, {useState} from 'react';

const todo = props =>{
//     //useState passes two values, inputState[0] and inputState[1]. Unlike setState in class based components,
//      usestate will not merge, but replace entire old state with new one. Use state must be used at the top level of 
//      component function. Has to be component function. Cannot call useState in loops or any nested functions. Has to be
//      root level of the component.
//     //[todoName, setTodoName] is array destructuring. Pull out elements of an array to assign them
//     const [todoName, setTodoName] = useState('');
// //separate useState is not required but reccomended for ease of separation, control, and manipulation
//     const [todoList, setTodoList] = useState([]);

//     const inputChangeHandler=(event)=>{
//         // inputState[1](event.target.value)
//         setTodoName(event.target.value)
//     }

//     const todoAddHandler=()=>{
//         // concat returns new array. new array is passed to setTodolist, then old array is replaced with that
//         setTodoList(todoList.concat(todoName))
//     }


  //inputState[0] is a reference to latest state
//     //inputState[1] is a function we can execute to update state to update 
//     return (<React.Fragment>

//         <input type='text' placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
//         <button type='button' onClick={todoAddHandler}>Add</button>
//         <ul>
//             {todoList.map(todo=>(<li key={todo}>{todo}</li>))}
//         </ul>
//     </React.Fragment>)
// };

// export default todo;


    //multiple states in one useState
 const [todoState, setTodoState] = useState({userInput: '', todoList: []});

    const inputChangeHandler=(event)=>{
        setTodoState({
            userInput: event.target.value, 
            todoList: todoState.todoList
        })
    }

    const todoAddHandler=()=>{
        // concat returns new array. new array is passed to setTodolist, then old array is replaced with that
        setTodoState({
            userInput: todoState.userInput, 
            todoList: todoState.todoList.concat(todoState.userInput)
        })
    }


    //inputState[0] is a reference to latest state
    //inputState[1] is a function we can execute to update state to update 
    return (<React.Fragment>

        <input type='text' placeholder="Todo" onChange={inputChangeHandler} value={todoState.userInput}/>
        <button type='button' onClick={todoAddHandler}>Add</button>
        <ul>
            {todoState.todoList.map(todo=>(<li key={todo}>{todo}</li>))}
        </ul>
    </React.Fragment>)
};

export default todo;