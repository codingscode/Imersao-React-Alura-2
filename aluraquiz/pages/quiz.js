import React, { useEffect, useState } from 'react'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'


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

function QuestionWidget({ question, totalQuestions, questionIndex }) {
    const questionId = `question__${questionIndex}`

    return (
      <Widget>
          <Widget.Header>
              {
                  <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
              }
          </Widget.Header>
          <img alt="Descrição" style={{width: '100%', height: '150px', objectFit: 'cover'}} src={question.image} />
          <Widget.Content>
              <h2>{question.title}</h2>
              <p>{question.description}</p>
              <form>
                  {question.alternatives.map((alternative, alternativeIndex) => {
                      const alternativeId = `alternative__${alternativeIndex}`
                      return (
                        <Widget.Topic htmlFor={alternativeId} as="label" >
                            <input id={alternativeId} type="radio" name={questionId}  />
                            {alternative}
                        </Widget.Topic>
                      )
                  })}
                  <pre>
                      {JSON.stringify(question, null, 4)}
                  </pre>
                  <Button>Confirmar</Button>
              </form>
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
        const questionIndex = 0
        console.log('db.questions: ', db.questions)
        const question = db.questions[questionIndex]
        const totalQuestions = db.questions.length

        useEffect(() => {
            setTimeout(() => {
              setScreenState(screenStates.QUIZ)
    
            }, 1500)

        }, [])

    
        return (
            <QuizBackground backgroundImage={db.bg}>
              <QuizContainer>
                  <QuizLogo />
                  {screenState === screenStates.QUIZ && (
                     <QuestionWidget question={question} totalQuestions={totalQuestions} questionIndex={questionIndex} />
                  )}
                  {screenState === screenStates.LOADING && ( <LoadingWidget /> )}
                  {screenState === screenStates.RESULT && ( <div>Você acertou x questões, parabéns</div> )}
              </QuizContainer>
            </QuizBackground>
        )
}