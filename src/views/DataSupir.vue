<template>
  <div class="col-md">
    `<h3>DATA SUPIR</h3><hr>
  </div>
  <table class="table">
    <thead>
    <tr>
      <th>Id Supir</th>
      <th>Nama</th>
      <th>Tempat Tanggal Lahir</th>
      <th>Alamat</th>
      <th>No Hp</th>
      <th>Jenis Kelamin</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="data.length" v-for="(value, index) in data">
      <td>{{value.id_supir}}</td>
      <td>{{value.nama}}</td>
      <td>{{value.ttl}}</td>
      <td>{{value.alamat}} </td>
      <td>{{value.no_hp}}</td>
      <td>{{value.jenis_kelamin}}</td>
      <td>
        <div class="field has-addons">
        </div>
      </td>
    </tr>
    <tr v-else>
      <td colspan="9">
        <div class="notification is-warning">
          Tidak ada data
        </div>
      </td>
    </tr>
    </tbody>

  </table>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "DataMobil",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://fdgotravel.000webhostapp.com/fdtravel/supir/allsupir.php`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.data = json.data;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
          .finally(()=>{
            this.isLoading = false;
          })
    },
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
thead {
  background: #38a169;
  height: 50px;
}
.table{
  margin-left: 30px;
}
.col-md {
  margin-left: 30px;
}
</style>