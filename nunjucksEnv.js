const nunjucks = require('nunjucks');
const path = require('path');

const createEnv = (path, opts) => {
    let
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

const env = createEnv(path.resolve(__dirname, 'pages'), {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

const render = (pathname, data) => {

    const s = env.render(pathname, data);
    console.log(s)
    return s;
}

console.log(render)

module.exports = render;