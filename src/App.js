import React from "react";
import "./App.css";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: [],
      ratesObj: {},
      inp: 1.0,
      dropdown: [
        "USD",
        "CAD",
        "IDR",
        "GBP",
        "CHF",
        "SGD",
        "INR",
        "MYR",
        "JPY",
        "KRW"
      ],
      curName: ""
    };
  }

  componentDidMount() {
    this.getRates();
  }

  getRates = () => {
    axios
      .get("https://api.exchangeratesapi.io/latest?base=USD")
      .then(response => {
        this.setState({ ratesObj: response.data.rates });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {});
  };
  submit = (val, i) => {
    if (val === "GBP") {
      this.getCurrencyDetails("British Pound", val, i);
    }
    if (val === "CAD") {
      this.getCurrencyDetails("Canadian Dollar", val, i);
    }
    if (val === "IDR") {
      this.getCurrencyDetails("Indonesian Rupee", val, i);
    }
    if (val === "SGD") {
      this.getCurrencyDetails("Singapore Dollar", val, i);
    }
    if (val === "JPY") {
      this.getCurrencyDetails("Japanese Yen", val, i);
    }
    if (val === "KRW") {
      this.getCurrencyDetails("South Korean Won", val, i);
    }
    if (val === "MYR") {
      this.getCurrencyDetails("Malaysian ringgit", val, i);
    }
    if (val === "INR") {
      this.getCurrencyDetails("Indian Rupee", val, i);
    }
    if (val === "CHF") {
      this.getCurrencyDetails("Swiss franc", val, i);
    }
    if (val === "USD") {
      this.getCurrencyDetails("United States Dollar", val, i);
    }
  };

  getCurrencyDetails = (name, val, i) => {
    this.state.dropdown.splice(i, 1);

    this.setState({
      rates: [
        ...this.state.rates,
        { curr: val, curname: name, rate: this.state.ratesObj[val] }
      ],
      dropdown: this.state.dropdown
    });
  };

  remove = i => {
    let val = this.state.rates[i].curr;
    this.state.rates.splice(i, 1);
    this.setState({
      rates: this.state.rates,
      dropdown: [...this.state.dropdown, val]
    });
  };

  render() {
    return (
      <div className="App">
      <div className="main-curr">
            <span  className="main-curr-name">
              USD-United States Dollar
            </span>
          </div>  
      <div className="div-flex">
          
          <div>
            <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>USD</span>
          </div>

          <div className="form-group" style={{ width: "46%" }}>
            <form onSubmit={e => this.submit(e)}>
              <input
                defaultValue={this.state.inp}
                type="text"
                onChange={val => this.setState({ inp: val.target.value })}
                className="form-control"
                id="email"
                style={{ textAlign: "right", fontWeight: "bold" }}
              />
            </form>
          </div>
        </div>
        {this.state.rates.map((val, ind) => {
          console.log(val);
          return (
            <div>
              <div className="minus-flex">
                <div className="items" key={ind}>
                  <div>
                    <span>{val.curr}</span>
                    <br />
                    <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                      {val.curr}-{val.curname}
                    </span>
                    <br />
                    <span style={{ fontStyle: "italic" }}>
                      1 USD= {val.rate.toFixed(4)}
                    </span>
                  </div>
                  <div>
                    <p>{(val.rate * this.state.inp).toFixed(4)}</p>
                  </div>
                </div>
                <div className="minus-button">
                  <div className="m-button">
                    <a
                      onClick={() => {
                        this.remove(ind);
                      }}
                    >
                      (-)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div class="dropdown">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
          >
            (+) Add More Currencies
          </button>

          <div class="dropdown-menu">
            {this.state.dropdown.map((val, ind) => {
              return (
                <a class="dropdown-item" onClick={e => this.submit(val, ind)}>
                  {val}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
