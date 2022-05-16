import ReactDOM from 'react-dom';
import App from './App';
import Provider from './context'
import {currentChildren} from './comp/tools/createComp'
import 'antd/dist/antd.css'
import TComps from './comp/comp'
const { Button } = TComps


ReactDOM.render(
  Provider{
    App{
      Button('22')
    }
  }
 ,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
