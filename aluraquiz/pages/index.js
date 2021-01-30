import React from 'react'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'
import Link from '../src/components/Link'
import { motion } from 'framer-motion'


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
               <Widget as={motion.section} variants={{ show: {opacity: 1}, hidden: {opacity: 0} }} initial="hidden" animate="show" >
                  <Widget.Header>
                     <h1>The legend of zelda</h1>
                  </Widget.Header>
                  <Widget.Content>
                     <form onSubmit={(infoEvento) => {
                         infoEvento.preventDefault()
                         router.push(`/quiz?name=${name}`)
                         console.log('fazendo envio pelo react')
                            }} >
                        <Input name="nomeusuario" value={name} placeholder="Seu nome" onChange={(evento) => (setName(evento.target.value)) } />
                        <Button type="submit" disabled={name.length === 0} >{`Jogar ${name}`}</Button>
                     </form>
                  </Widget.Content>
               </Widget>
               <Widget>
                  <Widget.Content>
                     <h1>Quizes das pessoas</h1>
                     <ul>
                           {db.external.map((linkExterno, indice) => {
                                const [projectName, githubUser] = linkExterno
                                    .replace(/\//g, '')
                                    .replace('https:', '')
                                    .replace('.vercel.app', '')
                                    .split('.') 

                                return (
                                    <li key={indice} >
                                          <Widget.Topic as={Link} href={`/quiz/${projectName}__${githubUser}`} >
                                             {`${githubUser}/${projectName}`}   
                                          </Widget.Topic>
                                    </li>
                                )
                           })}
                     </ul>
                  </Widget.Content>
               </Widget>
               <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl={"https://github.com/codingscode/"} />
         </QuizBackground>

      )
}
