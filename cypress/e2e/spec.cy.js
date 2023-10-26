/// <reference types="cypress" />

import { CALCULATOR_CHARACTERS, ELEMENT_IDS } from '../../src/lib/constants'
import { evaluate } from '../../src/lib/utils'

describe('Calculator tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport('iphone-x')
  })

  it('#1 My calculator should contain a clickable element containing an = (equal sign) with a corresponding id="equals"', () => {
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).should('exist')
  })

  it('#2 My calculator should contain 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine"', () => {
    const digitsArray = Object.values(CALCULATOR_CHARACTERS).filter(value => !isNaN(value.CHARACTER))

    digitsArray.forEach(digit => {
      cy.get(`#${digit.ID}`).should('exist')
    })
  })

  it('#3 My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide".', () => {
    const operationsArray = Object.values(CALCULATOR_CHARACTERS).filter(value => {
      if (isNaN(value.CHARACTER)) {
        return value
      }
    })

    operationsArray.forEach(operation => {
      cy.get(`#${operation.ID}`).should('exist')
    })
  })

  it('#4 My calculator should contain a clickable element containing a . (decimal point) symbol with a corresponding id="decimal"', () => {
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).should('exist')
  })

  it('#5 My calculator should contain a clickable element with an id="clear"', () => {
    cy.get(`#${CALCULATOR_CHARACTERS.CLEAR.ID}`).should('exist')
  })

  it('#6 My calculator should contain an element to display values with a corresponding id="display"', () => {
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('exist')
  })

  it('#7 At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display', () => {
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('contain', '0')
    cy.get(`#${CALCULATOR_CHARACTERS.CLEAR.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('contain', '0')
  })

  it('#8 As I input numbers, I should be able to see my input in the element with the id of display', () => {
    const digitsArray = Object.values(CALCULATOR_CHARACTERS).filter(value => !isNaN(value.CHARACTER))
    const expectedResult = digitsArray.map(digit => digit.CHARACTER).join('')

    digitsArray.forEach(digit => {
      cy.get(`#${digit.ID}`).click()
    })

    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('contain', expectedResult)
  })

  it('#9 In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display', () => {
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('contain', '0')
    cy.get(`#${CALCULATOR_CHARACTERS.ONE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ADD.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.NINE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.MULTIPLY.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.THREE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.SUBTRACT.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.TWO.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DIVIDE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FOUR.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()

    const formula = '1+9x3-2÷4'
    const result = evaluate(formula)
    const expectedResult = '27.5'

    expect(result).to.equal(expectedResult)
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', expectedResult)
  })

  it('#10 When inputting numbers, my calculator should not allow a number to begin with multiple zeros', () => {
    cy.get(`#${CALCULATOR_CHARACTERS.ZERO.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ZERO.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ZERO.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ONE.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '11')
  })

  it('#11 When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted', () => {
    cy.get(`#${CALCULATOR_CHARACTERS.FOUR.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '4..')
  })

  it('#12 I should be able to perform any operation (+, -, *, /) on numbers containing decimal points', () => {
    // 4.5 + 4.5 = 9
    cy.get(`#${CALCULATOR_CHARACTERS.FOUR.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FIVE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ADD.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FOUR.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FIVE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '9')

    // 0.8 - 0.3 = 0.5
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EIGHT.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.SUBTRACT.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.THREE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '0.5')

    // 7.6 * 2.9 = 22.04
    cy.get(`#${CALCULATOR_CHARACTERS.SEVEN.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.SIX.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.MULTIPLY.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.TWO.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.NINE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '22.04')

    // 10.5 / 3.34 = 3.1437125748503
    cy.get(`#${CALCULATOR_CHARACTERS.ONE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ZERO.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FIVE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DIVIDE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.THREE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.DECIMAL.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.THREE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FOUR.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '3.1437125748503')
  })

  it('#13 If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5))', () => {
    // 5 + * 7 = 35
    cy.get(`#${CALCULATOR_CHARACTERS.FIVE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.ADD.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.MULTIPLY.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.SEVEN.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '35')

    // 5 * - 5 = -25
    cy.get(`#${CALCULATOR_CHARACTERS.FIVE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.MULTIPLY.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.SUBTRACT.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.FIVE.ID}`).click()
    cy.get(`#${CALCULATOR_CHARACTERS.EQUALS.ID}`).click()
    cy.get(`#${ELEMENT_IDS.DISPLAY}`).should('have.text', '-25')
  })
})
