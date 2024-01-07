// next.config.js
module.exports = {
    // Other configurations...
  
    // Enable the CSS modules for global styles
    cssModules: true,
  
    // Load Tailwind CSS in your project
    webpack: (config) => {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      });
      return config;
    },
  };
  