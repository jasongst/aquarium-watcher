<template>
  <div class="submit-form" style="margin-top: 30px;">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="alias">Nom de l'aquarium</label>
        <div class="input-group">
          <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="file-signature" /></span>
          </div>
          <input
            type="text"
            class="form-control"
            id="alias"
            required
            v-model="aquarium.alias"
            name="alias"
          />
        </div>
      </div>

      <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="custom_aquarium" v-model="custom" value="custom">
          <label class="form-check-label" for="custom_aquarium">Paramétrer manuellement les valeurs d'alertes ? (Température max de l'eau, PH max...)</label>
      </div>
      <div v-if="custom" style="margin-top: 15px">
        <div class="row">
          <div class="form-group col">
            <label for="min_temperature">Min temperature</label>
            <input
              type="number"
              class="form-control"
              id="min_temperature"
              required
              v-model="aquarium.min_temperature"
              name="min_temperature"
            />
          </div>
          <div class="form-group col">
            <label for="max_temperature">Max temperature</label>
            <input
              type="number"
              class="form-control"
              id="max_temperature"
              required
              v-model="aquarium.max_temperature"
              name="max_temperature"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col">
            <label for="min_ph">Min PH</label>
            <input
              type="number"
              class="form-control"
              id="min_ph"
              required
              v-model="aquarium.min_ph"
              name="min_ph"
              step="any"
            />
          </div>
          <div class="form-group col">
            <label for="max_ph">Max PH</label>
            <input
              type="number"
              class="form-control"
              id="max_ph"
              required
              v-model="aquarium.max_ph"
              name="max_ph"
              step="any"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col">
            <label for="min_ph">Min KH</label>
            <input
              type="number"
              class="form-control"
              id="min_kh"
              required
              v-model="aquarium.min_kh"
              name="min_kh"
              step="any"
            />
          </div>
          <div class="form-group col">
            <label for="max_kh">Max KH</label>
            <input
              type="number"
              class="form-control"
              id="max_kh"
              required
              v-model="aquarium.max_kh"
              name="max_kh"
              step="any"
            />
          </div>
        </div>
      </div>
      <div v-else style="margin-top: 15px; color: #8a8a8a">
        <div class="row">
          <div class="form-group col">
            <label for="min_temperature">Min temperature</label>
            <input
              type="number"
              class="form-control"
              id="min_temperature"
              v-model="aquarium.min_temperature"
              name="min_temperature"
              disabled
            />
          </div>
          <div class="form-group col">
            <label for="max_temperature">Max temperature</label>
            <input
              type="number"
              class="form-control"
              id="max_temperature"
              v-model="aquarium.max_temperature"
              name="max_temperature"
              disabled
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col">
            <label for="min_ph">Min PH</label>
            <input
              type="number"
              class="form-control"
              id="min_ph"
              v-model="aquarium.min_ph"
              name="min_ph"
              disabled
            />
          </div>
          <div class="form-group col">
            <label for="max_ph">Max PH</label>
            <input
              type="number"
              class="form-control"
              id="max_ph"
              v-model="aquarium.max_ph"
              name="max_ph"
              disabled
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col">
            <label for="min_ph">Min KH</label>
            <input
              type="number"
              class="form-control"
              id="min_kh"
              v-model="aquarium.min_kh"
              name="min_kh"
              disabled
            />
          </div>
          <div class="form-group col">
            <label for="max_kh">Max KH</label>
            <input
              type="number"
              class="form-control"
              id="max_kh"
              v-model="aquarium.max_kh"
              name="max_kh"
              disabled
            />
          </div>
        </div>
      </div>
      <div v-if="aquarium.max_temperature <= aquarium.min_temperature || aquarium.max_ph <= aquarium.min_ph || aquarium.max_kh <= aquarium.min_kh">
        <button class="btn btn-primary" disabled>Créer</button>
        <div class="alert alert-danger"> 
          La donnée minimale doit être inférieure à la donnée maximale.
        </div>
      </div>
      <button v-else @click="saveAquarium" class="btn btn-primary">Créer</button>
    </div>

    <div v-else>
      <h4>Votre aquarium a été créé avec succès !</h4>
      <button class="btn btn-primary" @click="newAquarium">Ajouter d'autres</button>
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
      aquarium: new Aquarium('Mon aquarium'),
      submitted: false,
      custom: null
    };
  },
  methods: {
    saveAquarium() {
        console.log("test");
        var data = {
            alias: this.aquarium.alias,
            max_temperature: this.custom ? this.aquarium.max_temperature : 28,
            min_temperature: this.custom ? this.aquarium.min_temperature : 21,
            max_ph: this.custom ? this.aquarium.max_ph : 8.6,
            min_ph: this.custom ? this.aquarium.min_ph : 7.9,
            max_kh: this.custom ? this.aquarium.max_kh : 12,
            min_kh: this.custom ? this.aquarium.min_kh : 5
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