const listHelper = require('../utils/list_helper')
const lists = require('./lists')

describe('dummy test', () => {
  test('dummy is called', () => {
    const result = listHelper.dummy(lists.listWithZeroBlogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has zero blogs', () => {
    const result = listHelper.totalLikes(lists.listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(lists.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs to calculate', () => {
    const result = listHelper.totalLikes(lists.listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('find the blog with most likes', () => {
    const result = listHelper.favoriteBlog(lists.listWithManyBlogs)
    const rightOne = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(result).toEqual(rightOne)
  })

  describe('Author who has most blogs', () => {
    test('when there are many blogs', () => {
      const result = listHelper.mostBlogs(lists.listWithManyBlogs)

      const secondRight = {
        author: 'Robert C. Martin',
        likes: 3,
      }

      expect(result).toEqual(secondRight)
    })
  })

  describe('Author who has most likes', () => {
    test('find the blog with most likes', () => {
      const result = listHelper.mostLikes(lists.listWithManyBlogs)
      const rightOne = {
        author: 'Edsger W. Dijkstra',
        likes: 17,
      }
      expect(result).toEqual(rightOne)
    })
  })
})
