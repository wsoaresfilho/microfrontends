import React, { Component } from 'react';
import ReactModal from 'react-modal';
import EmployeeList from './components/EmployeeList.jsx';
import './App.css';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(58, 58, 58, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '400px',
        minHeight: '200px'
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            modalIsOpen: false,
            modalIsEditing: false,
            editingId: null,
            fname: '',
            lname: '',
            desc: '',
        };

        ReactModal.setAppElement(props.name ? `${props.name}` : '#root');

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewEmployee = this.addNewEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.editEmployeeClick = this.editEmployeeClick.bind(this);
    }

    async componentDidMount() {
      let employees = this.props.employees;
      if (!employees) {
        const employeesReturn = await fetch('/api/employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const employeesJson = await employeesReturn.json();
        employees = employeesJson._embedded.employees;
        console.log('employees: ', employees);
      }

      this.setState({ employees: employees });
    }

    openModal(event, isEditing = false) {
        this.setState({
            modalIsOpen: true,
            modalIsEditing: isEditing,
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            modalIsEditing: false,
            fname: '',
            lname: '',
            desc: '',
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async addNewEmployee() {
        const { fname, lname, desc, employees } = this.state;
        const newEmployeeReturn = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'firstName': fname,
                'lastName': lname,
                'description': desc,
            }),
        });
        if (newEmployeeReturn.ok) {
            const newEmployee = await newEmployeeReturn.json();
    
            this.setState({
                employees: employees.concat(newEmployee)
            });
            this.closeModal();
        } else {
            console.error('Something went wrong! The fetching was not successful.')
        }
    }

    async deleteEmployee(id) {
        if (id) {
            const delEmployeeReturn = await fetch(`/api/employees/${id}`, {
                method: 'DELETE',
            });
            if (delEmployeeReturn.ok) {
                this.setState({ employees: this.state.employees.filter((item) => item.id !== id)});
            }
        }
    }

    editEmployeeClick(id) {
        const { employees } = this.state;
        const { firstName, lastName, description } = employees.find((item) => item.id === id);
        this.setEditStates(id, firstName, lastName, description);
        this.openModal(null, true);
    }

    setEditStates(id, fn, ln, des) {
        this.setState({
            editingId: id,
            fname: fn || '',
            lname: ln || '',
            desc: des || '',
        });
    }

    async editEmployee() {
        const { fname, lname, desc, editingId, employees } = this.state;
        if (editingId) {
            const currentEmployee = employees.find((item) => item.id === editingId);
            const link = `/api/employees/${currentEmployee.id}`;
            const editEmployeeReturn = await fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': editingId,
                    'firstName': fname,
                    'lastName': lname,
                    'description': desc,
                }),
            });
            if (editEmployeeReturn.ok) {
                const editedEmployee = await editEmployeeReturn.json();
                console.log(editedEmployee);
                const index = employees.findIndex((item) => item.id === editingId);
                const clonedEmployees = [...employees];
                clonedEmployees[index] = editedEmployee;

                this.setState({
                    employees: clonedEmployees,
                });
                this.closeModal();
            }
        }
    }

    render() {
        const { modalIsOpen, modalIsEditing, fname, lname, desc } = this.state;
        return (
            <div className='main-container'>
                { this.props.name && <h1>{ `App: ${this.props.name}` }</h1> }
                <h2>Employees List:</h2>
                <EmployeeList
                    employees={ this.state.employees }
                    editEmployee={ this.editEmployeeClick }
                    deleteEmployee={ this.deleteEmployee }
                />
                <button className='blue-btn' onClick={ this.openModal }>Add new employee</button>
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={ customStyles }
                    contentLabel={modalIsEditing ? 'Edit Employee Modal' : 'Add New Employee Modal'}
                >

                    <button className='close-btn' onClick={this.closeModal}>X</button>
                    <h2 className='modal-title' >{modalIsEditing ? 'Edit employee form:' : 'Add new employee form:'}</h2>
                    <form>
                        <div className='form-field'>
                            <label htmlFor='first-name'>First name:</label>
                            <input id='first-name' value={fname} name='fname' onChange={ this.handleInputChange } />
                        </div>
                        <div className='form-field'>
                            <label htmlFor='last-name'>Last name:</label>
                            <input id='last-name' value={lname} name='lname' onChange={ this.handleInputChange } />
                        </div>
                        <div className='form-field'>
                            <label htmlFor='description'>Description:</label>
                            <input id='description' value={desc} name='desc' onChange={ this.handleInputChange } />
                        </div>
                        <button type='button' onClick={ modalIsEditing ? this.editEmployee : this.addNewEmployee } className='modal-btn blue-btn'>{ modalIsEditing ? 'Edit' : 'Add' }</button>
                    </form>
                </ReactModal>
            </div>
        );
    }
};

export default App;

