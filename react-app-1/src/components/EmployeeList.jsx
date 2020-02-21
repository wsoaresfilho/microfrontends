import React, { PureComponent } from 'react';
import Employee from './Employee.jsx';
import './employee.css';

class EmployeeList extends PureComponent {
	render() {
        const { employees, editEmployee, deleteEmployee } = this.props;
		const employeesItems = employees.map(employee =>
            <Employee
                key={employee.id}
                editEmployee={editEmployee}
                deleteEmployee={deleteEmployee}
                employee={employee}
            />
        );
        
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
                        <th>Actions</th>
					</tr>
					{employeesItems}
				</tbody>
			</table>
		);
	};
};

export default EmployeeList;