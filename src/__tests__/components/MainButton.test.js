import "jsdom-global/register"
import React from "react"
import { shallow, mount } from "enzyme"
import MainButton from "../../components/MainButton"

describe("MainButton", () => {
  it("should match snapshot", () => {
    const tree = shallow(
      <MainButton />
    )
    expect(tree).toMatchSnapshot()
  })
  it("render text", () => {
    const wrapper = mount(
      <MainButton>test</MainButton>
    )
    expect(wrapper.text()).toBe("test")
  })
})
