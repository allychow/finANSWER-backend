import React, {Component} from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import axios from 'axios'
import AddExpenseButton from '../Buttons/AddExpenseButton.js'

class ExpenseTable extends Component {
    constructor() {
        super();
        this.state = {expenses: [], total: 0};
        this.sum = this.sum.bind(this);
        this.timer;
        this.update = this.update.bind(this);
        this.update()
    }
    componentDidMount() {
        var th = this;
        axios.get('http://localhost:3001/api/expenses')
        .then(function (res) {
            console.log(res.data);
            th.setState({expenses:res.data});
            th.sum();
        })
        .catch(console.log)    
    }

    update() {
        var th = this;
        axios.get('http://localhost:3001/api/expenses')
        .then(function (res) {
            console.log(res.data);
            th.setState({expenses:res.data});
            th.sum();
        })
        .catch(console.log)
        window.clearTimeout(th.timer)
        th.timer = window.setTimeout(th.update, 3000) 
    }

    sum() {
        var total = 0;
        this.state.expenses.forEach(function(element) {
            if (element.type == "Deposit" || element.type == "deposit") {
                total += element.amount;
            } else {
                total -= element.amount;
            }
        });
        this.setState({total: total});
        console.log(this.state);

    }

    render() {
        const expensesTableCells = this.state.expenses.map((e) => <Table.Row><Table.Cell>{e.title}</Table.Cell><Table.Cell>{e.amount}</Table.Cell><Table.Cell>{e.type}</Table.Cell></Table.Row>);
        return (
 <div>           
     <h2>
      Total = {this.state.total}$
      </h2>
    <Table celled>        
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Amount ($)</Table.HeaderCell>
        <Table.HeaderCell>Type of Transaction</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {expensesTableCells}
    </Table.Body>
  </Table>

<AddExpenseButton>
</AddExpenseButton>
</div>
        );
    }
}
export default ExpenseTable