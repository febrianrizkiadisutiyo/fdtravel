<template>
  <div class="col-md">
    `<h3><i class="fa-solid fa-user-large"></i> KELOLA SUPIR</h3><hr>
  </div>

  <section class="content">
    <div class="container">
      <button type="button" class="btn btn-info" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Tambahkan Data Supir</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>Id Supir</th>
          <th>Nama</th>
          <th>Tempat Tanggal Lahir</th>
          <th>Alamat</th>
          <th>No Hp</th>
          <th>Jenis Kelamin</th>
          <th>Kelola</th>
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
          <td colspan="9">
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
            <li>Id Supir : <strong>{{data[selectedIndex].id_supir}}</strong></li>
            <li>Nama : <strong>{{data[selectedIndex].nama}}</strong></li>
            <li>Alamat : <strong>{{data[selectedIndex].alamat}}</strong></li>
            <li>No hp : <strong>{{data[selectedIndex].no_hp}}</strong></li>
            <li>Jenis Kelamin : <strong>{{data[selectedIndex].jenis_kelamin}}</strong></li>
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
        <p class="modal-card-title">Update Data Supir</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="update">Nama</label>
              <div class="control">
                <input class="input" type="text" id="update" placeholder="Nama" required v-model="formEdit.nama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Tempat Tanggal Lahir</label>
              <div class="control">
                <input class="input" type="text" id="ttlupdate" placeholder="Tempat Tanggal Lahir" required v-model="formEdit.ttl">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Alamat</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="text" id="alamatpdate" placeholder="Alamat" required v-model="formEdit.alamat">
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">No hp</label>
              <div class="control">
                <input class="input" type="text" id="nohpupdate" placeholder="No hp" required v-model="formEdit.no_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Jenis Kelamin</label>
              <div class="control">
                <input class="input" type="text" id="jkupdate" placeholder="Jenis Kelamin" required v-model="formEdit.jenis_kelamin">
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
        <p class="modal-card-title">Tambahkan Data Supir</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="add">Id Supir</label>
            <div class="control">
              <input class="input" type="number" id="add" placeholder="Id Supir" required v-model="formAdd.id_supir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Nama</label>
            <div class="control">
              <input class="input" type="text" id="namaadd" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Tempat Tanggal Lahir</label>
            <div class="control">
              <input class="input" type="text" id="ttladd" placeholder="Tempat Tanggal Lahir" required v-model="formAdd.ttl">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Alamat</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" id="alamatadd" placeholder="Alamat" required v-model="formAdd.alamat">
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">No Hp</label>
            <div class="control">
              <input class="input" type="text" id="nohpadd" placeholder="No Hp" required v-model="formAdd.no_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="add">Jenis Kelamin</label>
            <div class="control">
              <input class="input" type="text" id="jkadd" placeholder="Jenis Kelamin" required v-model="formAdd.jenis_kelamin">
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
  name: "KelolaSupir",
  data(){
    return{
      data: [],
      kategori: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_supir: '',
        nama: '',
        ttl: '',
        alamat: '',
        no_hp: '',
        jenis_kelamin: '',
      },
      formEdit: {
        id_supir: '',
        nama: '',
        ttl: '',
        alamat: '',
        no_hp: '',
        jenis_kelamin: '',
      }
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
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.data[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_supir': selectedData.id_supir
        });
        fetch(`https://fdgotravel.000webhostapp.com/fdtravel/supir/deletesupir.php`,{
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
        const payload = new URLSearchParams({
          id_supir: this.formEdit.id_supir,
          nama: this.formEdit.nama,
          ttl: this.formEdit.ttl,
          alamat: this.formEdit.alamat,
          no_hp: this.formEdit.no_hp,
          jenis_kelamin: this.formEdit.jenis_kelamin,
        });
        fetch(`https://fdgotravel.000webhostapp.com/fdtravel/supir/updatesupir.php`,{
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
      this.formEdit = {
        id_supir: selectedData.id_supir,
        nama: selectedData.nama,
        ttl: selectedData.ttl,
        alamat: selectedData.alamat,
        no_hp: selectedData.no_hp,
        jenis_kelamin: selectedData.jenis_kelamin,
      }
      nextTick(()=>{
        document.getElementById('update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_supir: this.formAdd.id_supir,
        nama: this.formAdd.nama,
        ttl: this.formAdd.ttl,
        alamat: this.formAdd.alamat,
        no_hp: this.formAdd.no_hp,
        jenis_kelamin: this.formAdd.jenis_kelamin,
      });
      fetch(`https://fdgotravel.000webhostapp.com/fdtravel/supir/createsupir.php`,{
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
            this.selectedIndex = -1;
          })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        id_supir: '',
        nama: '',
        ttl: '',
        alamat: '',
        no_hp: '',
        jenis_kelamin:''
      }
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