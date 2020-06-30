import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://www.lujiasen.com/api/express',
  transformResponse: [data => {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

export default instance
