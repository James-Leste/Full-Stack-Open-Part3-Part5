// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: username, password: password
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:5173')
    })
})

Cypress.Commands.add('addBlog', ({title, author, url}) => {
    cy.request({
        method: 'POST', 
        url: 'http://localhost:3001/api/blogs', 
        body: {title: title, author: author, url:url}, 
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`}
    })
    cy.visit('http://localhost:5173')
})