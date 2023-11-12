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
           "title":"Do more expect little.",
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
           "title":"Do more expect little.",
           "author":"222-439-7676",
           "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
           "likes":3,
           "__v":0
        },
        {
           "_id":{
              "$oid":"654d0e8f270bb19ab3a855c1"
           },
           "title":"Do more expect little.",
           "author":"222-439-7676",
           "url":"http://localhost:3001/api/persons/654439ba19dfe87abd53097f",
           "likes": 6,
           "__v":0
        }
    ]

    test('when list hs only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(3)
    })
    test('favourite blog', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual({
            "author":"222-439-7676",
            "likes": 6
        })
    })
})
