import React,{useState} from 'react'
import {createEmployee} from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirsName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [error, setErrors] = useState({
      firstName:'',
      lastName: '',
      email: ''
  })
  const navigator = useNavigate ();
  
  function saveEmployee(e){
      e.preventDefault();

      if(validateForm()){
        const employee = {firstName, lastName, email}
        console.log(employee);
        createEmployee(employee).then((response) => {
            console.log(response.data);
            navigator('/employees')
        })
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

  return (
    <div className="container">
      <div className="row">
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

                <button className="btn btn-success" onClick={saveEmployee}>Submit</button>
            </form>
          </div>
        </div>
      
     </div>
    </div>
  )
}

export default EmployeeComponent