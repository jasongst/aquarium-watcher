<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="alias">Alias</label>
        <input
          type="text"
          class="form-control"
          id="alias"
          required
          v-model="aquarium.alias"
          name="alias"
        />
      </div>

        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="custom_aquarium" v-model="custom" value="custom">
            <label class="form-check-label" for="custom_aquarium">Paramétrer les valeurs d'alertes ? (Température max de l'eau, PH max...)</label>
        </div>
        {{custom}}

      <button @click="saveAquarium" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAquarium">Add</button>
    </div>
  </div>
</template>

<script>
import Aquarium from '../models/aquarium';
import AquariumDataService from "../services/aquariums.service";

export default {
  name: "aquarium-add",
  data() {
    return {
      aquarium: new Aquarium(''),
      submitted: false,
      custom: null
    };
  },
  methods: {
    saveAquarium() {
        console.log("test");
        var data = {
            alias: this.aquarium.alias,
            max_temperature: this.aquarium.max_temperature,
            min_temperature: this.aquarium.min_temperature,
            max_ph: this.aquarium.max_ph,
            min_ph: this.aquarium.min_ph,
            max_kh: this.aquarium.max_kh,
            min_kh: this.aquarium.min_kh
        };

        AquariumDataService.create(data)
            .then(response => {
            console.log(response.data);
            this.submitted = true;
            })
            .catch(e => {
            console.log(e);
            });
        },
    
        newAquarium() {
        this.submitted = false;
        this.aquarium = new Aquarium('');
        }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>