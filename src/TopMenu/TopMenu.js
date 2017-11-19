import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import ExpenseTable from '../ExpenseTable/ExpenseTable.js'
import AddExpenseButton from '../Buttons/AddExpenseButton.js'
import Friends from '../Friends/Friends.js'
import Login from '../Login/Login.js'
import Suggestion from '../Suggestion/Suggestion.js'
import ExpenseBarChart from '../ExpenseTable/ExpenseBarChart.js'
import OweChart from '../Friends/OweChart.js'
import ExpensePieChart from '../ExpenseTable/ExpensePieChart.js'
import SuggestionBarChart from '../Suggestion/SuggestionBarChart.js'
import Total from '../ExpenseTable/Total.js'
import axios from 'axios'

class TopMenu extends Component {

  constructor() {
    super();
    this.state = {clicked: false, inputPanel: <Segment>
      <Total>
      </Total>
    <ExpenseTable>
    </ExpenseTable>
    <ExpenseBarChart>
    </ExpenseBarChart>
    <ExpensePieChart>
    </ExpensePieChart>
    </Segment>};
    this.handleItemClick1 = this.handleItemClick1.bind(this);
    this.handleItemClick2 = this.handleItemClick2.bind(this);
    this.handleItemClick3 = this.handleItemClick3.bind(this);
  }


  render() {
    var weatherNetworkBaseUrl = "https://hackathon.pic.pelmorex.com/api";
    var precipUrl = "https://hackathon.pic.pelmorex.com/api/precip/date?locationcode=CAON0383&locale=en-CA";
    var dataShort = "https://hackathon.pic.pelmorex.com/api/data/shortterm?locationcode=CAON0383";

    axios.get(weatherNetworkBaseUrl + '/search/string?keyword=London&prov=ON')
      .then(function (res) {
        var locationCode = res.data.code;
        console.log(locationCode);
      })
      .catch(console.log)

    axios.get(precipUrl)
      .then(function (res) {
        var verylongspeech = res.data.speech;
        console.log(verylongspeech);
      })
      .catch(console.log)
    axios.get(dataShort)
      .then(function (res) {
        var dataValue = res.data;
        // console.log(dataValue.data);
        var dataList = [];
        var suggestionList = [];
  
        // for (var i = 0; i < dataValue.length; i++) {
        //   if (res.dat.period == 3) {
        //     dataList[i] = dataValue.date;
        //   }
        //   if (dataValue.rain >= 0.7) {
        //     suggestionList[i] = "There will be a high chance of rain today! Please dress appropriately and bring an umbrella in case.";
        //   }
        //   if (dataValue.snow >= 0.7) {
        //     suggestionList[i] = "There will be a high chance of snow today! Please wear a jacket and your winter boots.";
        //   }
        // }

        dataValue.data.forEach(function(element) {
          if (element.period === 3) {
            dataList.push(element.date);
          }
          if (element.rain >= 0.7) {
            suggestionList.push("There will be a high chance of rain today! Please dress appropriately and bring an umbrella in case.");
          }
          if (element.snow >= 0.7) {
            suggestionList.push("There will be a high chance of snow today! Please wear a jacket and your winter boots.");
          }
        }, this);
        // for (var i = 0; i < dataList.data.length; i++) {
        //   console.log(dataList[i]);
        //   console.log(suggestionList[i]);
        // }
        //console.log(dataValue);
      })
      .catch(console.log)

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='Expense Page' onClick={this.handleItemClick1} />
          <Menu.Item name='Owe Page' onClick={this.handleItemClick2} />
          <Menu.Item name='Budgeting' onClick={this.handleItemClick3} />
          <Menu.Menu position='right'>
            <Login></Login>
          </Menu.Menu>
        </Menu>

        {this.state.inputPanel}


      </div>
    )
  }
  handleItemClick1() {
    this.setState({clicked: true,inputPanel: 
    <Segment>
    <Total>
    </Total>
    <ExpenseTable>
    </ExpenseTable>
    <div className="row" style="display:inline; width:100%">

    <ExpenseBarChart style="width:50%">
    </ExpenseBarChart>
    <ExpensePieChart style="width:50%">
    </ExpensePieChart>
</div>
    </Segment>});
}
handleItemClick2() {
  this.setState({clicked: true,inputPanel: 
  <Segment>
  <Friends>
  </Friends>
  <OweChart>
    </OweChart>
  </Segment>});
}
handleItemClick3() {
  this.setState({clicked: true,inputPanel: 
  <Segment>
  <Suggestion>
  </Suggestion>
  <SuggestionBarChart>
  </SuggestionBarChart>
  </Segment>});
}
}



export default TopMenu;
