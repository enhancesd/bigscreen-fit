import { App } from 'vue';

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
    install(Vue: App, options: ScaleFitOptions = {}) {
        require('./style/index.css');
        directive.default.install(Vue, options);
        Object.entries(components).forEach(item => {
            Vue.component(item[0], item[1]);
        });
    }
}