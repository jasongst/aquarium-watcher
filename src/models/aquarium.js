export default class Aquarium {
    constructor(alias) {
      this.alias = alias;
      this.max_temperature = 28;
      this.min_temperature = 21;
      this.max_ph = 8.6;
      this.min_ph = 7.9;
      this.max_kh = 12;
      this.min_kh = 5;
      this.id_sensor = null;
    }
}