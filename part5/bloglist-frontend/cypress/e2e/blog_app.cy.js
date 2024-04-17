describe('Note app', function() {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/test')
    const user = {
      "username": "Yoona",
      "name": "You Wu",
      "password": "123"
    }
    cy.request('POST', 'http://localhost:3001/api/users', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function(){
    cy.contains('Login')
  })

  describe('Login Function', function() {
    it("wrong login", function() {
      cy.get('#username').type('Yoona')
      cy.get('#password').type('wrong')

      cy.get('#login').click()
      cy.contains('Invalid')
    })

    it("successful login", function() {
      cy.get('#username').type('Yoona')
      cy.get('#password').type('123')

      cy.get('#login').click()
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'Yoona', password: '123'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:5173')
    })
    })

    it('New blog form is visible', function() {
      cy.get('#NewPost').click()
      cy.get('form').should('be.visible')
    })

    it('a new blog can be created', function(){
      cy.get('#NewPost').click()
      cy.get('#title').type('Good Blog')
      cy.get('#author').type('Good Man')
      cy.get('#url').type('good.com')
      cy.get('#addBlog').click()
      cy.get('ul').contains('Title: Good Blog')
    })

    describe('with one post', function() {
      beforeEach(function() {
        cy.get('#NewPost').click()
        cy.get('#title').type('Good Blog')
        cy.get('#author').type('Good Man')
        cy.get('#url').type('good.com')
        cy.get('#addBlog').click()
        cy.get('#View').click()
      })

      it('user can like a blog', function(){
        cy.get('.like').click()
        cy.contains('1')
      })

      it('user can remove a blog', function() {
        cy.get('.delete').click()
        cy.contains('Likes: 0').should('not.exist')
      })

      

    })

  })
})