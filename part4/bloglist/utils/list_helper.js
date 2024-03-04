const dummy = (blogs) => {
    return 1
}

const totalLikes = (list) => {
    const result = list.reduce((acc, cur) => acc + cur.likes, 0)
    return list.length === 0 ? 0 : result
}

const favoriteBlog = (list) => {
    if (list.length === 0){
        return {}
    }
    let favorite = list[0]
    list.forEach(item => {
        if (item.likes > favorite.likes){
            favorite = item
        }
    });
    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}