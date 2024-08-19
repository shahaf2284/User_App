/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Utils from '../Utils'
import { useEffect, useState } from 'react'
import './CssAplication.css'


const posts_Url = 'https://jsonplaceholder.typicode.com/posts'
const todos_Url = 'https://jsonplaceholder.typicode.com/todos'



function TodosComp({ userid, handleTask}) {
    const [posts,setPosts] = useState([])
    const [todos,setTodos] = useState([])
    const [todo,setTodo] = useState({})
    const [post,setPost] = useState({})
    const [completed, setCompleted] = useState(false)
    const [todoList, settodoList] = useState(true)
    const [postList, setpostList] = useState(true)

    const checkcompleted = () => {
      let counter = 1
      for(let todo of todos){
        if(todo.completed) counter+=1
      }
      counter===todos.length ? setCompleted(true) :setCompleted(false)
    }

    useEffect(()=>{
      const getPosts = async () =>{
        const { data } = await Utils.getById(posts_Url, userid)
        data.length === 0 ? setpostList(postList):setpostList(!postList)
        setPosts(data)
    
      }
      const geTodos = async () =>{
        const { data } = await Utils.getById(todos_Url, userid)
        data.length === 0 ? settodoList(todoList):settodoList(!todoList)
        setTodos(data)
      }
      try{
        getPosts()
        geTodos()
      }
      catch(e){
        console.log(e)
      }
      }, [])

    useEffect(()=>{
      checkcompleted()
      if(completed){handleTask(userid)} 
      }, [todos])

    const markCompleted = (todo) => {
      const updteTodos =  todos.filter(item => item.id !== todo.id)
      todo.completed = true
      setTodos([...updteTodos, todo])
    }
  
    const hendleAddTodo = () =>{
      setTodos([...todos, todo])
      settodoList(!todoList)
    }
    const hendleAddPost = () =>{
      setPosts([...posts, post])
      setpostList(!postList)
    }

  return (
    <div className='displaySon' style={{ marginLeft:'150px'}}>

      Todos - User {userid} <button onClick={()=>settodoList(!todoList)} className='button' style={{width:'80px' ,height:'60px',marginTop:'20px',marginLeft:'270px'}}>Add Todos</button>
      <div className='displayTodosAndPosts' hidden={todoList}>
        {
        todos.map((todo,index)=>(
          <div key={index} className='title'>
            <div style={{ margin:'10px' }}>
              Title: {todo.title} <br />
              Completed: {`${todo.completed}`} 
              <button onClick={()=>markCompleted(todo)} className='button' style={{marginLeft:'115px'}} hidden={todo.completed}>Mark Completed</button>
            </div>
          </div>
        ))
        }
      </div>
      <div className='displayTodosAndPosts' hidden={!todoList}>
          <p style={{marginLeft:'100px', height:'100px'}}><br/><br/>Title: <input type='text' onChange={(e)=>setTodo({title:e.target.value, completed:false})} style={{marginLeft:'40px', width:'150px', height:'26px'}}/></p>
          <button className='button' onClick={()=>{settodoList(!todoList)}} style={{marginLeft:'270px', marginBottom:'30px'}}>Cancel</button>
          <button className='button' onClick={()=>hendleAddTodo()} style={{marginLeft:'20px', marginBottom:'30px'}}>Add</button>
      </div>
      <br /> <br />
      Posts - User {userid} <button onClick={()=>setpostList(!postList)} className='button' style={{width:'80px' ,height:'60px' ,marginLeft:'275px',marginBottom:'20px'}}>Add Post</button>
      <div className='displayTodosAndPosts' hidden={postList} >
      {
                posts.map((post,index)=>(
                  <div key={index} className='title'>
                    <p style={{ margin:'10px' }}>Title: {post.title} </p>
                    <p style={{ margin:'10px' }}>body: {`${post.body}`}</p>
                  </div>))
      }
      </div>
      <div className='displayTodosAndPosts' hidden={!postList}>
          <p style={{marginLeft:'100px', height:'100px'}}><br/>
            Title: <input type='text' onChange={(e)=>setPost({...post, title: e.target.value})} style={{marginLeft:'40px', width:'150px', height:'23px'}}/> <br />
            Body: <input type='text' onChange={(e)=>setPost({...post, body:e.target.value})} style={{marginLeft:'35px', width:'150px', height:'23px', marginTop:'10px'}}/>

          </p>
          <button className='button' onClick={()=>{setpostList(!postList)}} style={{marginLeft:'270px', marginBottom:'30px'}}>Cancel</button>
          <button className='button' onClick={()=>hendleAddPost()} style={{marginLeft:'20px', marginBottom:'30px'}}>Add</button>
      </div> 
    </div>

  )
}

export default TodosComp