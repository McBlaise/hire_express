let mix = require('laravel-mix');
mix.setPublicPath('./');
mix.js('resources/assets/app.js', 'www/js/app.js');
