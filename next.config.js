const path = require('path')
const { URL } = require('url')
const preact = require('preact')
const withPrefresh = require('@prefresh/next')

module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Move Preact into the framework chunk instead of duplicating in routes:
    const splitChunks = config.optimization && config.optimization.splitChunks
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups
      const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, { test })
        // if you want to merge the 2 small commons+framework chunks:
        // cacheGroups.commons.name = 'framework';
      }
    }

    if (isServer) {
      // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
      config.externals.push(
          /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/
      )
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {})
    aliases.react = aliases['react-dom'] = 'preact/compat'

    if (dev) {
      if (isServer) {
        // Remove circular `__self` and `__source` props only meant for development
        let oldVNodeHook = preact.options.vnode
        preact.options.vnode = (vnode) => {
          const props = vnode.props
          if (props != null) {
            if ('__self' in props) props.__self = null
            if ('__source' in props) props.__source = null
          }

          if (oldVNodeHook) {
            oldVNodeHook(vnode)
          }
        }
      } else {
        // Automatically inject Preact DevTools:
        const entry = config.entry
        config.entry = () =>
            entry().then((entries) => {
              entries['main.js'] = ['preact/debug'].concat(
                  entries['main.js'] || []
              )
              return entries
            })
      }
    }

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname),
    }

    return config
  },
  async rewrites() {
    return [
      /**
       * Rewrite /graphql requests to Magento
       */
      {
        source: '/graphql/:pathname*',
        destination: new URL('graphql', process.env.MAGENTO_URL).href,
      },

      /**
       * Sample of how to use APIs to Proxy Images
       */
      {
        source: '/store/:pathname*',
        destination: '/api/proxy',
      },

      /**
       * URlResolver 🙌
       */
      {
        source: '/:pathname*',
        destination: '/_url-resolver',
      },
    ]
  },
}
