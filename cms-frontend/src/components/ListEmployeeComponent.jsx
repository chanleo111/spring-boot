import React,{useEffect,useState} from 'react';
import { listEmployees,deleteEmployee} from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { faPenClip,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListEmployeeComponent = () => {
    
    const [employees, setEmployees] = useState([]);
    
    const navigator = useNavigate();
    
    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        } ).catch(error => {
             console.error(error);
        })
    }

    useEffect(() =>{
        getAllEmployees();
    }, [])

    function addNewEmployee(){
        navigator('/add-employee');
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error =>{
            console.error(error)
        })
    }
    
  return (
    <div className="container">
        <div className="row">
            <div className="col-12">
            <button className="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>   
            <h2 className="text-center mt-4 mb-4">List of Employee</h2>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td><button className="btn btn-info" onClick={()=> updateEmployee(employee.id)}><FontAwesomeIcon icon={faPenClip} /></button>
                                    <button className="btn btn-info" onClick={()=> removeEmployee(employee.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                </td>
                                
                            </tr>)
                    }
                </tbody>
            </table>
            </div>       
        </div>
    </div>
  )
}

export default ListEmployeeComponent