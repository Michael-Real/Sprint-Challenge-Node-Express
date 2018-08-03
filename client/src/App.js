import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/actions")
      .then(response => {
        this.setState({ actions: response.data });
    })
      .catch(err => {
        console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.state.actions.map(action => {
            return (
              <li className="actions-list">
                <ul className="actions-ul">
                  {action.project_id}
                  {action.description} 
                  {action.notes}
                  {action.completed}
                  </ul>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;