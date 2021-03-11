<template>
  <div class="list row" style="padding-top: 30px">
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
          <span v-if="aquarium.danger" class="badge bg-danger rounded-pill">Danger</span>
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
        <a class="btn btn-primary"
          :href="'/aquariums/' + currentAquarium.id"
        >
          Voir plus
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

export default {
  name: "aquariums-list",
  data() {
    return {
      aquariums: [],
      measures: [],
      currentAquarium: null,
      currentIndex: -1,
    };
  },
  methods: {
    checkDanger() {
      let measure;
      let aquarium;
      let danger;
      let message = '';
      for(let i = 0; i < this.measures.length; i++) {
        if(this.measures[i]) {
          danger = false;
          measure = this.measures[i];
          aquarium = this.aquariums[i];
          if(measure.measure_temperature < aquarium.min_temperature || measure.measure_temperature > aquarium.max_temperature) {
            danger = true;
            message += "-Température anormale <br />";
          }
          if(measure.measure_ph < aquarium.min_ph || measure.measure_ph > aquarium.max_ph) {
            danger = true;
            message += "-PH de l'eau anormal <br />";
          }
          if(measure.measure_kh < aquarium.min_kh || measure.measure_kh > aquarium.max_kh) {
            danger = true;
            message += "-KH de l'eau anormal <br />";
          }
          if(danger) {
            this.aquariums[i].danger = true;
            this.$fire({
              title: `"${aquarium.alias}" (id:${aquarium.id})`,
              type: 'warning',
              html: message,
              showCancelButton: true,
              confirmButtonText: 'Voir l\'aquarium',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Annuler'
            }).then((result) => {
              if (result.value) {this.$router.push(`/aquariums/${aquarium.id}`);}
            });
          }
        }
      }
    },

    retrieveAquariums() {
      AquariumDataService.getAll()
        .then(response => {
          this.aquariums = response.data.data;
          this.measures = response.data.measure;
          this.checkDanger();
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
      this.currentIndex = index;
    },

    removeAllAquariums() {
      AquariumDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.aquariums = [];
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