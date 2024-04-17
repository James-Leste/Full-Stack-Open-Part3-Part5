describe('Note app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function(){
    cy.contains('Login')
  })
  
})