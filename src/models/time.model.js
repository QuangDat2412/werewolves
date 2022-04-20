import { StepsDay } from '../Data';
export class TimeModel {
    constructor(data) {
        if (!data) {
            data = {};
        }

        this.name = data.name || '';
        this.time = parseInt(data.time) || 0;
        this.step = this.getStep() || {};
        this.type = this.step.type || 0;
        this.title = this.step.title || '';
        this.desc = this.step.desc || '';
        this.actions = this.step.actions;
        this.kill = this.step.kill || 0;
        this.help = this.step.help || 0;
        this.player = this.step.player || [];
    }
    getStep() {
        const step = StepsDay.find((item) => item.name === this.name);

        return step;
    }
}
