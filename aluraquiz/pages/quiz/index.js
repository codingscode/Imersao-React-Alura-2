import React, { useEffect, useState } from 'react'
import db from '../../db.json'
import Widget from '../../src/components/Widget'
import QuizLogo from '../../src/components/QuizLogo'
import QuizBackground from '../../src/components/QuizBackground'
import QuizContainer from '../../src/components/QuizContainer'
import Button from '../../src/components/Button'
import AlternativesForm from '../../src/components/AlternativesForm'
import BackLinkArrow from '../../src/components/BackLinkArrow'



function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
               Tela de Resultado
            </Widget.Header>

            <Widget.Content>
              <p>Você acertou {results.reduce((somatoriaAtual, resultAtual) => {
                    if (resultAtual == true) {
                        return somatoriaAtual + 1
                    }
                    else {
                        return somatoriaAtual  
                    }
                    }, 0)} perguntas</p>
              <ul>
                  {results.map((result, indice) => (
                    <li key={indice}>
                        {`#0${indice + 1} Resultado: ${result === true ? ' Acertou' : ' Errou'}`}
                       {/*  #{indice + 1} Resultado: 
                        {result === true ? 'Acertou' : 'Errou'} */}
                    </li>
                  ))}
              </ul>
            </Widget.Content>
        </Widget>
    )
}


function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
              Carregando...
            </Widget.Header>

            <Widget.Content>
              [Desafio do Loading]
            </Widget.Content>
        </Widget>
    )
}

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit, addResult }) {
    const [selectedAlternative, setSelectedAlternative] = useState(undefined)
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false)
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer
    const hasAlternativeSelected = selectedAlternative !== undefined


    return (
      <Widget>
          <Widget.Header>
              <BackLinkArrow href="/" />
              { <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3> }
          </Widget.Header>
          <img alt="Descrição" style={{width: '100%', height: '150px', objectFit: 'cover'}} src={question.image} />
          <Widget.Content>
              <h2>{question.title}</h2>
              <p>{question.description}</p>
              <AlternativesForm onSubmit={(infosDoEvento) => { 
                  infosDoEvento.preventDefault()
                  setIsQuestionSubmited(true)
                  setTimeout(() => {
                      addResult(isCorrect)
                      onSubmit()
                      setIsQuestionSubmited(false)
                      setSelectedAlternative(undefined)  
                  }, 2000)
                }} >
                  {question.alternatives.map((alternative, alternativeIndex) => {
                      const alternativeId = `alternative__${alternativeIndex}`
                      const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR' 
                      const isSelected = selectedAlternative === alternativeIndex

                      return (
                        <Widget.Topic key={alternativeId} htmlFor={alternativeId} as="label" data-selected={isSelected}
                              data-status={isQuestionSubmited && alternativeStatus}  >
                            <input id={alternativeId} type="radio" name={questionId} 
                                 onChange={() => setSelectedAlternative(alternativeIndex)} style={{display: 'none'}} />
                            {alternative}
                        </Widget.Topic>
                      )
                  })}
                  {/* <pre>
                      {JSON.stringify(question, null, 4)}
                  </pre> */}
                  <Button type="submit" disabled={!hasAlternativeSelected} >Confirmar</Button>
                  <p>{selectedAlternative}</p>
                  {isQuestionSubmited && isCorrect && <p>Você acertou !</p> }
                  {isQuestionSubmited && !isCorrect && <p>Você errou !</p> }
                                    
              </AlternativesForm>
          </Widget.Content>
      </Widget>
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT'
}

export default function QuizPage() {
        const [screenState, setScreenState] = useState(screenStates.LOADING)
        const [results, setResults] = useState([])
        const [currentQuestion, setCurrentQuestion] = useState(0)
        const questionIndex = currentQuestion
        console.log('db.questions: ', db.questions)
        const question = db.questions[questionIndex]
        const totalQuestions = db.questions.length

        function addResult(result) {
            setResults([...results, result])
        }

        useEffect(() => {
            setTimeout(() => {
               setScreenState(screenStates.QUIZ)
            }, 2000)

        }, [])

        function handleSubmitQuiz() {
            const nextQuestion = questionIndex + 1
            if (nextQuestion < totalQuestions) {
                setCurrentQuestion(nextQuestion)
            }
            else {
                setScreenState(screenStates.RESULT)
            }
        }
    
        return (
            <QuizBackground backgroundImage={db.bg}>
              <QuizContainer>
                  <QuizLogo />
                  {screenState === screenStates.QUIZ && (
                     <QuestionWidget onSubmit={handleSubmitQuiz} question={question} totalQuestions={totalQuestions} 
                         questionIndex={questionIndex} addResult={addResult} />
                  )}
                  {screenState === screenStates.LOADING && ( <LoadingWidget /> )}
                  {screenState === screenStates.RESULT && <ResultWidget results={results} /> }
              </QuizContainer>
            </QuizBackground>
        )
}