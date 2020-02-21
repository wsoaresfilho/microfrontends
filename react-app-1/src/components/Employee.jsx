import React from 'react';

class Employee extends React.Component {
	render() {
        const { employee: { id, firstName, lastName, description } } = this.props;
		return (
			<tr>
				<td>{firstName}</td>
				<td>{lastName}</td>
				<td>{description}</td>
                <td>
                    <button
                        className='edit-btn action-btn'
                        onClick={() => this.props.editEmployee(id)}
                        title='edit'
                    >
                        e
                    </button>
                    <button
                        className='delete-btn action-btn'
                        onClick={() => this.props.deleteEmployee(id)}
                        title='delete'
                    >
                        x
                    </button>
                </td>
			</tr>
		)
	};
};

export default Employee;