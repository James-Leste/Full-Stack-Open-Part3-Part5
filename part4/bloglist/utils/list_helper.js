const _ = require('lodash');
const dummy = (blogs) => {
    return 1
}

const totalLikes = (list) => {
    const result = list.reduce((acc, cur) => acc + cur.likes, 0)
    return list.length === 0 ? 0 : result
}

const favoriteBlog = (list) => {
    if (list.length === 0) {
        return {}
    }
    let favorite = list[0]
    list.forEach(item => {
        if (item.likes > favorite.likes) {
            favorite = item
        }
    });
    return favorite
}

const mostBlogs = (list) => {
    if (list.length === 0) {
        return {}
    }
    const plist = Object.groupBy(list, ({author}) => author)
    // let longest = plist[0]
    let name = ""
    let largest = 0
    for (const [key, value] of Object.entries(plist)) {
        name = (value.length > largest) ? key : name
        largest = (value.length > largest) ? value.length : largest
    }
    const result = {
        author: name,
        blogs: largest
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}