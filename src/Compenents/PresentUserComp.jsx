/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react'
import Utils from '../Utils'
import './CssAplication.css'
import PresentUserSonComp from './PresentUserSonComp'
import TodosComp from './TodosComp'
import Fuse from 'fuse.js'
import AddUser from './AddUser'

const User_URL = 'https://jsonplaceholder.typicode.com/users'


function PresentUserComp() {
  const [users, setUsers] = useState([])
  const [flagPostTodo, setFlagPostTodo] = useState(false)
  const [userid, setuserid] = useState({})
  const [serchUsers,setSerchUser] = useState([])
  const [flagAdd, setFlagAdd] = useState(true)


  useEffect(()=>{
    const getUser = async ()=>{
        try{
            const { data } = await Utils.getAll(User_URL)
            const userUp = data.map((user)=>{
                user.task='Tasks-not-completed'
                user.hidden=false
                return user})
            setUsers(userUp)
        }
        catch (error) {
            console.error('Error fetching data:', error);
          }
    }   
    getUser()

  },[])


  useEffect(()=>{
    if(serchUsers.length === 0){
      const updatedUser = users.map(user => {
        return {...user, hidden: false }
      })
      setUsers(updatedUser)
    }
    else{
      const updatedUsers = users.map(user => {
        if (serchUsers.includes(user.id)) {
            return { ...user, hidden: false };
          }
          return { ...user, hidden: true };
        })
      setUsers(updatedUsers)
    }
  },[serchUsers])


  
  const handleUpdate = (userinfo) => {
        const Temp = users.filter((user)=>user.id !== userinfo.id) 
        setUsers([ ...Temp, userinfo ])
  };

  
  const handleDelete = (userinfo) => {
    const Temp = users.filter((user)=>user.id !== userinfo.id) 
    setUsers(Temp)
  };

 const handleTodoPost = (id) =>{
    closeAll('postTodo')
    setuserid(id)
    setFlagPostTodo(!flagPostTodo)  
 }

 const handleTask = (id) =>{
    const userUp = users.map((user) =>{ 
      if(user.id === id) {
        user.task='Tasks-completed'
        return user
      }
      else{
        return user
      }
    })
    setUsers(userUp)
 }

  
 const serchUser = (e) => {
    // Fuse.js options
    const options = {
      includeScore: true,
      keys: ['name'],
      threshold: 0.4
    };


    const fuse = new Fuse(users, options);
    const result = fuse.search(e.target.value)
    const ids = result.map(person => person.item.id)
    setSerchUser(ids)
 }

 const closeAll = (option) => {
  switch(option){
    case 'addUser':
      flagPostTodo ? setFlagPostTodo(!flagPostTodo) : setFlagPostTodo(flagPostTodo)
      break
    case 'postTodo':
      flagAdd ? setFlagAdd(flagAdd) : setFlagAdd(!flagAdd)
      break
  }
 }


 const addUser = () => {
    closeAll('addUser')
    setFlagAdd(!flagAdd)
    
 }

const handleAddUser = (ans) => {
  if(ans.type === 'Cancel') {
      closeAll('postTodo')
      return
      }
  setUsers([...users, { id: users.length + 1, name: ans.name, email: ans.email, 
                        address:{street:'',city:'',zipcode:''},
                        task:'Tasks-completed',
                        hidden:false}])
  closeAll('postTodo')
}


//  onChange={serchUser}
   return (
    <div className='container' >
      <div style={{  marginTop:'70px' ,marginLeft:'60px', border:'3px solid black',  borderRadius: '60px', width: '500px' }}>
        <p style={{ marginLeft: '70px' }}>
            Search <input type="text" style={{marginLeft:'30px'}} onChange={serchUser}/> <button style={{marginLeft:'70px'}} onClick={addUser} className={'button'} >Add</button>
        </p>
        {
            users.map((user)=>(              
                <div key={user.id} className='disPlay'>
                    <PresentUserSonComp user={user} handleUpdate={handleUpdate} handleDelete={handleDelete} handleTodoPost={handleTodoPost}/>
                      <div >
                        {flagPostTodo && userid===user.id && <TodosComp userid={userid} handleTask = { handleTask } />}
                      </div>
                </div>
            ))
        }
      </div>
      <div hidden={flagAdd} style={{marginTop:'100px',marginLeft: '60px'}}>
            <AddUser handleAddUser={handleAddUser}/>
          </div>
    </div>

  )
}

export default PresentUserComp

