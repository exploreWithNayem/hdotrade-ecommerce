

import 'server-only'

const languages = {
    en: ()=> import('./en.json').then((module) => module.default),
    bn: ()=> import('./bn.json').then((module) => module.default)
}

// the both function are same 
export const getLang = (code) => languages[code]()

// export async function getLang(code){
//      return languages[code]()
// }