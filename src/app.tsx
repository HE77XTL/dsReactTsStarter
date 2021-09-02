import React from 'react';
import './a.css';
import './app.less';
import axios from 'axios'


// @ts-ignore
import ironman from './ironman.jpg'


// @ts-ignore
import Va from 'Components/va'

function App() {
    axios.get("/api/").then(res => {
        console.log(res)
    })


    return (
        <div className='App'>
            Hello World-斗鱼体
            <div className='iconMan' />
            <div>
                <img src={ironman} style={{width: '200px'}} alt=""/>
            </div>
            <Va/>
        </div>
    );
}

export default App;
