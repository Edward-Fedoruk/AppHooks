import axios from "axios"

export const domain = "https://app.develop.apphooks.io"

export const setFetchSettings = (method, accessToken, body) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body,
})

export default axios.create({
  baseURL: domain,
  transformRequest: [(data, headers) => {
    headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`
    return JSON.stringify(data)
  }],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
