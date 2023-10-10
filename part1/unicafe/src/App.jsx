import { useState } from 'react'


const Display = ({title}) => <strong><h1>{title}</h1></strong>

const Button = ({text, handleOnClick}) => {
  return(
    <button onClick={handleOnClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  if (text === "Positive"){
    value = `${value}%`
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {text}
          </td>

          <td>
            {value}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  const {total, value} = props

  if (total >= 1){
    return (
      <div>
        <StatisticsLine text="Good" value={value.good} />
        <StatisticsLine text="Neutral" value={value.neutral}/>
        <StatisticsLine text="Bad" value={value.bad}/>
        <StatisticsLine text="Total" value={total}/>
        <StatisticsLine text="Average" value={value.avg} />
        <StatisticsLine text="Positive" value={value.positive} />
      </div>
    ) 
  }

  return <p>No feedback given.</p>
}



function App() {
  const [good, setGoodCount] = useState(0)
  const [neutral, setNeutralCount] = useState(0)
  const [bad, setBadCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setpostiveCount] = useState(0)

  const utils = (newTotal) => {
    let newAverage = newTotal / 3
    let positivePercent = good / newTotal * 100
    
    setTotal(newTotal)
    setAverage(newAverage)
    setpostiveCount(positivePercent)
  }

  const handleGoodBtn = () => {
    let updatedGood = good + 1
    let newTotal = updatedGood + neutral + bad
    utils(newTotal)
    setGoodCount(updatedGood)
  }

  const handleNeutralBtn = () => {
    let updatedNeutral = neutral + 1
    let newTotal = updatedNeutral + good + bad
    utils(newTotal)
    setNeutralCount(updatedNeutral)
  }
  
  const handleBadBtn = () => {
    let newBad = bad + 1
    let newTotal = newBad + good + neutral
    utils(newTotal)
    setBadCount(newBad)
  }

  return (
    <>
      <Display title="Give Feedback."/>
      <Button text="good" handleOnClick={handleGoodBtn}/>
      <Button text="neutral" handleOnClick={handleNeutralBtn}/>
      <Button text="bad" handleOnClick={handleBadBtn}/>

      <Display title="statistics"/>

      <Statistics total={total} 
        value={
          {
            good: good,
            neutral: neutral,
            bad: bad,
            avg: average,
            positive: positive.toFixed(2),
          }
        }
      />
    </>
  )
}

export default App
