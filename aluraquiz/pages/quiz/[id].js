import React from 'react'
import QuizScreen from '../../src/screens/Quiz'
import { ThemeProvider } from 'styled-components'


export default function QuizDaGalera({ dbExterno }) {
   console.log('dbExterno: ', dbExterno)

    return (
         <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen externalQuestions={dbExterno.questions} externalBg={dbExterno.bg} />

         </ThemeProvider>
         
    )
}


export async function getServerSideProps(context) {
      const [projectName, githubUser] = context.query.id.split('__')
      console.log('Infos que o Next dá para nós: ', context.query)  // { name: 'Aladin', id: 'qualquercoisa' }

      try {
         const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
            .then((res) => {
               if(res.ok) {
                  return res.json()
               }
               throw new Error('Falha de acesso')
            })
            .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
            .catch((erro) => {
               return 'houve erro'
            })
   
         //console.log('dbExterno: \n', dbExterno)
   
         return {
            props: { dbExterno }
         }

      }
      catch(error) {
          throw new Error(error)
      }

}


