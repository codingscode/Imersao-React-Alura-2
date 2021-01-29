import React from 'react'
import QuizScreen from '../../src/screens/Quiz'


export default function QuizDaGalera({ dbExterno }) {
   console.log('dbExterno: ', dbExterno)

    return (
         <QuizScreen externalQuestions={dbExterno.questions} bg={dbExterno.bg} />
         /* <pre>
          {JSON.stringify(dbExterno.questions, null, 4)}
         </pre> */
    )
}


export async function getServerSideProps(context) {
      console.log('Infos que o Next dá para nós: ', context.query)  // { name: 'Aladin', id: 'qualquercoisa' }

      const dbExterno = await fetch('https://aluraquiz-css.omariosouto.vercel.app/api/db')
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

      console.log('dbExterno: \n', dbExterno)

      return {
         props: { dbExterno }
      }
}


