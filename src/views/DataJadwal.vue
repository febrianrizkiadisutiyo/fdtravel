<template>
  <div class="col-md">
    `<h3> DATA MOBIL</h3><hr>
  </div>
  <table class="table">
    <thead>
    <tr>
      <th>No Jadwal</th>
      <th>Id Mobil</th>
      <th>Id Supir</th>
      <th>Tempat Berangkat</th>
      <th>Tanggal</th>
      <th>Pukul</th>
      <th>Tujuan</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="data.length" v-for="(value, index) in data">
      <td>{{value.no_jadwal}}</td>
      <td>{{value.id_mobil}}</td>
      <td>{{value.id_supir}}</td>
      <td>{{value.tempat_berangkat}}</td>
      <td>{{value.tanggal}}</td>
      <td>{{value.pukul}}</td>
      <td>{{value.tujuan}}</td>
      <td>
      </td>
    </tr>
    <tr v-else>
      <td colspan="5">
        <div class="notification is-warning">
          Tidak ada data
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataJadwal",
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
      fetch(`https://fdgotravel.000webhostapp.com/fdtravel/jadwal_berangkat/alljadwal.php`,{
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
  },
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