import React from 'react'
import EmailActivation from '../../../components/Authentication/EmailActivation'
import { shallow, mount } from "enzyme"
import sinon from 'sinon'

const location = {
  state: {
    userData: { userEmail: "email" }
  }
}

describe('EmailActivation', () => {
  it('should be defined', () => {
    expect(EmailActivation).toBeDefined()
  })

  it('should render correctly', () => {
    const spy = sinon.spy()
    const tree = shallow(
      <EmailActivation.WrappedComponent classes={{}} location={location} reSenEmail={spy} /> 
    )
    expect(tree).toMatchSnapshot()
  })

  it('calls reSendEmail on click', () => {
    const spy = sinon.spy()
    
    const tree = shallow(
      <EmailActivation.WrappedComponent classes={{}} location={location} reSendEmail={spy} />
    )

    tree
      .find("span")
      .first()
      .simulate("click")

    expect(spy.calledOnce).toBe(true)
  })
})