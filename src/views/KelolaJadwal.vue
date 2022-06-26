<template>
  <div class="col-md">
    `<h3><i class="fa-solid fa-clipboard-list"></i> KELOLA JADWAL</h3><hr>
  </div>

  <section class="content">
    <div class="container">
      <button type="button" class="btn btn-info" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Tambahkan Jadwal</span>
      </button>
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
          <th>Kelola</th>
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
            <div class="field has-addons">
              <p class="control">
                <button type="button" class="btn btn-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fa-solid fa-pen-clip"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </p>
              <p class="control">
                <button type="button" class="btn btn-danger" @click="showDelete(index)">
                   <span class="icon is-small">
                    <i class="fa-solid fa-trash-can"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
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
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>No Jadwal : <strong>{{data[selectedIndex].no_jadwal}}</strong></li>
            <li>Id Mobil : <strong>{{data[selectedIndex].id_mobil}}</strong></li>
            <li>Id Supir : <strong>{{data[selectedIndex].id_supir}}</strong></li>
            <li>Tempat Berangkat <strong>{{data[selectedIndex].tempat_berangkat}}</strong></li>
            <li>Tangggal <strong>{{data[selectedIndex].tanggal}}</strong></li>
            <li>Pukul <strong>{{data[selectedIndex].pukul}}</strong></li>
            <li>Tujuan <strong>{{data[selectedIndex].tujuan}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="btn btn-danger" @click="remove">Delete</button>
        <button type="button" class="btn btn-secondary" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="update">Id Mobil</label>
              <div class="control">
                <input id="update" class="input" type="number" placeholder="Id Mobil" required v-model="formEdit.id_mobil">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Id Supir</label>
              <div class="control">
                <input id="supirupdate" class="input" type="number" placeholder="Id Supir" required v-model="formEdit.id_supir">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Tempat Berangkat</label>
              <div class="control">
                <input id="tempatupdate" class="input" type="text" placeholder="Tempat Berangkat" required v-model="formEdit.tempat_berangkat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Tanggal</label>
              <div class="control">
                <input id="tanggalupdate" class="input" type="date" placeholder="Nama kategori" required v-model="formEdit.tanggal">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Pukul</label>
              <div class="control">
                <input id="pukulupdate" class="input" type="time" placeholder="Nama kategori" required v-model="formEdit.pukul">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Tujuan</label>
              <div class="control">
                <input id="tujuanupdate" class="input" type="text" placeholder="Nama kategori" required v-model="formEdit.tujuan">
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="btn btn-success" @click="update">Update</button>
        <button type="button" class="btn btn-secondary" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Tambahkan Jadwal</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="add">No Jadwal</label>
            <div class="control">
              <input id="add" class="input" type="number" placeholder="No Jadwal" required v-model="formAdd.no_jadwal">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Id Mobil</label>
            <div class="control">
              <input id="idmobiladd" class="input" type="number" placeholder="Id Mobil" required v-model="formAdd.id_mobil">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Id Supir</label>
            <div class="control">
              <input id="idsupiradd" class="input" type="number" placeholder="Id Supir" required v-model="formAdd.id_supir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Tempat Berangkat</label>
            <div class="control">
              <input id="tempatadd" class="input" type="text" placeholder="Tempat Berangkat" required v-model="formAdd.tempat_berangkat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Tanggal</label>
            <div class="control">
              <input id="tanggaladd" class="input" type="date" placeholder="Tanggal" required v-model="formAdd.tanggal">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Pukul</label>
            <div class="control">
              <input id="pukuladd" class="input" type="time" placeholder="Pukul" required v-model="formAdd.pukul">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Tujuan</label>
            <div class="control">
              <input id="tujuanadd" class="input" type="text" placeholder="Tujuan" required v-model="formAdd.tujuan">
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="btn btn-success" @click="addNew">Save</button>
        <button type="button" class="btn btn-secondary" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  name: "KelolaJadwal",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formEdit: {
        no_jadwal: '',
        id_mobil:'',
        id_supir: '',
        tempat_berangkat: '',
        tanggal: '',
        pukul: '',
        tujuan: ''
      },
      formAdd: {
        no_jadwal: '',
        id_mobil:'',
        id_supir: '',
        tempat_berangkat: '',
        tanggal: '',
        pukul: '',
        tujuan: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`http://localhost/fdtravel/jadwal_berangkat/alljadwal.php`,{
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
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.data[this.selectedIndex];

        const payload = new URLSearchParams({
          'no_jadwal': selectedData.no_jadwal
        });

        fetch(`http://localhost/fdtravel/jadwal_berangkat/deletejadwal.php`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
            .then(response => {
              if(response.ok){
                this.data.splice(this.selectedIndex, 1);
              }
              return response.json();
            })
            .then(json =>{
              if(!json.status){
                alert(json.error);
              }
            })
            .catch(()=>{
              alert('Terjadi error')
            })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          no_jadwal: this.formEdit.no_jadwal,
          id_mobil: this.formEdit.id_mobil,
          id_supir: this.formEdit.id_supir,
          tempat_berangkat: this.formEdit.tempat_berangkat,
          tanggal: this.formEdit.tanggal,
          pukul: this.formEdit.pukul,
          tujuan: this.formEdit.tujuan
        });

        fetch(`http://localhost/fdtravel/jadwal_berangkat/updatejadwal.php`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
            .then(response => {
              return response.json()
            })
            .then(json =>{
              if(!json.status){
                alert(json.error);
              }else{
                this.data[this.selectedIndex] = json.data;
              }
            })
            .catch( (e) =>{
              alert('Terjadi error'+e.toString())
            })
            .finally(()=>{
              this.selectedIndex = -1;
            })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit.no_jadwal = selectedData.no_jadwal;
      this.formEdit.id_mobil = selectedData.id_mobil;
      this.formEdit.tempat_berangkat = selectedData.tempat_berangkat,
          this.formEdit.tanggal = selectedData.tanggal,
          this.formEdit.pukul = selectedData.pukul,
          this.formEdit.tujuan = selectedData.tujuan
      nextTick(()=>{
        document.getElementById('update').focus();
      })
    },
    showAdd(){
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('add').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        no_jadwal: this.formAdd.no_jadwal,
        id_mobil: this.formAdd.id_mobil,
        id_supir: this.formAdd.id_supir,
        tempat_berangkat: this.formAdd.tempat_berangkat,
        tanggal: this.formAdd.tanggal,
        pukul: this.formAdd.pukul,
        tujuan: this.formAdd.tujuan,
      });

      fetch(`http://localhost/fdtravel/jadwal_berangkat/createjadwal.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'API-Key': 'secret'
        },
        body: payload.toString(),
      })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              this.data.push(json.data);
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.formAdd.no_jadwal = '';
            this.formAdd.id_mobil ='';
            this.formAdd.id_supir ='';
            this.formAdd.tempat_berangkat='';
            this.formAdd.tanggal='';
            this.formAdd.pukul='';
            this.formAdd.tujuan='';
          })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
.col-md{
  margin-left: 15px;
}
thead {
  background: #38a169;
  height: 50px;
}
.btn-info {
  margin-bottom: 20px;
}
.btn-secondary {
  margin-left: 10px;
}
.btn-danger {
  margin-left: 10px;
}
</style>













