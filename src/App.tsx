import "./resultcard.css"
import './App.css'

import { QuizCard } from './QuizCard'
import { useState } from 'react'
import { words } from './words'
import { ResultCard } from "./ResultCard"

// 🔄 Shuffle helper
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

function buildOptions(correct: string, allWords: typeof words) {
  // hämta ALLA felalternativ från ALLA ord
  const allWrong = allWords.flatMap(w =>
    w.options.filter(opt => opt !== w.correct)
  )

  // filtrera bort rätt svar
  const wrong = allWrong.filter(opt => opt !== correct)

  // slumpa fram två fel
  const wrongTwo = shuffle(wrong).slice(0, 2)

  // kombinera rätt + fel och slumpa ordningen
  return shuffle([correct, ...wrongTwo])
}


function App() {
  const [answers, setAnswers] = useState<{ [index: number]: string | null }>({})
  const [submitted, setSubmitted] = useState(false)

  // 🧠 Skapa slumpade ord + slumpade alternativ
  const generateQuiz = () =>
    shuffle(words).map(w => ({
      ...w,
      options: buildOptions(w.correct, words)
    }))

  const [shuffledWords, setShuffledWords] = useState(generateQuiz)

  const handleSelect = (cardIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [cardIndex]: value
    }))
  }

  // 🧮 Räkna score baserat på shuffledWords
  const score = Object.keys(answers).reduce((acc, index) => {
    const i = Number(index)
    if (answers[i] === shuffledWords[i].correct) {
      return acc + 1
    }
    return acc
  }, 0)

  const resetQuiz = () => {
    setAnswers({})
    setSubmitted(false)
    setShuffledWords(generateQuiz())
  }

  return (
    <div className="quiz-container">
      {shuffledWords.map((word, i) => (
        <QuizCard
          key={i}
          swedish={word.swedish}
          options={word.options}
          selected={answers[i] ?? null}
          onSelect={(value) => handleSelect(i, value)}
        />
      ))}

      <button className="btn-submit" onClick={() => setSubmitted(true)}>Submit</button>

{submitted && (
  <ResultCard
    score={score}
    total={shuffledWords.length}
    results={shuffledWords.map((w, i) => ({
      swedish: w.swedish,
      correct: w.correct,
      answer: answers[i] ?? null
    }))}
    onReset={resetQuiz}
  />
)}

    </div>
  )
}

export default App
