let apiRoot = ''


if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-server-58s1.onrender.com'

}
export const API_ROOT = apiRoot