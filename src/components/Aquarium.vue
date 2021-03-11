<template>
  <div style="padding-top: 30px;">
  <div v-if="!edit && loaded">
    <h3 style="text-align: center">{{ currentAquarium.alias }}</h3>
    <div class="row" style="padding: 30px">
    <div class="card col-6" style="width: 3z0px; background-color: #f5f5f5; padding: 30px;">
      <img src="../assets/all_the_data.svg" height="200px">
      <div class="card-body">
        <button class="btn btn-primary btn-block" @click="changeEdit(1)">
          <span>Voir les données</span>
        </button>
      </div>
    </div>
    <div class="card col-6" style="width: 350px; background-color: #f5f5f5; padding: 30px;">
      <img src="../assets/fish_bowl.svg" height="200px">
      <div class="card-body">
        <button class="btn btn-secondary btn-block" @click="changeEdit(2)">
          <span>Éditer l'aquarium</span>
        </button>
      </div>
    </div>
    </div>
  </div>
  <div v-else-if="loaded && currentMeasurements && edit === 1">
    <line-chart :measures="cutListe(currentMeasurements)"></line-chart> <br />
     <table v-if="currentMeasurements" class="table">
            <tr>
              <th>°C</th>
              <th>PH</th>
              <th>KH</th>
              <th>GH</th>
              <th>NH4</th>
              <th>NO2</th>
              <th>NO3</th>
              <th>CU</th>
              <th>Date</th>
            </tr>
            <tr v-for="measure in currentMeasurements" :key="measure.id">
              <th v-if="measure.measure_temperature < currentAquarium.min_temperature || measure.measure_temperature > currentAquarium.max_temperature" class="red">{{measure.measure_temperature}}</th>
              <th v-else>{{measure.measure_temperature}}</th>
              <th v-if="measure.measure_ph < currentAquarium.min_ph || measure.measure_ph > currentAquarium.max_ph" class="red">{{measure.measure_ph}}</th>
              <th v-else>{{measure.measure_ph}}</th>
              <th v-if="measure.measure_kh < currentAquarium.min_kh || measure.measure_kh > currentAquarium.max_kh" class="red">{{measure.measure_kh}}</th>
              <th v-else>{{measure.measure_kh}}</th>
              <th>{{measure.measure_gh}}</th>
              <th>{{measure.measure_nh4}}</th>
              <th>{{measure.measure_no2}}</th>
              <th>{{measure.measure_no3}}</th>
              <th>{{measure.measure_cu}}</th>
              <th>{{convertDate(measure.createdAt)}}</th>
            </tr>
          </table>
    <button class="m-3 btn btn-sm btn-primary" @click="changeEdit(2)">
      Editer l'aquarium
    </button>
  </div>
  <div v-if="currentAquarium && edit === 2" class="edit-form">
    <h4>Aquarium</h4>
    <form>
      <div class="form-group">
        <label for="alias">Alias</label>
        <input type="text" class="form-control" id="alias"
          v-model="currentAquarium.alias" required
        />
      </div>
      <div class="form-group">
        <label for="max_temperature">Température maximale</label>
        <input type="number" class="form-control" id="max_temperature"
          v-model="currentAquarium.max_temperature" required
        />
      </div>
      <div class="form-group">
        <label for="min_temperature">Température minimale</label>
        <input type="number" class="form-control" id="min_temperature" step="any"
          v-model="currentAquarium.min_temperature" required
        />
      </div>
      <div class="form-group">
        <label for="max_ph">PH maximum</label>
        <input type="number" class="form-control" id="max_ph" step="any"
          v-model="currentAquarium.max_ph" required
        />
      </div>
      <div class="form-group">
        <label for="min_ph">PH minimum</label>
        <input type="number" class="form-control" id="min_ph" step="any"
          v-model="currentAquarium.min_ph" required
        />
      </div>
      <div class="form-group">
        <label for="max_kh">KH maximum</label>
        <input type="number" class="form-control" id="max_kh" step="any"
          v-model="currentAquarium.max_kh" required
        />
      </div>
      <div class="form-group">
        <label for="min_kh">KH minimum</label>
        <input type="number" class="form-control" id="min_kh" step="any"
          v-model="currentAquarium.min_kh" required
        />
      </div>

    <button class="badge badge-danger mr-2"
      @click="deleteAquarium"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateAquarium"
    >
      Update
    </button>

    <button class="m-3 btn btn-sm btn-primary" @click="changeEdit(1)">
      Voir la courbe des données
    </button>
    <p>{{ message }}</p>
    </form>
  </div>

  <div v-else-if="error" class="alert alert-danger"> 
    Une erreur est survenue ! Peut-être essayez-vous d'accéder à un aquarium qui ne vous appartient ou qui n'existe pas.
  </div>
  </div>
</template>

<script>
import AquariumDataService from "../services/aquariums.service";
import MeasurementDataService from "../services/measurements.service";
import LineChart from './LineChart.vue';

export default {
  components: { LineChart },
  name: "aquarium",
  data() {
    return {
      currentAquarium: null,
      currentMeasurements: null,
      edit: false,
      error: false,
      loaded: false,
      message: ''
    };
  },
  methods: {
    getAquarium(id) {
      AquariumDataService.get(id)
        .then(response => {
          this.currentAquarium = response.data;
        }).catch(e => {
          this.error = true;
          console.log(e);
        });
      MeasurementDataService.getAll(id).then(response => {
        if(response.data.length) {
          this.currentMeasurements = response.data;
          this.currentMeasurements.forEach(measure => {
            measure.measure_ph = measure.measure_ph.toFixed(1);
            measure.measure_kh = measure.measure_kh.toFixed(1);
            measure.measure_gh = measure.measure_gh.toFixed(1);
            measure.measure_nh4 = measure.measure_nh4.toFixed(2);
            measure.measure_no2 = measure.measure_no2.toFixed(2);
            measure.measure_no3 = measure.measure_no3.toFixed(2);
            measure.measure_cu = measure.measure_cu.toFixed(2);
          });
          this.loaded = true
        } 
        else this.currentMeasurements = null;
      })
      .catch(e => {
        console.log(e);
      });
    },
    cutListe(liste) {
      if(liste.length <= 5) return liste;
      return liste.slice(0, 4);
    },
    convertDate(date) {
      let date1 = new Date(date);
      date1.setHours(date1.getHours() - 1);
      let dateLocale = date1.toLocaleString('fr-FR',{
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
      
      return dateLocale;
      },

    updateAquarium() {
      AquariumDataService.update(this.currentAquarium.id, this.currentAquarium)
        .then(response => {
          console.log(response.data);
          this.message = 'The aquarium was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteAquarium() {
      AquariumDataService.delete(this.currentAquarium.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "aquariums" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    changeEdit(state) {this.edit = state;}
  },
  mounted() {
    this.message = '';
    this.getAquarium(this.$route.params.id);
  }
};
</script>

<style>
.red {
  color: red;
}
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>