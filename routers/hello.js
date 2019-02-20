const render = require('../nunjucksEnv')
const hello = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = render('hello/hello.html', {
        fruits: ['Apple', 'Pear', 'Banana'],
        count: 12000
    });
};

const helloRouter = {
    'GET /hello': hello
};
//如需使用export defalut,需引入babel es6模块
// export default helloRouter;

module.exports = helloRouter;