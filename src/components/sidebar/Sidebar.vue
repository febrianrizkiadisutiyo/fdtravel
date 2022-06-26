<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>F</div>
        <div>D</div>
      </span>
      <span v-else>FD TRAVEL</span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <br/>
    <SidebarLink to="/datamobil" icon="fa-solid fa-clipboard-list">Data Mobil</SidebarLink>
    <br/>
    <SidebarLink to="/datasupir" icon="fa-solid fa-clipboard-list">Data Supir</SidebarLink>
    <br/>
    <SidebarLink to="/datajadwal" icon="fa-solid fa-clipboard-list">Data Jadwal</SidebarLink>
    <br/>
    <SidebarLink to="/kelolamobil" icon="fa-solid fa-car">Kelola Mobil</SidebarLink>
    <br/>
    <SidebarLink to="/kelolasupir" icon="fas fa-users">Kelola Supir</SidebarLink>
    <br/>
    <SidebarLink to="/kelolajadwal" icon="fa-solid fa-clipboard-list">Kelola Jadwal</SidebarLink>
    <br/>

    <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #0e1110;
  --sidebar-item-hover: #02150b;
  --sidebar-item-active: #0e1110;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

</style>