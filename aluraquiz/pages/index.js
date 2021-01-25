import styled from 'styled-components'

/* const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
` */

function Title() {
   return <h1>Qualquer título</h1>
}


export default function Home() {
   return <Title>My page</Title>
}
