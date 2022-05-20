import { mount } from '@cypress/vue'
import BaseAccomodationsMap from '@/components/Maps/BaseAccomodationsMap';

describe('BaseAccomodationsMap', () => {

  it('renders a message', () => {
    const msg = 'Hello Cypress Component Testing!';
    const markers = [
      {
        coords: {
          lat: 42.58384804096455,
          lng: -5.591897466662864,
        },
        price: 100,
        registerNumber: '123456789',
      },
      {
        coords: {
          lat: 42.590736034636805,
          lng: -5.584687688865959,
        },
        price: 200,
        registerNumber: 'ERTF45634',
      }
    ]
    mount(BaseAccomodationsMap, {
      propsData: {
        markers
      }
    })

    cy.get('h1').should('have.text', msg)
  })
})