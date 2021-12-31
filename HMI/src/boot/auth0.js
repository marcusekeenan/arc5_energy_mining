import Vue from 'vue'
// Import the plugin here
import {
  Auth0Plugin
} from 'src/auth'

Vue.use(Auth0Plugin, {
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENTID,
  audience: process.env.AUDIENCE,
  onRedirectCallback: appState => {
    this.$router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

export default ({
  app
}) => {
  app.Auth0Plugin = Auth0Plugin
}
