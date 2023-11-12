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
  return {author: blogData.author, likes: blogData.likes}
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
