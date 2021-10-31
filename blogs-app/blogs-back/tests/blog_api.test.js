const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, usersInDb } = require('./test_helper')
const User = require('../models/user')

beforeAll(async () => {
  await Blog.deleteMany({})

  const blogObject = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('test with get method', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsInDatabase = await blogsInDb()

    let response = await api.get('/api/blogs').expect(200)

    expect(response.body.length).toBe(blogsInDatabase.length)
  })
})

describe('test with POST method', () => {
  let headers = {}

  beforeEach(async () => {
    const newUser = {
      username: 'janedoez',
      name: 'Jane Z. Doe',
      password: 'password',
      adult: true,
    }

    await api.post('/api/users').send(newUser)

    const result = await api.post('/api/login').send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('a valid blog can be added', async () => {
    const blogsInDatabase = await blogsInDb()

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)

    expect(response.body.length).toBe(blogsInDatabase.length + 1)
    expect(titles).toContain('Canonical string reduction')
  })

  test('if likes undifined, value is zero', async () => {
    const newBlog = {
      title: 'Test with zero likes',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api.post('/api/blogs').send(newBlog).set(headers).expect(201)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.filter(
      (blog) => blog.title === 'Test with zero likes'
    )

    expect(addedBlog[0].likes).toBe(0)
  })

  test('title is missing', async () => {
    const newBlog = new Blog({
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 5,
    })

    await api.post('/api/blogs').send(newBlog).set(headers).expect(400)
  })

  test('url is missing', async () => {
    const newBlog = new Blog({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })

    await api.post('/api/blogs').send(newBlog).set(headers).expect(400)
  })
})
describe('tests with delete method', () => {
  test('a blog can be deleted', async () => {
    const addedBlog = new Blog({
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    })

    await addedBlog.save()

    const notesAtBeginningOfOperation = await api.get('/api/blogs')

    await api.delete(`/api/blogs/${addedBlog._id}`).expect(204)

    const notesAfterDelete = await api.get('/api/blogs')

    const titles = notesAfterDelete.body.map((r) => r.title)

    expect(titles).not.toContain('First class tests')
    expect(notesAfterDelete.body.length).toBe(
      notesAtBeginningOfOperation.body.length - 1
    )
  })
})

describe('when there is initially one user at db', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      adult: true,
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
      adult: true,
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test(' POST /api/users fail if password is < 3 characters', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'passworduser',
      name: 'passworduser',
      password: '12',
      adult: true,
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({
      error: 'password lenght must be at least 3 characters',
    })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test(' POST /api/users sets adult: true if left undefinied', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'adulttestuser',
      name: 'Testuser',
      password: '123456',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)

    expect(result.body.adult === true)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})