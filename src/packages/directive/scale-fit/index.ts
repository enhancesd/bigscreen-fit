import { App } from 'vue';
import { useScaleFitV2 } from './scale-fit.v3';
import { ScaleFitOptions } from '../options';

export default {
    install(_Vue: App, options: ScaleFitOptions = {}) {
        _Vue.directive('scale-fit', useScaleFitV2(_Vue, options))
    }
} 