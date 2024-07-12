const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.  

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
       title: 'Progressive Web Application',
      }),
    //  new WorkboxPlugin.GenerateSW({
    //    // these options encourage the ServiceWorkers to get in there fast
    //    // and not allow any straggling "old" SWs to hang around
    //    clientsClaim: true,
    //    skipWaiting: true,
    //  }),
     new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      // crossorigin: 'null', //can be null, use-credentials or anonymous
      icons: [
        // {
        //   src: path.resolve('src/assets/icon.png'),
        //   sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        // },
        // {
        //   src: path.resolve('src/assets/large-icon.png'),
        //   size: '1024x1024' // you can also use the specifications pattern
        // },
        // {
        //   src: path.resolve('src/assets/maskable-icon.png'),
        //   size: '1024x1024',
        //   purpose: 'maskable'
        // }
      ]
    }),
    new InjectManifest({
      // These are some common options, and not all are required.
      // Consult the docs for more info.
      swSrc: './src-sw.js',
    }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    module: { //css & babel loaders
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ]
    }
  };
};
