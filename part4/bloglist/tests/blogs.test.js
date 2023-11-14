const listHelper = require('../utils/for_testing')

test('dummy returns one', () => {
    const blogs = []

    expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
           "_id":{
              "$oid":"654d103993f973ae85b2fdd3"
           },
           "title":"Foo Bar",
           "author":"Mark Dwanye",
           "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
           "likes": 3,
           "__v": 0
        }
    ]
    const blogs = [
      {
         "_id":{
            "$oid":"654d103993f973ae85b2fdd3"
         },
         "title":"Do more expect little.",
         "author":"Mark Dwanye",
         "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
         "likes": 3,
         "__v": 0
      },
      {
         "_id":{
            "$oid":"654d0e8f270bb19ab3a855c1"
         },
         "title":"How far e dey go",
         "author":"Forester Brail",
         "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
         "likes":3,
         "__v":0
      },
      {
         "_id":{
            "$oid":"654d0e8f270bb19ab3a855c1"
         },
         "title":"Able God",
         "author":"Chinko Ekun",
         "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
         "likes": 6,
         "__v":0
      },
      {
         "_id":{
            "$oid":"654d0e8f270bb19ab3a855c1"
         },
         "title":"Life in the trenches",
         "author":"Chinko Ekun",
         "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
         "likes": 6,
         "__v":0
      },
      {
         "_id":{
            "$oid":"654d0e8f270bb19ab3a855c1"
         },
         "title":"Life in the Deserts",
         "author":"Habibi",
         "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
         "likes": 6,
         "__v":0
      }
   ]

   test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(3)
   })
   test('favourite blog', () => {
      const result = listHelper.favouriteBlog(blogs)
      expect(result).toEqual({
         "title":"Able God",
         "author":"Chinko Ekun",
         "likes": 6
      })
   })
   test('Test Author with most blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
         author: "Chinko Ekun",
         blogs: 2
      })
   })
   test('Test Author with most likes', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({
         author: "Chinko Ekun",
         likes: 12
      })
   })
})
