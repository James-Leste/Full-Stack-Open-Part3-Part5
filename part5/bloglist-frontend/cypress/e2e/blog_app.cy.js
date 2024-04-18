describe('Note app', function() {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/test')
    const user1 = {
      "username": "Yoona",
      "name": "You Wu",
      "password": "123"
    }
    const user2 = {
      "username": "James",
      "name": "Ziqi Wang",
      "password": "123"
    }
    cy.request('POST', 'http://localhost:3001/api/users', user1) 
    cy.request('POST', 'http://localhost:3001/api/users', user2)
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
      cy.login({username: 'Yoona', password:'123'})
    })

    it('New blog form is visible', function() {
      cy.get('.NewPost').click()
      cy.get('form').should('be.visible')
    })

    it('a new blog can be created', function(){
      cy.get('.NewPost').click()
      cy.get('#title').type('Good Blog')
      cy.get('#author').type('Good Man')
      cy.get('#url').type('good.com')
      cy.get('#addBlog').click()
      cy.get('ul').contains('Title: Good Blog')
    })

    describe('with one post', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'Good Blog',
          author: 'Good Man',
          url: 'good.com'
        })
        cy.get('.View').click()
      })

      it('user can like a blog', function(){
        cy.get('.like').click()
        cy.contains('1')
      })

      it('user can remove a blog', function() {
        cy.get('.delete').click()
        cy.contains('Likes: 0').should('not.exist')
      })

      it('user can only remove his own blog', function() {
        cy.get('#logout').click()
        cy.login({username: 'James', password: '123'})
        cy.get('.View').click()
        cy.get('.delete').should('not.visible')
      })

      it('blogs are ordered by likes', function() {
        cy.addBlog({
          title: 'Blogs with more likes',
          author: 'More is Better',
          url: 'more.com'
        })
        cy.get('.View').eq(1).click()
        cy.get('.like').eq(1).click()
        cy.get('.blog').eq(0).contains('Blogs with more likes')
      })

    })

  })
})