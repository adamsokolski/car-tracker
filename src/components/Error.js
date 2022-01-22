import React from 'react'
import styled from 'styled-components'
import { BiErrorCircle } from 'react-icons/bi'

const Container = styled.div`
  background-color: #ff8c8c;
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: 200ms ease;
`

export const Error = () => {
  return (
    <Container>
      <BiErrorCircle /> Coś poszło nie tak. Spróbuj ponownie poźniej.{' '}
    </Container>
  )
}
