const render = require('../nunjucksEnv')
const index = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = render('index.html', {
        fruits: ['Apple', 'Pear', 'Banana'],
        count: 12000
    });;
};

const signin = async (ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

const routers = {
    'GET /': index,
    'POST /signin': signin
}
module.exports = routers;
// export default routers;