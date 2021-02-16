<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Aquariums List</h4>
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

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllAquariums">
        Remove All
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

        <a class="badge badge-warning"
          :href="'/aquariums/' + currentAquarium.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on an aquarium...</p>
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
      currentAquarium: null,
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