const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const sveltePreprocess = require('svelte-preprocess');
const webpack = require('webpack');
// const WebpackBar = require('webpackbar');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const { WebpackPluginServe } = require('webpack-plugin-serve')
const magicImporter = require('node-sass-magic-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const onwarn = (warning, onwarn) =>
  ['css-unused-selector', 'missing-declaration'].includes(warning.code) ||
  warning.code.includes('a11y') ||
  onwarn(warning);

const alias = {
  svelte: path.resolve('node_modules', 'svelte'),
  src: path.resolve(__dirname, 'src'),
  '@': path.resolve(__dirname, 'src/components'),
  log: path.resolve(__dirname, 'src/lib/log'),
  Component: path.resolve(__dirname, 'src/components'),
  Icons: path.resolve(__dirname, 'src/icons'),
  lib: path.resolve(__dirname, 'src/lib'),
  T: path.resolve(__dirname, 'src/lib/locale'),
  Handlebars: 'handlebars/dist/handlebars.min.js',
};

const buildEntry = () => {
  return {
    entry: [/*'webpack-plugin-serve/client',*/ 'src/index.js'],
    target: 'web'
  }
}

const buildOutput = (isProductionMode) => {
  return {
    output: {
      path: path.resolve(__dirname, isProductionMode ? '/usr/share/nginx/html' : 'dist'),
      filename: '[name][hash].js',
      clean: isProductionMode,
    }
  }
}

const buildResolve = () => {
  return {
    resolve: {
      alias,
      extensions: ['.mjs', '.js', '.ts', '.svelte', '.css', '.scss'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
      fallback: {
        "fs": false
      },
    }
  }
}

const addSvelteSupport = (isProductionMode, isSupportScss = true) => {
  return {
    module: {
      rules: [
        {
          test: /\.(svelte)$/i,
          use: {
            loader: 'svelte-loader',
            options: {
              onwarn,
              compilerOptions: {
                dev: !isProductionMode
              },
              emitCss: isProductionMode,
              hotReload: !isProductionMode,
              hotOptions: {
                // Prevent preserving local component state
                preserveLocalState: false,

                // If this string appears anywhere in your component's code, then local
                // state won't be preserved, even when noPreserveState is false
                noPreserveStateKey: '@!hmr',

                // Prevent doing a full reload on next HMR update after fatal error
                noReload: false,

                // Try to recover after runtime errors in component init
                optimistic: false,

                // --- Advanced ---

                // Prevent adding an HMR accept handler to components with
                // accessors option to true, or to components with named exports
                // (from <script context="module">). This have the effect of
                // recreating the consumer of those components, instead of the
                // component themselves, on HMR updates. This might be needed to
                // reflect changes to accessors / named exports in the parents,
                // depending on how you use them.
                acceptAccessors: true,
                acceptNamedExports: true,
              },
              preprocess: sveltePreprocess({
                scss: {
                  importer: [magicImporter()],
                },
              })

            }
          }
        }, {
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false
          }
        }
      ]
    }
  }
}

const fileLoader = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(md|svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf|ogg)(\?.*)?$/,
          loader: 'file-loader',
        },
      ]
    }
  }
}

const addStyleSupport = (isProductionMode) => {
  return {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/i,
          use: [isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: magicImporter(),
              },
            },
          }]
        }
      ]
    }
  }
}


const devServer = () => {
  return {
    watch: false,
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 12222,
      hot: 'only',
      historyApiFallback: true,
      client: {
        progress: true,
        overlay: {
          errors: true,
          warnings: false
        },
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
}

const buildSharedPlugins = () => {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/template.html',
        filename: 'index.html',
      }),
      new webpack.ProvidePlugin({
        j: 'jquery',
        jQuery: 'jquery',
        log: 'log',
        Component: 'Component',
        Handlebars: 'Handlebars',
        Icons: 'Icons',
        lib: 'lib',
        T: 'T',
      }),
      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
      }),
      // new WebpackBar(),
      new CopyPlugin({
        patterns: [
          { from: './public/pdfjs/', to: './pdfjs/' },
          { from: './public/favicon.png', to: './favicon.png' },
          { from: './public/worker-css.js', to: './worker-css.js' },
          { from: './public/worker-html.js', to: './worker-html.js' },
          { from: './public/worker-json.js', to: './worker-json.js' },
          { from: './public/worker-xml.js', to: './worker-xml.js' }
        ],
      }),
    ]
  }
}


const buildDevelopmentPlugins = () => {
  return {
    watch: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin({
      //     generateStatsFile: true
      // }),
      new Dotenv(),
      // new WebpackPluginServe({
      //     port: 12222,
      //     static: path.resolve(process.cwd(), 'dev'),
      //     historyFallback: true,
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //     },
          
      //     status: false,
      // }),

    ]
  }
}

const buildProductionPlugins = () => {
  return {
    plugins: [
      new Dotenv({
        path: './.prod.env'
      }),
    ]
  }
}

const optimize = (isProductionMode) => {
  return {
    optimization: !isProductionMode ? {} : {
      minimize: true,
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: { name: 'runtime' },
      // minimizer: [`...`, new CssMinimizerPlugin()]
    }
  }
}

module.exports = (env, arg) => {
  const isProductionMode = arg.mode === 'production';
  const arrayBuilder = [];

  arrayBuilder.push(buildEntry());
  arrayBuilder.push(buildOutput(isProductionMode));
  arrayBuilder.push(buildResolve());
  arrayBuilder.push(fileLoader())
  arrayBuilder.push(addSvelteSupport(isProductionMode, true));
  arrayBuilder.push(addStyleSupport(isProductionMode));
  arrayBuilder.push(optimize(isProductionMode));

  if (!isProductionMode) arrayBuilder.push(devServer());

  const { plugins, watch } = merge(isProductionMode ? [buildSharedPlugins(), buildProductionPlugins()] : [buildSharedPlugins(), buildDevelopmentPlugins()])

  const config = {
    mode: arg.mode,
    ...merge(arrayBuilder),
    plugins,
    watch,
    devtool: false, //isProductionMode? false : 'source-map',

  }
  return config;
}