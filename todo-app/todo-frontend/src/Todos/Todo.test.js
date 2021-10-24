import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
    const todo = {
      text: 'Component testing is done with react-testing-library',
      done: true
    }

    const mockHandler = jest.fn()   
      
  
    const component = render(
      <Todo todo={todo} deleteTodo={mockHandler} completeTodo={mockHandler} />
    )
  
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

test('buttons can be pressed', () => {
    const todo = {
        text: 'Component testing is done with react-testing-library',
        done: true
      }
  
      const mockHandlerDelete = jest.fn() 
      const mockHandler = jest.fn()   
    
      const component = render(
        <Todo todo={todo} deleteTodo={mockHandlerDelete} completeTodo={mockHandler} />
      )

    const button = component.getByTestId('Delete')
    fireEvent.click(button)    
  
    expect(mockHandler.mock.calls).toHaveLength(1)
})