<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white">
      <q-toolbar class="bg-white text-grey">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
           <img
            src="~assets/arc5_logo_1linered.png"
            width="160"
            height="31.2"
            alt="Arc5 Energy"
            class="q-mt-md"
          />
        </q-toolbar-title>

        <q-btn
          flat
          class="q-pt-sm hide-in-pwa-mode text-primary"
          icon="more_vert"
          size="16px"
        >
          <q-menu
            auto-close
          >
            <q-list>
              <q-item-label
                v-if="emailVerified"
                header
              >
                Account
              </q-item-label>
              <q-item
                v-if="emailVerified"
                v-close-popup
                v-ripple
                clickable
                to="/profile"
              >
                <q-item-section avatar>
                  <img src="icons/profile.svg">
                </q-item-section>

                <q-item-section>
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                    <q-item-label
                      caption
                    >
                      @{{ cUser.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item-section>
              </q-item>
              <q-item
                v-if="emailVerified"
                v-close-popup
                v-ripple
                clickable
                to="/settings"
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="settings"
                  />
                </q-item-section>

                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator
                v-if="emailVerified"
                inset
                spaced
              />
              <q-item-label
                v-if="emailVerified"
                header
              >
                Info
              </q-item-label>
              <q-item
                v-if="emailVerified"
                v-close-popup
                v-ripple
                clickable
                to="/learn"
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="school"
                  />
                </q-item-section>

                <q-item-section>Learn</q-item-section>
              </q-item>
              <q-item
                v-if="emailVerified"
                v-close-popup
                v-ripple
                clickable
                to="/faq"
              >
                <q-item-section avatar>
                  <q-icon
                    color="secondary"
                    name="help"
                  />
                </q-item-section>

                <q-item-section>FAQ</q-item-section>
              </q-item>
              <q-separator
                v-if="emailVerified"
                inset
                spaced
              />
              <q-item
                v-close-popup
                clickable
                @click="logout"
              >
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="userIsAuthenticated & emailVerified"
      v-model="leftDrawerOpen"
      show-if-above
      elevated
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'quasar.dev',
    icon: 'home',
    link: 'https://quasar.dev'
  },
  {
    title: 'Systems',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Alarms',
    caption: 'github.com/quasarframework',
    icon: 'alarm',
    link: 'https://github.com/quasarframework'
  }
]

import { defineComponent, ref } from 'vue'
//  import _ from 'lodash'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: {
    userIsAuthenticated () {
      if (this.$auth) {
        return this.$auth.isAuthenticated
      }

      return true
    },

    auth0ClientIsLoading () {
      if (this.$auth) {
        return this.$auth.loading
      }

      return false
    },

    auth0UserPicture () {
      if (this.$auth.user) {
        return this.$auth.user.picture
      }

      return null
    },

    cUser () {
      //  const u = this.$auth.user
      return {
        id: 'dfdfdf', //  _.get(u, 'id', '?'),
        name: 'Marcus Keenan', //  _.get(u, 'nickname', '?'),
        email: 'marcusekeenan@gmail.com' //  _.get(u, 'email', '?')
      }
    },

    emailVerified () {
      // if (this.$auth.user) {
      //   return this.$auth.user.email_verified
      // }

      return true
    }
  }
})
</script>
