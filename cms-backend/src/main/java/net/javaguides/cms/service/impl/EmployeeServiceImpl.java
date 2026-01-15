package net.javaguides.cms.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.cms.dto.EmployeeDto;
import net.javaguides.cms.entity.Employee;
import net.javaguides.cms.mapper.EmployeeMapper;
import net.javaguides.cms.repository.EmployeeRepository;
import net.javaguides.cms.service.EmployeeService;
import org.springframework.stereotype.Service;
import net.javaguides.cms.exception.ResourceNotFoundException;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto getEmployeeById(Long employeeId){
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with given id:"+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto){
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
}
