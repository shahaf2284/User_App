/* eslint-disable react/prop-types */

import { useState,useEffect } from 'react'
import './CssAplication.css'

// import Utils from '../Utils'


function PresentUserSonComp({ user, handleUpdate, handleDelete, handleTodoPost}) {
  
  const [userinfo, setUserinfo] = useState({ street: '', city: '', zipcode: '' })
  const [userData, setUserData] = useState({})
  const [otherDataFlag, setOtherDataFlag] = useState(true)
  const [flag, setFlag] = useState(false)
  const [Clickbackground, setBackground] = useState('')


  useEffect(()=>{
      setUserinfo({
        street: user.address?.street ,
        city: user.address?.city,
        zipcode: user.address?.zipcode
      })
      setUserData(user)
  },[user])


  const handleClick = ()=>{
    setFlag(!flag)
    flag ? setBackground('') : setBackground('rgb(210, 160, 150)')
    handleTodoPost(user.id)
  }

  return (
      <div hidden={user.hidden}>
        <div className={user.task} style={{background: Clickbackground}} >
          <div className='userPresent'>
            <label onClick={()=>handleClick()} > ID :  {user.id} </label> <br />
            Name :  {user.name} <br />
            Email :  {user.email} <br /><br />
            <button onClick={() => setOtherDataFlag(!otherDataFlag)} className='button' style={{ background:'gray', border: 'gray', marginRight:'70px' }}>Other Data</button>
                <div hidden={otherDataFlag} style={{ border:'3px solid black',width:'350px' ,height:'95px' ,marginTop:'20px' ,marginLeft:'-20px', borderRadius: '20px', marginBottom:'10px' }}> 
                  <div style={{marginLeft:'45px' ,marginTop:'10px'}}>
                      Street : <input onChange={(e)=>setUserinfo({...userinfo, street:e.target.value})} type="text" name='street' value={userinfo.street} className='input' /> <br />
                      City : <input onChange={(e)=>setUserinfo({...userinfo, city:e.target.value})} type="text" value={userinfo.city} className='input'/> <br />
                      ZipCode : <input onChange={(e)=>setUserinfo({...userinfo, zipcode:e.target.value})} type="text" value={userinfo.zipcode} className='input' />
                  </div>
              </div>
              <button onClick={() => handleUpdate({ ...userData, address : userinfo })} className='button'>Update</button> 
              <button onClick={() => handleDelete({ ...userData, address : userinfo })} className='button'>Delete</button><br />
            <br />
          </div>
        </div>

      </div>


  )
}

export default PresentUserSonComp