import React from "react"
import { shallow } from "enzyme"
import SubmitButton from "../../../components/Authentication/SubmitButton"

<<<<<<< HEAD
describe("SubmitButton", () => {
  it("should be defined", () => {
=======
xdescribe('SubmitButton', () => {
  it('should be defined', () => {
>>>>>>> fcc5d6dd65dd9969357b32707c90195578291cc8
    expect(SubmitButton).toBeDefined()
  })
  it("should render correctly", () => {
    const tree = shallow(
      <SubmitButton text="test" />
    )
    expect(tree).toMatchSnapshot()
  })
  it("should have text props", () => {
    const tree = shallow(
      <SubmitButton text="test" />
    )
    expect(tree.props().text).toEqual("test")
  })
})
