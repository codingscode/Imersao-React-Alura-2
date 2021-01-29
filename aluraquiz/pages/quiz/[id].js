import React from 'react'


export default function QuizDaGalera(props) {

    return (
       <div style={{color: 'black'}} >
          Desafio da próxima aula

          <pre>
             {JSON.stringify(props, null, 4)}
          </pre>
       </div>
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


