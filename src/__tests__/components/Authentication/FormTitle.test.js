import React from "react"
import { shallow } from "enzyme"
import FormTitle from "../../../components/Authentication/FormTitle"

describe("FormTitle", () => {
  it("should be defined", () => {
    expect(FormTitle).toBeDefined()
  })
  it("should render correctly", () => {
    const tree = shallow(
      <FormTitle text="test" />
    )
    expect(tree).toMatchSnapshot()
  })
  it("should have text props", () => {
    const tree = shallow(
      <FormTitle text="test" />
    )
    expect(tree.props().text).toEqual("test")
  })
})
