import React from 'react'


export default function QuizDaGalera() {

    return (
       <div style={{color: 'black'}} >
          Desafio da próxima aula
       </div>
    )
}


export async function getServerSideProps(context) {
      console.log('Infos que o Next dá para nós: ', context)
      return {
         props: {}, // will be passed to the page component as props
      }
}


