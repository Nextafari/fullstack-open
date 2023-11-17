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

  for (const blog in groupedBlogs) {
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
  const authorLikes = {};

  // collate authors and their blog posts.
  for (const blog of blogs) {
    // aggregate all likes gotten from an author's posts authorLikes EG:
    // { 'Mark Dwanye': 3, 'Forester Brail': 3, 'Chinko Ekun': 12, Habibi: 6 }
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes;
    } else {
      authorLikes[blog.author] = blog.likes;
    }
  }

  let maxLikes = 0;
  let authorWithMostLikes = '';

  // Find author with max likes.
  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author];
      authorWithMostLikes = author;
    }
  }

  return {
    author: authorWithMostLikes,
    likes: maxLikes
  };
};



module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
