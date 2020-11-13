import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import NumberFormat from 'react-number-format'

const method = 'GET'
const url =
    'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,0XBTC,1ST,1WO,AAC,ABCC,ABYSS,ZEC,ZIL,YOYOW&tsyms=USD'

function componentWillMount() {
    axios
        .request({
            url,
            method,
            responseType: 'blob',
        })
        .then(({ data }) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]))
            const link = document.createElement('a')
            link.href = downloadUrl
            link.setAttribute('download', 'file.csv')
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cryptos: [],
        }
    }

    componentDidMount() {
        axios.get(url).then((res) => {
            const cryptos = res.data
            this.setState({ cryptos })
        })
    }

    render() {
        return (
            <div className="App">
                {Object.keys(this.state.cryptos).map((key) => (
                    <div id="crypto-container">
                        <span className="left">{key}</span>
                        <span className="right">
                            <NumberFormat
                                value={this.state.cryptos[key].USD}
                                displayType={'text'}
                                decimalPrecision={2}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </span>
                    </div>
                ))}
                <button onClick={componentWillMount}>Download data</button>
            </div>
        )
    }
}

export default App
