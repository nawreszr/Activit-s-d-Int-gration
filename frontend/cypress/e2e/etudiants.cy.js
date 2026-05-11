describe('Gestion des étudiants', () => {
    it('affiche la liste des étudiants', () => {
        cy.visit('http://localhost:3000/etudiants');
        cy.get('[data-testid="etudiant-list"]').should('be.visible');
        cy.get('[data-testid="etudiant-item"]').should('have.length.greaterThan', 0);
    });
    it('crée un nouvel étudiant', () => {
        cy.visit('http://localhost:3000/etudiants/new');

        cy.get('[name="nom"]').type('Alice Martin');
        cy.get('[name="cin"]').type('12345678');
        cy.get('[name="dateNaissance"]').type('2000-01-01');
        cy.get('[name="email"]').type('alice.martin@universite.tn');
        cy.get('[name="anneePremiereInscription"]').clear().type('2024');
        cy.get('[name="departementId"]').select(1);
        cy.get('[name="nom"]').type('Alice Martin');

        cy.get('[type="submit"]').click();
        
        cy.contains('Alice Martin', { timeout: 10000 }).should('be.visible');
    });
});