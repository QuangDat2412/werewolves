import { Rule } from '../Data';
export class PlayerModel {
    constructor(data) {
        if (!data) {
            data = {};
        }
        this.id = data.id || 0;
        this.name = data.name || '';
        this.rule = data.rule || 0;
        this.rule_detail = this.getRule() || {};
        this.imageUrl = this.rule_detail.imageUrl || '';
        this.rule_name = this.rule_detail.name || '';
        this.lives = this.rule === 11 || this.rule === 9 ? 2 : 1;
        this.rule_description = this.rule_detail.description || '';
    }
    getRule() {
        const rule = Rule.find((r) => r.id === this.rule);
        return rule;
    }
}
export class DetailModel {
    constructor(data) {
        if (!data) {
            data = {};
        }
        this.id = data.id || '';
        this.killBywolf = [];
        this.killByHunter = [];
        this.killByagree = [];
        this.killBywitch = [];
        this.helpByWitch = [];
        this.helpByGuard = [];
        this.coupleByCupid = [];
    }
}
