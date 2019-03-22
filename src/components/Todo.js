//use means hook functions
import React, { useState, useEffect, useReducer, useMemo} from 'react';
import axios from 'axios';
import List from './List';
import {useFormInput} from '../hooks/forms';

const todo = props =>{
    //useState passes two values, inputState[0] and inputState[1]. Unlike setState in class based components,
    //  usestate will not merge, but replace entire old state with new one. Use state must be used at the top level of 
    //  component function. Has to be component function. Cannot call useState in loops or any nested functions. Has to be
    //  root level of the component.
    //[todoName, setTodoName] is array destructuring. Pull out elements of an array to assign them
    // const [todoName, setTodoName] = useState('');
//separate useState is not required but reccomended for ease of separation, control, and manipulation

    //Commented out below since we are using reducers in its place
    // const [todoList, setTodoList] = useState([]);
    // const [submittedTodo, setSubmittedTodo] = useState(null);

    const [inputIsValid, setInputIsValid] = useState(false);

    //No longer using due to own hook
    // const todoInputRef = useRef();
    const todoInput =useFormInput()
    

    const todoListReducer = (state, action)=>{
        switch (action.type){
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo)=> todo.id !== action.payload);   
            default:
                return state;
        }
    }


       const [todoList, dispatch]= useReducer(todoListReducer, [])

    // Use effect is function passes another function to be executed when called.
    //For this particular case it will be executed as soon as the component loads
    useEffect(()=>{
        axios.get('https://todolist-1d92c.firebaseio.com/todos.json')
        .then(result =>{
            console.log(result);
            const todoData = result.data
            const todos =[];
            for (const key in todoData){
                todos.push({id: key, name: todoData[key].name})
            }
            //Reducer refactor
            // setTodoList(todos);
            dispatch({type: 'SET', payload: todos})
        })
        //executes this return function on every rerender, can be used as a clean up
        return () =>{
            console.log("Cleanup")
        }
        //adding the empty array as a second argument makes useEffect act like componentDidMount, therefore only loads once
        //No argument will run for every render cycle. 
    }, [])

//commented out because we are dispatching reducers instead
//     useEffect(()=>{
//         if(submittedTodo){
//             //Reducer refactor
//             // setTodoList(todoList.concat(submittedTodo));
//             dispatch({type: 'ADD', payload: submittedTodo});
//         }
//   //runs after everytime submittedTodo changes
//     }, [submittedTodo]
//     )



        //Tracks mouse movements
    // const mouseMoveHandler =event=>{
    //     console.log(event.clientX, event.clientY)
    // }


        // useEffect(()=>{
        //     document.addEventListener('mousemove', mouseMoveHandler)
        //     return()=>{
        //         document.removeEventListener('mousemove', mouseMoveHandler)
        //     }
        // }, [])

    // const inputChangeHandler=(event)=>{
    //     // inputState[1](event.target.value)
    //     setTodoName(event.target.value)
    // }

 const inputValidationHandler = event =>{
    if (event.target.value.trim ===''){
        setInputIsValid(false);
    }else{
        setInputIsValid(true);
    }
 }


    const todoAddHandler=()=>{
        // concat returns new array. new array is passed to setTodolist, then old array is replaced with that
       //Refactor due to our own hook
        // const todoName = todoInputRef.current.value;

        const todoName = todoInput.value;
        axios.post('https://todolist-1d92c.firebaseio.com/todos.json', {name: todoName})
        .then(res=>{
            console.log(res);
            const todoItem= {id: res.data.name, name: todoName};
            // setSubmittedTodo(todoItem)
            // setTodoList(todoList.concat(todoItem));
            dispatch({type:'ADD', payload: todoItem})
        }).catch(err=>{
            console.log(err);
        })
    }

    const todoRemoveHandler = todoId =>{
        axios.delete(`https://todolist-1d92c.firebaseio.com/todos/${todoId}.json`)
        .then(res => {
            dispatch({type: 'REMOVE', payload: todoId})
        })
        .catch(err=>console.log(err))
        
    }

    //   inputState[0] is a reference to latest state
    //inputState[1] is a function we can execute to update state to update 
    return (<React.Fragment>
        {/* Refactor because we created our own hook */}
        {/* <input type='text' placeholder="Todo" ref={todoInputRef} onChange ={inputValidationHandler} style={{backgroundColor: inputIsValid? 'transparent':'red'}}/> */}
        <input type='text' placeholder="Todo" onChange={todoInput.onChange} value={todoInput.value} style={{backgroundColor: todoInput.validity===true? 'transparent':'red'}}/>
        <button type='button' onClick={todoAddHandler}>Add</button>
        {/* only updates the list if todolist changes */}
        {useMemo(()=><List items={todoList} onClick={todoRemoveHandler}/>, [todoList])}
    </React.Fragment>)
};

export default todo;








//     //multiple states in one useState
//  const [todoState, setTodoState] = useState({userInput: '', todoList: []});

//     const inputChangeHandler=(event)=>{
//         setTodoState({
//             userInput: event.target.value, 
//             todoList: todoState.todoList
//         })
//     }

//     const todoAddHandler=()=>{
//         // concat returns new array. new array is passed to setTodolist, then old array is replaced with that
//         setTodoState({
//             userInput: todoState.userInput, 
//             todoList: todoState.todoList.concat(todoState.userInput)
//         })
//     }


//     //inputState[0] is a reference to latest state
//     //inputState[1] is a function we can execute to update state to update 
//     return (<React.Fragment>

//         <input type='text' placeholder="Todo" onChange={inputChangeHandler} value={todoState.userInput}/>
//         <button type='button' onClick={todoAddHandler}>Add</button>
//         <ul>
//             {todoState.todoList.map(todo=>(<li key={todo}>{todo}</li>))}
//         </ul>
//     </React.Fragment>)
// };

// export default todo;