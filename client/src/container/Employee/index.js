import React from 'react';
import Employee from './Employee';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from './actions';
import { withRouter } from 'react-router-dom';

import Modal from './AddEmployeeModal';
class EmployeeListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      mode: 'add',
      employee: null,
      token: '',
    };
  }

  componentDidMount() {
    this.props.fetchEmployees();
  }

  addEmployee = (employee) => {
    this.props.createEmployee(employee);
  };

  deleteEmployee = () => {};

  updateEmployee = (employee) => {
    this.props.updateEmployee(employee);
    this.setState({ mode: 'add' });
  };

  render() {
    const { employee, location } = this.props;

    return (
      <div className="container">
        {employee?.length === 0 && <h3>No Employees found</h3>}

        <ul className="employee-listing">
          {employee.map((employee, i) => (
            <Employee
              employee={employee}
              key={i}
              handleEdit={(employee) =>
                this.setState({ visible: true, employee, mode: 'update' })
              }
            />
          ))}
        </ul>

        {!location.pathname.includes('employees') && (
          <a
            href="#/"
            className="add-employee"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ visible: true });
            }}
          >
            Add Employee
          </a>
        )}

        <Modal
          employee={this.state.employee}
          visible={this.state.visible}
          mode={this.state.mode}
          addEmployee={this.addEmployee}
          updateEmployee={this.updateEmployee}
          closeModal={() => this.setState({ visible: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ employee, login: { userData } }) => {
  return { employee: employee.employees, userData };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...action,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeListing)
);
