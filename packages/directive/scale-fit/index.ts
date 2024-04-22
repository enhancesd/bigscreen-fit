import { VueConstructor } from 'vue';
import { useScaleFitV2 } from './scale-fit.v2';
import { ScaleFitOptions } from '../options';

export default {
    install(_Vue: VueConstructor, options: ScaleFitOptions = {}) {
        _Vue.directive('scale-fit', useScaleFitV2(_Vue, options))
    }
} 