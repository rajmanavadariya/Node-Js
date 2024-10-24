import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function Dashboard() {

    const [admin,setAdmin]=useState({
        name: '',
        email: '',
        task: '',
      });
    
      
      const navigate=useNavigate();

    
    
      const handleChange = (e)=> {
        const { name, value } = e.target
        setAdmin((prevstate)=>({
          ...prevstate,
          [name]: value
        }))
      }
    
    
      
    
      const handlesubmit=async(e)=>{
        e.preventDefault();
    
       await axios.post('http://localhost:5555/admin/insertadmin', admin,{withCredentials:true})
        .then((res)=>{
           console.log(res)      
        })
        .catch((err)=>{
          console.log(err);
        })
        navigate('/Viewdash')

        
      }
      


  return (

   <div>
        <div className="header">

           <nav>
             <div className="logo">
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73KQfwMYmBJTnUqU1dF4BlWG4EOSSRn_h2A&s" alt="" />
             </div>
             <ul>
              <li><a href="/">SignUp</a></li>
              <li><a href="/Login">Login</a></li>
              <li><a href="/" id='btn'>Logout</a></li>
             </ul>
           </nav>
 </div>
      <div className="container">
       

      <div className="form-wrapper">
        <h2>Add Customer Product</h2>
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Enter Customer name" name='name' value={admin.name} onChange={handleChange} /><br /><br />
            <input type="email" placeholder="Enter Customer email" name='email' value={admin.email} onChange={handleChange} /><br /><br />
            <input type="text" placeholder="Enter Customer Product" name='task' value={admin.task} onChange={handleChange} /><br /><br />
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>

      )
}

export default Dashboard;