import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"
import { EmailActivation } from "../../../components/Authentication/EmailActivation"

const location = {
  state: {
    userData: { userEmail: "email" },
  },
}

describe("EmailActivation", () => {
  it("should be defined", () => {
    expect(EmailActivation).toBeDefined()
  })

  it("should render correctly", () => {
    const spy = sinon.spy()
    const tree = shallow(
      <EmailActivation classes={{}} location={location} reSendEmail={spy} />
    )
    expect(tree).toMatchSnapshot()
  })

  it("calls reSendEmail on click", () => {
    const spy = sinon.spy()

    const tree = shallow(
      <EmailActivation classes={{}} location={location} reSendEmail={spy} />
    )

    tree
      .find("span")
      .first()
      .simulate("click")

    expect(spy.calledOnce).toBe(true)
  })
})
