/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import axios from "axios"
import history from "../history"
import { getLocalStorageItem, domain } from "./utils"

export const refreshToken = () => {
  axios({
    method: "POST",
    url: `${domain}/auth/refresh-token`,
    data: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorageItem("JWT")}`,
    },
  })
    .then(({ data }) => {
      localStorage.setItem("expTime", data.expires_at)
      localStorage.setItem("JWT", data.refresh_token)
      // console.log("new token - ", getLocalStorageItem("JWT"))
      // console.log("updated at ", `${new Date().getHours()}:${new Date().getMinutes()}`)
    })
    .catch(() => {
      // console.log("failed at ", `${new Date().getHours()}:${new Date().getMinutes()}`)
      // console.log(data)
      history.push("/login")
    })
}

let timer = null
export const startTimer = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    const expirationTime = parseInt(getLocalStorageItem("expTime"), 10)
    const currentTimestamp = Date.now()
    if (currentTimestamp < expirationTime) refreshToken()
    if (Number.isNaN(expirationTime)) {
      clearInterval(timer)
      history.push("/login")
      return
    }
    // console.log(expirationTime, currentTimestamp, `expired? - ${currentTimestamp > expirationTime}`)
    if (currentTimestamp < expirationTime && currentTimestamp > expirationTime - 120000) {
      console.log("start refresh")
      // clearInterval(timer)
      refreshToken()
    } else if (currentTimestamp > expirationTime) {
      clearInterval(timer)
      history.push("/login")
    }
  }, 60000)
}
