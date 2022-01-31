import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'dev'
    ? 'http://localhost:8080/api'
    : `https://${process.env.SITE_NAME}/api`

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
