import { date } from 'joi';
import React, { useState } from 'react'

function Todo() {
const[input,setinput] = useState("");
const [todoLists,setTodolists] = useState([])
const[isEdit,setisEdit] = useState(false);
const [id,setId] = useState("")
const onhandleSubmit = (e) =>{
    e.preventDefault();
const date = Date.now();
if(isEdit){
    const updatedList = todoLists.map(item => (item.id === id ? { ...item, name: input } : item));
      setTodolists(updatedList);
      setinput("");
      setisEdit(false);
}else{

    setTodolists([...todoLists,{name:input,id:date}])
    setinput("");

}

}


const deleteitem = (id) => {
    const updatedList = todoLists.filter((data)=>data.id !== id)
     setTodolists(updatedList)
}


const handleEdit = (id,name) =>{
    setId(id)
  setisEdit(true)
  setinput(name)
}


  return (
    <div>
<form onSubmit={(e)=>onhandleSubmit(e)}>
<label></label>
<input placeholder='add something...' value={input} onChange={(e)=>{setinput(e.target.value)}}/>
<button type='submit' className='btn'>{isEdit?'Update':'Add'} </button>
</form>

<div>
{
    todoLists && todoLists.map((item,index)=>{
        return(
            <div key={index} className='lists'>
        <p>{item.name}</p>
        <button className='btn' onClick={()=>{handleEdit(item.id,item.name)}}>edit</button>
        <button onClick={()=>deleteitem(item.id)} className='btn'>del</button>
            </div>
        )
    })
}

</div>


    </div>
  )
}

export default Todo;