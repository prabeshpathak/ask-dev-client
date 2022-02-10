import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://ask-dev-me.herokuapp.com//api'
    : `https://ask-dev-me.herokuapp.com/api`

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
