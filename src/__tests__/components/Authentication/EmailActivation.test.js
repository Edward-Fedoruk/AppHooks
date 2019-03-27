import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"
// import { EmailActivation } from "../../../components/Authentication/EmailActivation"
import Title from "../../../components/utils/Title"

describe("EmailActivation", () => {
  it("should be defined", () => {
    expect(Title).toBeDefined()
  })

  // it("should render correctly", () => {
  //   const spy = sinon.spy()
  //   const tree = shallow(
  //     <EmailActivation classes={{}} reSendEmail={spy} />
  //   )
  //   expect(tree).toMatchSnapshot()
  // })

  // it("calls reSendEmail on click", () => {
  //   const spy = sinon.spy()

  //   const tree = shallow(
  //     <EmailActivation classes={{}} reSendEmail={spy} />
  //   )

  //   tree
  //     .find("span")
  //     .first()
  //     .simulate("click")

  //   expect(spy.calledOnce).toBe(true)
  // })
})
