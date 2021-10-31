import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    let component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    // expectations here
    expect(component.container).toHaveTextContent(
      'Login to application'
    )
  })

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blogMin')
    )
    // console.log(component.container)

    // const blogs = component.container.querySelectorAll('div')
    const blogs = component.container.querySelectorAll('.blogMin')
    // console.log(blogs)
    // console.log(blogs1)

    expect(blogs.length).toBe(2)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
  })
})