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
        template: "./index.html",
      }),
      //  new WorkboxPlugin.GenerateSW({
      //    // these options encourage the ServiceWorkers to get in there fast
      //    // and not allow any straggling "old" SWs to hang around
      //    clientsClaim: true,
      //    skipWaiting: true,
      //  }),
      new WebpackPwaManifest({
        name: 'ForCode: Editor',
        short_name: 'ForCodeEditor',
        description: 'An oinstallable code editor',
        background_color: '#ffffff',
        start_url: '/',
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes

          }
        ],
        // crossorigin: 'null', //can be null, use-credentials or anonymous
      }),
      new InjectManifest({
        // These are some common options, and not all are required.
        // Consult the docs for more info.
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
    ],

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
