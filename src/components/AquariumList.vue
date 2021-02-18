<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Liste des aquariums</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(aquarium, index) in aquariums"
          :key="index"
          @click="setActiveAquarium(aquarium, index)"
        >
          {{ aquarium.alias }}
        </li>
      </ul>
      <router-link to="/add">
        <button class="m-3 btn btn-sm btn-primary">
          Ajouter
        </button>
      </router-link>
      <button class="m-3 btn btn-sm btn-secondary" @click="removeAllAquariums">
        Tout supprimer
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentAquarium">
        <h4>Aquarium</h4>
        <div>
          <label><strong>Alias:</strong></label> {{ currentAquarium.alias }}
        </div>
        <div>
          <label><strong>Id:</strong></label> {{ currentAquarium.id }}
        </div>
        <div>
          <label><strong>Température maximale:</strong></label> {{ currentAquarium.max_temperature }}
        </div>
        <div>
          <label><strong>Température minimale:</strong></label> {{ currentAquarium.min_temperature }}
        </div>
        <div>
          <label><strong>PH maximum:</strong></label> {{ currentAquarium.max_ph }}
        </div>
        <div>
          <label><strong>PH minimum:</strong></label> {{ currentAquarium.min_ph }}
        </div>
        <div>
          <label><strong>KH maximum:</strong></label> {{ currentAquarium.max_kh }}
        </div>
        <div>
          <label><strong>KH minimum:</strong></label> {{ currentAquarium.min_kh }}
        </div>
        <div>
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
              <th>{{measure.measure_temperature}}</th>
              <th>{{measure.measure_ph}}</th>
              <th>{{measure.measure_kh}}</th>
              <th>{{measure.measure_gh}}</th>
              <th>{{measure.measure_nh4}}</th>
              <th>{{measure.measure_no2}}</th>
              <th>{{measure.measure_no3}}</th>
              <th>{{measure.measure_cu}}</th>
              <th>{{measure.createdAt}}</th>
            </tr>
          </table>
        </div>
        <a class="badge badge-warning"
          :href="'/aquariums/' + currentAquarium.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Cliquez sur un aquarium...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AquariumDataService from "../services/aquariums.service";
import MeasurementDataService from "../services/measurements.service";

export default {
  name: "aquariums-list",
  data() {
    return {
      aquariums: [],
      currentAquarium: null,
      currentMeasurements: null,
      currentIndex: -1,
    };
  },
  methods: {
    retrieveAquariums() {
      AquariumDataService.getAll()
        .then(response => {
          this.aquariums = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAquariums();
      this.currentAquarium = null;
      this.currentIndex = -1;
    },

    setActiveAquarium(aquarium, index) {
      this.currentAquarium = aquarium;
      MeasurementDataService.getAll(aquarium.id).then(response => {
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
        } 
        else this.currentMeasurements = null;
      })
      .catch(e => {
        console.log(e);
      });
      this.currentIndex = index;
    },

    removeAllAquariums() {
      AquariumDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveAquariums();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>