/* eslint-disable cypress/no-unnecessary-waiting */

describe('service is available', function () {
    it('should be aviable on https://localhost:3000', () => {
        cy.visit("http://localhost:3000");
    })

    it('should open and close modal by icon', () => {
        cy.contains("Краторная булка N-200i").click();
        cy.contains("Детали ингредиента").should('be.visible');
        cy.get('#close').click()
    })

    it('should open and close modal by overlay', () => {
        cy.contains("Флюоресцентная булка R2-D3").click();
        cy.contains("Детали ингредиента").should('be.visible');
        cy.get('#overlay').click(-10,-10, {force: true})
    })

    it("should check drag and drop and make order", () => {
        cy.contains("Краторная булка N-200i").trigger("dragstart");
        cy.get("#constructor").trigger("drop");
        cy.get('#constructor').contains('Краторная булка N-200i')
        cy.contains("Говяжий метеорит (отбивная)").trigger("dragstart");
        cy.get("#constructor").trigger("drop");
        cy.get('#constructor').contains('Говяжий метеорит (отбивная)')
        cy.contains('Оформить заказ').click()

        cy.get('.input').as("login-form");
        cy.get('@login-form').find('[class^=text]').first().as('email-input');
        cy.get('@login-form').find('[class^=input__icon]').first().click();
        cy.get('@email-input').type('katya.cuzina2021@yandex.ru');
        cy.get('@login-form').find('[class^=text]').last().as('password-input').type('kate25');
        cy.contains('Войти').click();
        cy.wait(500);
        cy.contains("Оформить заказ").click();
        cy.wait(17000);
        cy.get('#numberOfOrder').should("exist");
        cy.get('#close').click()
    });

});