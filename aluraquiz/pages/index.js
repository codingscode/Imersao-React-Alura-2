import React from 'react'
import styled from 'styled-components'
import db from '../db.json'
import { Widget } from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Input from '../src/components/Input'




export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
      const router = useRouter()
      const [name, setName] = React.useState('')
      console.log('retorno do useState: ', name, setName)
      

      return (
         <QuizBackground backgroundImage={db.bg} >
            <Head>
               <title>AluraQuiz - Modelo Base</title>
            </Head>
            <QuizContainer>
               <QuizLogo />
               <Widget>
                  <Widget.Header>
                     <h1>The legend of zelda</h1>
                  </Widget.Header>
                  <Widget.Content>
                     <form onSubmit={(infoEvento) => {
                         infoEvento.preventDefault()
                         router.push(`/quiz?name=${name}`)
                         console.log('fazendo envio pelo react')
                            }} >
                        <Input placeholder="Seu nome" onChange={(evento) => (setName(evento.target.value)) } />
                        <button type="submit" disabled={name.length === 0} >jogar {name}</button>
                     </form>
                  </Widget.Content>
               </Widget>
               <Widget>
                  <Widget.Content>
                     <h1>Quizes das pessoas</h1>
                     <p>Lorem epson asdihfweh kdfjw ....</p>
                  </Widget.Content>
               </Widget>
               <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl={"https://github.com/codingscode/"} />
         </QuizBackground>

      )
}
