import { useState } from 'react'

function Button({text, handleClick}) {
  return <button onClick={handleClick}>{text}</button>
}


function Vote({vote}) {
  if (vote) {
    return <p>has {vote} votes.</p>
  }
  return <p>has 0 votes.</p>
}


function HighestVotedAnecdote({votes, anecdotes}) {
  votes = {...votes}
  let voteValuesArray = Object.values(votes)
  let highestVote = Math.max(...voteValuesArray)

  for (const key in votes) {
    if (votes[key] === highestVote) {
      return (
        <>
          <p>{anecdotes[key]}</p>
          <Vote vote={highestVote}/>
        </>
      )
    }
  }
}


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleOnClick = () => {
    const anecdotesLength = anecdotes.length
    let index = Math.floor(Math.random() * anecdotesLength)
    
    // Ensure that duplicate numbers(array indexes) aren't generated successively.
    if (selected !== index) {
      setSelected(index)
    } else {
      let newIdx = Math.floor(Math.random() * anecdotesLength)
      setSelected(newIdx)
    }
  }

  const handleVoting = () => {
    const pointsCopy = {...votes}

    // Update vote of ancedote.
    if (pointsCopy[selected]){
      pointsCopy[selected] += 1
      setVotes(pointsCopy)
    } else{
      // Set initial value of vote for ancedote.
      pointsCopy[selected] = 1
      setVotes(pointsCopy)
    }
  }

  return (
    <>
      <div>
        <strong><h2>Anecdote of the day.</h2></strong>
        {anecdotes[selected]}
      </div>

      <div>
        <Vote vote={votes[selected]}/>
        <Button text="vote" handleClick={handleVoting}/>
        <Button text="Next Ancedote" handleClick={handleOnClick}/>
      </div>

      <div>
        <strong><h2>Anecdote with most votes</h2></strong>
        
        <HighestVotedAnecdote votes={votes} anecdotes={anecdotes}/>
      </div>
    </>
  )
}

export default App
