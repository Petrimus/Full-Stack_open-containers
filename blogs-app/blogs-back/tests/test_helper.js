const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
]

const formatBlog = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog._id
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    formatBlog,
    initialBlogs,
    blogsInDb,
    usersInDb
}