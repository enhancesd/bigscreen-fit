import { VueConstructor } from 'vue-demi';
import ScaleFit from './scale-fit';
import { ScaleFitOptions } from './options';

export {
    ScaleFit,
}
export default {
    install(_Vue: VueConstructor, options: ScaleFitOptions = {}) {
        ScaleFit.install(_Vue, options);
    }
}