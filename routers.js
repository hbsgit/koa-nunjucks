const fs = require('fs');

const addMapping = (router, mapping)=> {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            const path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            const path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

const addRouters = (router)=> {
    let files = fs.readdirSync(__dirname + '/routers');
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/routers/' + f);
        addMapping(router, mapping);
    }
}

const routers = (dir)=> {
    let routers_dir = dir || 'routers', // 如果不传参数，扫描目录默认为'routers'
        router = require('koa-router')();
        addRouters(router, routers_dir);
    return router.routes();
};

module.exports = routers;
// export default  routers;