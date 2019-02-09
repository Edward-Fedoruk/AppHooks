import React from "react"
import { shallow } from "enzyme"
import FormTitle from "../../../components/Authentication/FormTitle"

<<<<<<< HEAD
describe("FormTitle", () => {
  it("should be defined", () => {
=======
xdescribe('FormTitle', () => {
  it('should be defined', () => {
>>>>>>> fcc5d6dd65dd9969357b32707c90195578291cc8
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
