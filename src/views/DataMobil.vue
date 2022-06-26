<template>
  <div class="col-md">
    `<h3>DATA MOBIL</h3><hr>
  </div>
  <table class="table">
    <thead>
    <tr class="tabletop">
      <th>id mobil</th>
      <th>Merk</th>
      <th>no plat</th>
      <th>warna</th>
      <th>tahun pembuatan</th>
      <th>kapasitas</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="data.length" v-for="(value, index) in data">

      <td>{{value.id_mobil}}</td>
      <td>{{value.merk}}</td>
      <td>{{value.no_plat}}</td>
      <td>{{value.warna}}</td>
      <td>{{value.tahun_pembuatan}}</td>
      <td>{{value.kapasitas}}</td>
      <td>
      </td>
    </tr>
    <tr v-else>
      <td colspan="5">
        <div class="notification is-warning">
          tidak ada data
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
      fetch(`https://fdgotravel.000webhostapp.com/fdtravel/mobil/allmobil.php`,{
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
            this.isLoading= false;
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