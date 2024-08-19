/* eslint-disable react/prop-types */
import { useState } from 'react'
import './CssAplication.css'


function AddUser( { handleAddUser } ) {

    const [user, setUser] = useState({})
    const [flag, setflag] = useState(false)


    const clickHandle = (type) =>{
        switch(type){
            case 'Cancel':
                user.type = type
                handleAddUser(user)
                break
            case 'Add':
                if(user.name === '' || user.email === '' || user.name===undefined){
                    setflag(!flag)
                    break
                }
                else{
                    user.type = type
                    handleAddUser(user)
                    break
                }
            default:
                break
        }
    }

        return (
            <div >
                <p style={{marginLeft:'10px'}}>
                    Add New User <br />
                </p>
                <div style={{border:'solid 2px black ',width:'350px'}}><br/>
                    <p style={{marginLeft:'20px'}}>
                        Name : <input type='text' onChange={e=>setUser({...user, name: e.target.value})} style={{width:'120px', marginLeft:'16px',marginBottom:'10px'}}/> <br />
                        Email : <input type='text' onChange={e=>setUser({...user, email: e.target.value})} style={{width:'120px', marginLeft:'20px',marginBottom:'20px'}}/>
                    </p>
                    {flag && <p style={{color:'red', marginLeft:'20px'}}>One of the fill fields is empty</p>}
                    <button onClick={()=>clickHandle("Cancel")} className='button' style={{margin:'5px 10px 15px 210px'}}>Cancel</button>
                    <button onClick={()=>clickHandle("Add")} className='button' style={{marginTop:'5px'}}>Add</button>
                </div>
            </div>
        )
    }
export default AddUser
