<template>
  <div v-if="currentAquarium" class="edit-form">
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
        <input type="number" class="form-control" id="min_temperature"
          v-model="currentAquarium.min_temperature" required
        />
      </div>
      <div class="form-group">
        <label for="max_ph">PH maximum</label>
        <input type="number" class="form-control" id="max_ph"
          v-model="currentAquarium.max_ph" required
        />
      </div>
      <div class="form-group">
        <label for="min_ph">PH minimum</label>
        <input type="number" class="form-control" id="min_ph"
          v-model="currentAquarium.min_ph" required
        />
      </div>
      <div class="form-group">
        <label for="max_kh">KH maximum</label>
        <input type="number" class="form-control" id="max_kh"
          v-model="currentAquarium.max_kh" required
        />
      </div>
      <div class="form-group">
        <label for="min_kh">KH minimum</label>
        <input type="number" class="form-control" id="min_kh"
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
    <p>{{ message }}</p>
    </form>
  </div>

  <div v-else>
    <br />
    <p>Please click on an aquarium...</p>
  </div>
</template>

<script>
import AquariumDataService from "../services/aquariums.service";

export default {
  name: "aquarium",
  data() {
    return {
      currentAquarium: null,
      message: ''
    };
  },
  methods: {
    getAquarium(id) {
      AquariumDataService.get(id)
        .then(response => {
          this.currentAquarium = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
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
    }
  },
  mounted() {
    this.message = '';
    this.getAquarium(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>