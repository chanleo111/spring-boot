import React,{useState} from 'react'
import {createEmployee} from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirsName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const navigator = useNavigate ();
  
  function saveEmployee(e){
      e.preventDefault();
      const employee = {firstName, lastName, email}
      console.log(employee);

      createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees')
      })
      
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
                         className="form-control"
                         onChange={(e) => setFirsName(e.target.value)}
                  >
                  </input>
              </div>

              <div className="form-group mb-2">
                  <label className="form-lable">last Name:</label>
                  <input type="text"
                         name="lastName"
                         className="form-control"
                         onChange={(e) => setLastName(e.target.value)}
                  >
                  </input>
              </div>

              <div className="form-group mb-2">
                  <label className="form-lable">Email:</label>
                  <input type="email"
                         name="email"
                         className="form-control"
                         onChange={(e) => setEmail(e.target.value)}
                  >
                  </input>
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