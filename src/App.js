import "./App.css";
import Navbar from "./components/reusable/Navbar";
import { Component } from "react";
import CalculatorSection from "./components/calculatorSection/CalculatorSection";

class App extends Component {
  state = {
    id: 0,
    show_nav: true,
    cal_active: true,
    life_active: false,
    finance_active: false,
  };
  cal = () => {
    this.setState({
      id: 0,
      cal_active: true,
      life_active: false,
      finance_active: false,
    });
  };
  life = () => {
    this.setState({
      id: 1,
      cal_active: false,
      life_active: true,
      finance_active: false,
    });
  };
  finance = () => {
    this.setState({
      id: 2,
      cal_active: false,
      life_active: false,
      finance_active: true,
    });
  };

  render() {
    return (
      <div className="container-body">
        <div className="main-container">
          {this.state.show_nav ? (
            <Navbar
              cal={this.cal}
              life={this.life}
              finance={this.finance}
              cal_active={this.state.cal_active}
              life_active={this.state.life_active}
              finance_active={this.state.finance_active}
            />
          ) : null}
          {this.state.id === 0 ? <CalculatorSection/>: null}
        </div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <div className='main-container'>
//           <Navbar/>
//       </div>

//     </div>
//   );
// }

export default App;
