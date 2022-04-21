export class DetailModel {
    constructor(data) {
        if (!data) {
            data = {};
        }
        this.id = `${data.day}.${data.type}.${data.name}`.trim();
        this.day = data.day || 0;
        this.name = data.name || 0;
        this.type = data.type || 0;
        this.killBywolf = [];
        this.killByhunter = [];
        this.selectByhunter = [];
        this.killByAgree = [];
        this.killBywitch = [];
        this.killCouple = [];
        this.helpByWitch = [];
        this.helpByGuard = [];
        this.coupleByCupid = [];
    }
}
