import { useEffect, useState } from 'react';
import * as React from 'react';
import 'react-dropdown/style.css';
import './h2app.css';

function App() {

// Initializing all the state variables
const [input, setInput] = useState(0);
const [output, setOutput] = useState("");
const [breakdown, setBreakdown] = useState("");

useEffect(() => {
	convert_to_decimal()
}, [input]);

// Function to convert to decimal
function convert_to_decimal() {
    let len = input.length;
    let result = "";
    let deci = 0;
    if (input === 0) {
        result = "Invalid string, empty"
    } else if (len % 2 === 1) {
        result = "Invalid, string should be even numbered";
    } else if (len === 0) {
        result = "Invalid string, empty"
    } else {
        for (let i = 0; i < input.length; i=i+2) {
            let hex, deci = 0;
            let ch = "";
            deci = parseInt(input[i], 16) * 16 + parseInt(input[i+1], 16);
            ch = String.fromCharCode(deci)
            result += ch;
          }
    }
	get_breakdown(result)
	setOutput(result);
}

function get_breakdown(result) {
    if (result.length >= 14) {
        setBreakdown(" ")
    } else {
        let br = []
        let bd = ""
        bd = "Manufacturer: " + result.slice(1,3)
        br.push(bd)
        br.push(<br/>)
        bd = "Identifier: " + result.slice(4,14 )
        br.push(bd)
        br.push(<br/>)
        // bd = "Time: " + result.slice(18,20) + ":" + result.slice(20,22) + ":" + result.slice(22,24)
        // br.push(bd)
        // br.push(<br/>)
        setBreakdown(br)
    }
}


return (
	<div className="App">
	<div className="h1">
		<h1>H02 Protocol Decoder</h1>
	</div>
	<div className="container">
		<div className="left">
		<h3>H02 Packet (Hex)</h3>
        <textarea type="text"
			placeholder="2a"
			onChange={(e) => setInput(e.target.value)} />
		</div>
	</div>
    <p></p>
    <div className='buttond'>
        <button onClick={()=>{convert_to_decimal()}}>Convert</button>
    </div>
	<div className="container">
        <div className="left">
		<h3>Converted Decimal</h3>
        <p>{output}</p>
	</div>
    </div>
        <div className="left">
		<h3>Breakdown</h3>
        <p>{breakdown}</p>
        </div>
	</div>
);
}

export default App;
