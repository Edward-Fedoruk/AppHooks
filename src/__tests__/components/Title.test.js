import "jsdom-global/register"
import React from "react"
import { shallow, mount } from "enzyme"
import Title from "../../components/utils/Title"

describe("Title", () => {
  it("should match snapshot", () => {
    const tree = shallow(
      <Title>test</Title>
    )
    expect(tree).toMatchSnapshot()
  })
  it("render text", () => {
    const wrapper = mount(
      <Title>test</Title>
    )

    expect(wrapper.text()).toBe("test")
  })
})
