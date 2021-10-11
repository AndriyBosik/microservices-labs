import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
    const [message, setMessage] = useState(null);
  
    useEffect(() => {
        const fetchMessage = async () => {
            const response = await axios.get("/api/messages/simple");
            setMessage(response.data.text);
        }

        fetchMessage();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {
                message == null ? (<p>Fetching message...</p>) : (<p>Message received: {message}</p>)
                }
            </header>
        </div>
    );
}

export default App;
