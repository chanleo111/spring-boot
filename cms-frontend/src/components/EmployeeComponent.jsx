import React,{useEffect, useState} from 'react'
import {createEmployee, getEmployee, updateEmployee} from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirsName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {id} = useParams();
  const [error, setErrors] = useState({
      firstName:'',
      lastName: '',
      email: ''
  })
  const navigator = useNavigate ();
  
  useEffect(() => {
      if(id){
        getEmployee(id).then((repsonse) =>{
            setFirsName(repsonse.data.firstName)
            setLastName(repsonse.data.lastName)
            setEmail(repsonse.data.email)
        })
      }
  },[id])
  function saveOrUpdateEmployee(e){
      e.preventDefault();

      if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee);
        if(id){
            updateEmployee(id,employee).then((response)=>{
                console.log(response.data);
                navigator('/employees');
            }).catch(error =>{
                console.error(error);
            })
        } else{
            createEmployee(employee).then((response) => {
            console.log(response.data);
            navigator('/employees')
            }).catch(error =>{
                console.error(error);
            })
        }
      }
  }

  function validateForm(){
    let valid = true;
    const errors = {... error}
    if(firstName.trim()){
        errors.firstName = '';
    }else{
        errors.firstName = 'First name is required';
        valid = false;
    }

    if(lastName.trim()){
        errors.lastName = '';
    }else{
        errors.lastName = 'Last name is required';
        valid = false;
    }

    if(email.trim()){
        errors.email = '';
    }else{
        errors.email = 'Email is required';
        valid = false;
    }

    setErrors(errors);
    return valid;
  }

  function pageTitle(){
    if(id){
        return <h2 className="text-center"> Update Employee</h2>
    }else{
        return <h2 className="text-center"> Add Employee</h2>
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
            {
                pageTitle()
            }
        </div>
        <div className="card">
          <h2 className="text-center"> Add Employee</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-4">
                  <label className="form-lable">First Name:</label>
                  <input type="text"
                         name="firstName"
                         value={firstName}
                         className={`form-control ${error.firstName ? 'is-invalid': '' }`}
                         onChange={(e) => setFirsName(e.target.value)}
                  >
                  </input>
                  {error.firstName && <div className='invalid-feedback'>{error.firstName} </div>}
              </div>

              <div className="form-group mb-2">
                  <label className="form-lable">last Name:</label>
                  <input type="text"
                         name="lastName"
                         value={lastName}
                         className={`form-control ${error.lastName ? 'is-invalid': '' }`}
                         onChange={(e) => setLastName(e.target.value)}
                  >
                  </input>
                  {error.lastName && <div className='invalid-feedback'> {error.email}</div>}
              </div>

              <div className="form-group mb-2">
                  <label className="form-lable">Email:</label>
                  <input type="email"
                         name="email"
                         value={email}
                         className={`form-control ${error.email ? 'is-invalid': '' }`}
                         onChange={(e) => setEmail(e.target.value)}
                  >
                  </input>
                  {error.email && <div className='invalid-feedback'>{error.email} </div>}
              </div>

                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      
     </div>
    </div>
  )
}

export default EmployeeComponent