import Vue from 'vue'
// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'
import { getInstance } from 'src/auth'

// Auth
let token
const authLink = setContext(async () => {
  if (!token) {
    token = await getInstance().getTokenSilently()
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
})

// Hasura
const httpLink = new HttpLink({
  uri: `https://${process.env.GRAPHQL_URL}`
})

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.GRAPHQL_URL}`,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: async () => {
      const hasuraToken = await getInstance().getTokenSilently()
      return {
        headers: {
          Authorization: token ? `Bearer ${hasuraToken}` : ''
        }
      }
    }
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Instantiate client
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => object.key
  }),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

export default ({ app }) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
