<template>
  <div class="col-md">
    `<h3><i class="fa-solid fa-car"></i> KELOLA MOBIL</h3><hr>
  </div>

  <section class="content">
    <div class="container">
      <button type="button" class="btn btn-info" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Tambahkan Data Mobil</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>Id Mobil</th>
          <th>Merk</th>
          <th>Nomor Plat</th>
          <th>Warna</th>
          <th>Tahun Pembuatan</th>
          <th>Kapasitas</th>
          <th>Kelola</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{value.id_mobil}}</td>
          <td>{{value.merk}}</td>
          <td>{{value.no_plat}}</td>
          <td>{{value.warna}} </td>
          <td>{{value.tahun_pembuatan}}</td>
          <td>{{value.kapasitas}}</td>
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
              Data Kosong
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
            <li>Id Mobil : <strong>{{data[selectedIndex].id_mobil}}</strong></li>
            <li>Merk : <strong>{{data[selectedIndex].merk}}</strong></li>
            <li>No Plat : <strong>{{data[selectedIndex].no_plat}}</strong></li>
            <li>Warna : <strong>{{data[selectedIndex].warna}}</strong></li>
            <li>Tahun Pembuatan : <strong>{{data[selectedIndex].tahun_pembuatan}}</strong></li>
            <li>Kapasitas : <strong>{{data[selectedIndex].kapasitas}}</strong></li>
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
        <p class="modal-card-title">Update Data Mobil</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="update">Id Mobil</label>
              <div class="control">
                <input class="input" type="number" id="update" placeholder="Id Mobil" required v-model="formEdit.id_mobil">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Merk Mobil</label>
              <div class="control">
                <input class="input" type="text" id="merkupdate" placeholder="Merk Mobil" required v-model="formEdit.merk">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Nomor Plat</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="text" id="platupdate" placeholder="No Plat" required v-model="formEdit.no_plat">
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Warna</label>
              <div class="control">
                <input class="input" type="text" id="warnaupdate" placeholder="Warna" required v-model="formEdit.warna">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Tahun Pembuatan</label>
              <div class="control">
                <input class="input" type="text" id="tahunupdate" placeholder="Tahun Pembuatan" required v-model="formEdit.tahun_pembuatan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="update">Kapasitas</label>
              <div class="control">
                <input class="input" type="number" id="kapasitasupdate" placeholder="Kapasitas" required v-model="formEdit.kapasitas">
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
        <p class="modal-card-title">Tambahkan Data Mobil</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="create">Id Mobil</label>
            <div class="control">
              <input class="input" type="number" id="create" placeholder="Id Mobil" required v-model="formAdd.id_mobil">
            </div>
          </div>
          <div class="field">
            <label class="label" for="create">Merk</label>
            <div class="control">
              <input class="input" type="text" id="merkadd" placeholder="Merk" required v-model="formAdd.merk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="create">Nomor Plat</label>
            <div class="control">
              <input class="input" type="text" id="platadd" placeholder="No Plat" required v-model="formAdd.no_plat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="create">Warna</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" id="warnadd" placeholder="Warna" required v-model="formAdd.warna">
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label" for="create">Tahun Pembuatan</label>
            <div class="control">
              <input class="input" type="text" id="tahunadd" placeholder="Tahun Pembuatan" required v-model="formAdd.tahun_pembuatan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="create">Kapasitas</label>
            <div class="control">
              <input class="input" type="number" id="kapasitasadd" placeholder="Tanggal" required v-model="formAdd.kapasitas">
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
  name: "KelolaMobil",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_mobil: '',
        merk: '',
        no_plat: '',
        warna: '',
        tahun_pembuatan: '',
        kapasitas: '',
      },
      formEdit: {
        id_mobil: '',
        merk: '',
        no_plat: '',
        warna: '',
        tahun_pembuatan: '',
        kapasitas: '',
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      // const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
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
            this.isLoading = false;
          })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        // const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_mobil': selectedData.id_mobil
        });

        fetch(`https://fdgotravel.000webhostapp.com/fdtravel/mobil/deletemobil.php`,{
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
        // const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          id_mobil: this.formEdit.id_mobil,
          merk: this.formEdit.merk,
          no_plat: this.formEdit.no_plat,
          warna: this.formEdit.warna,
          tahun_pembuatan: this.formEdit.tahun_pembuatan,
          kapasitas: this.formEdit.kapasitas,
        });

        fetch(`https://fdgotravel.000webhostapp.com/fdtravel/mobil/updatemobil.php`,{
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
        id_mobil: selectedData.id_mobil,
        merk: selectedData.merk,
        no_plat: selectedData.no_plat,
        warna: selectedData.warna,
        tahun_pembuatan: selectedData.tahun_pembuatan,
        kapasitas: selectedData.kapasitas,
      }
      nextTick(()=>{
        document.getElementById('update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('create').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      // const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        id_mobil: this.formAdd.id_mobil,
        merk: this.formAdd.merk,
        no_plat: this.formAdd.no_plat,
        warna: this.formAdd.warna,
        tahun_pembuatan: this.formAdd.tahun_pembuatan,
        kapasitas: this.formAdd.kapasitas,
      });

      fetch(`https://fdgotravel.000webhostapp.com/fdtravel/mobil/createmobil.php`,{
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
            this.selectedIndex = -1
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
        id_mobil: '',
        merk: '',
        no_plat: '',
        warna: '',
        tahun_pembuatan: '',
        kapasitas:''
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

