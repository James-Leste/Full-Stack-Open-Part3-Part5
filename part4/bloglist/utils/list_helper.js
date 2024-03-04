const dummy = (blogs) => {
    return 1
}

const totalLikes = (list) => {
    console.log('%c [ list ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', list)
    const result = list.reduce((acc, cur) => acc + cur.likes, 0)
    return list.length === 0 ? 0 : result
}

module.exports = {
    dummy,
    totalLikes
}