import "jsdom-global/register"
import React from "react"
import { shallow } from "enzyme"
import TopBar from "../../components/utils/TopBar"

describe("TopBar", () => {
  it("should match snapshot", () => {
    const tree = shallow(
      <TopBar><div>test</div></TopBar>
    )
    expect(tree).toMatchSnapshot()
  })
  it("render node element", () => {
    const wrapper = shallow(
      <TopBar><div>test</div></TopBar>
    )
    expect(wrapper.find("div").text()).toBe("test")
  })
})
