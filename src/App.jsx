import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import ogs from 'open-graph-scraper';
import ky from 'ky';

function App() {
  const [count, setCount] = useState(0);

  ky.post('https://reactjs.org', {json: {foo: true}})
    .then(data => console.log(data.json()))
  
  // ogs(
  //   {html: data}
  // ).then(data => {
  //   console.log(data);
  // })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
