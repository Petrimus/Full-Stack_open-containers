import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('Blog renders content', () => {
  const blog = {
    title: 'testing title',
    author: 'me, myself and i',
    likes: 5,
    url: 'www.whatever.ever',
    user: {
      name: 'petrimus'
    }
  }
  const mockHandlerLike = jest.fn()
  const mockHandlerRemove = jest.fn()

  const component = render(
    <Blog blog={blog}
      handleLikeButtonClick={mockHandlerLike}
      handleRemoveButtonClick={mockHandlerRemove}
    />
  )
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'testing title me, myself and i'
  )
})

test('blog renders all content when blog div is clicked', () => {
  const blog = {
    title: 'testing title',
    author: 'me, myself and i',
    likes: 5,
    url: 'www.whatever.ever',
    user: {
      name: 'petrimus'
    }
  }
  const user = {
    username: 'petrimus'
  }
  const mockHandlerLike = jest.fn()
  const mockHandlerRemove = jest.fn()

  const component = render(
    <Blog blog={blog}
      handleLikeButtonClick={mockHandlerLike}
      handleRemoveButtonClick={mockHandlerRemove}
      user={user}
    />
  )
  const div = component.container.querySelector('.blog')
  fireEvent.click(div)

  const newDiv = component.container.querySelector('.blog')
  expect(newDiv).toHaveTextContent(
    'testing title me, myself and i' +
    ' www.whatever.ever' +
    '5 likeslike' +
    'added by petrimus'
  )
})

