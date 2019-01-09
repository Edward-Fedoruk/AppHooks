import React from 'react'
import SubmitButton from '../../../components/Authentication/SubmitButton'
import { shallow } from "enzyme"

describe('SubmitButton', () => {
  it('should be defined', () => {
    expect(SubmitButton).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(
      <SubmitButton text={"test"} />
    )
    expect(tree).toMatchSnapshot()
  })
  it('should have text props', () => {
    const tree = shallow(
      <SubmitButton text={"test"} />
    )
    expect(tree.props().text).toEqual("test")
  })
})