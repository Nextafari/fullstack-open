const groupBy = require('lodash.groupby')

const dummy = () => {
  return 1
}


const totalLikes = (blogLikes) => {
  const reducer = (sum, blogData) => {
    return sum + blogData.likes
  }
  return blogLikes.length === 0 ? 0:blogLikes.reduce(reducer, 0)
}


const favouriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  let maxLike = Math.max(...likes)
  let blogData = blogs.filter(blog => blog.likes === maxLike)[0]
  return {
    title: blogData.title,
    author: blogData.author,
    likes: blogData.likes
  }
}


const mostBlogs = (blogs) => {
  const groupedBlogs = groupBy(blogs, ({author}) => author)
  let newBlogs = {}

  for (blog in groupedBlogs) {
    let noOfBlogs = groupedBlogs[blog].length
    newBlogs[blog] = noOfBlogs
  }

  let total = Object.values(newBlogs)
  let maxNoOfBlogs = Math.floor(Math.max(...total))
  let authorWithMostBlogs = Object.keys(newBlogs).find(key => newBlogs[key] === maxNoOfBlogs)

  return {
    author: authorWithMostBlogs,
    blogs: maxNoOfBlogs
  }

}


const mostLikes = (blogs) => {
  // collate authors and their blog posts.
  const groupedBlogs = groupBy(blogs, ({author}) => author)
  let newBlogs = {}
  
  for (author in groupedBlogs) {
    // aggregate all likes gotten from an author's posts
    let totalAuthorLikes = groupedBlogs[author].reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
    newBlogs[author] = totalAuthorLikes
  }

  let arrayOfLikes = Object.values(newBlogs)
  let maxNoOfLikes = Math.floor(Math.max(...arrayOfLikes))
  let authorWithMostLikes = Object.keys(newBlogs).find(key => newBlogs[key] === maxNoOfLikes)

  return {
    author: authorWithMostLikes,
    likes: maxNoOfLikes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
