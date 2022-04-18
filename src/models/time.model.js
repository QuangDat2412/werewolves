import { StepsDay } from '../Data';
export class TimeModel {
    constructor(data) {
        if (!data) {
            data = {};
        }

        this.name = data.name || '';
        this.time = parseInt(data.time) || 0;
        this.desc = this.getStep() || {};
    }
    getStep() {
        const step = StepsDay.find((item) => item.name === this.name);
        console.log(step);
        const { type, title, desc, actions } = step;
        const _step = { type: type, title: title, desc: desc, actions: actions };

        return _step;
    }
}
