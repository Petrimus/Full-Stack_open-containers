const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const likeSum = blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)

  return likeSum
}

const favoriteBlog = (blogs) => {
const max = blogs.sort((a1, a2) => {
  return a2.likes - a1.likes
})
return formatBlog(max[0])
}

const mostBlogs = (blogs) => {
  const result = blogs.reduce((blogtimes, blog) => {
    let modified = {
      author: blog.author,
      likes: 1
    }
    var object = blogtimes.find(object => object.author == blog.author)

    if (object) {
      object.likes ++
    } else {
      blogtimes.push(modified)
    }
    return blogtimes
  }, [])
  result.sort((a1,a2) => {
    return a2.likes - a1.likes
  })
  return result[0]
}

const mostLikes = (blogs) => {
  const result = blogs.reduce((blogtimes, blog) => {
    let modified = {
      author: blog.author,
      likes: blog.likes
    }
    var object = blogtimes.find(object => object.author == blog.author)

    if (object) {
      object.likes += blog.likes
    } else {
      blogtimes.push(modified)
    }
    return blogtimes
  }, [])
  result.sort((a1,a2) => {
    return a2.likes - a1.likes
  })
  return result[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

