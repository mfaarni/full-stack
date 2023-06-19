import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) =>(
  <tbody>
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  </tbody>
)

const Statistics = ({good, neutral, bad}) =>{
  if (good || neutral || bad){
  return(
    <div>
      <table>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={good+neutral+bad}/>
      <StatisticLine text='average' value={(1*good+(-1)*bad)/(good+neutral+bad)}/>
      <StatisticLine text='positive' value={(good)/(good+neutral+bad)*100+' %'}/>
      </table>
    </div>
  )
  }
  else{
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}
const Header = ({text}) =>{
  return(
  <div>
    <h1>
      {text}
    </h1>
  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBadClick = () =>{
    setBad(bad+1)
  }  
  const handleNeutralClick = () =>{
    setNeutral(neutral+1)
  }  
  const handleGoodClick = () =>{
    setGood(good+1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text= 'good' />
      <Button handleClick={handleNeutralClick} text= 'neutral' />
      <Button handleClick={handleBadClick} text= 'bad' />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App