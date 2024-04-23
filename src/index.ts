import { VueConstructor } from 'vue-demi';

import {
    components,
    share,
    directive,
} from './packages';

import { ScaleFitOptions } from './packages/directive/options';
export {
    components,
    share,
    directive,
}
export default {
    install(Vue: VueConstructor, options?: ScaleFitOptions) {
        directive.default.install(Vue, options);
        Object.entries(components).forEach(item => {
            Vue.component(item[0], item[1]);
        });
    }
}