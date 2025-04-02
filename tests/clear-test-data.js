import fs from 'node:fs';

// script to remove data-testid tags from dist build, clearing up final html

(function readDist(){
    console.log('start ----> ')
    let path = './dist/assets' 
    const jsBuild = fs.readdirSync(path).find(val => /.*.js/.test(val))
    path = path + '/' + jsBuild
    const raw = fs.readFileSync(path).toString()
    const newJs = raw.replace(/"data-testid":"[^"]+",*/g, '')
    try {
        fs.writeFileSync(path,newJs)
        console.log('end ----> success')
    } catch (error) {
        console.log(error)
    }
})()


