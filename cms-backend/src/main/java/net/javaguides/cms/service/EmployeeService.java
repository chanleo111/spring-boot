package net.javaguides.cms.service;

import net.javaguides.cms.dto.EmployeeDto;
public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

}
