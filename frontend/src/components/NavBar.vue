<template>
<div class=" navbar-fixed" v-show="scrolled">
  <nav>
    <div class="container nav-wrapper">
      <a href="/" class="brand-logo left"><img src="../assets/logo.png" class="logo-img"></a>
      <ul id="nav-mobile" class="right hide-on-small-and-down lower">
        <li><router-link to="/">Home</router-link></li> 
        <li><router-link to="/search">Search</router-link></li> 
        <li><router-link to="/about">About</router-link></li> 
        <li v-if="!loggedUser"><router-link to="/login">Log in</router-link></li>
        <template v-else>
            <li></li>
            <li><router-link :to="`/profile/${loggedUser._id}`"></router-link></li>
            <!-- <li >
                {{alerts}} <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </li> -->
            <!-- <li><a href="#">Become a teacher</a></li> -->
            <li @click.stop><a class="profile-img" @click="toggleDropdown"><img class="profile" :src="loggedUser.img"></a></li>
            <ul class="dropdown" v-if="dropdown" @click.stop>
                <li><router-link :to="`/profile/user/${loggedUser._id}`">My profile</router-link></li>
                <li v-if="loggedUser.isTeacher"><router-link :to="`/profile/edit/classes/${loggedUser._id}`">My Classes</router-link></li>
                <li><a @click="logOut">Log out</a></li>
            </ul>
        </template>
      </ul>
      <ul id="nav-mobile" class="right mobile">
        <li v-if="!loggedUser"><router-link to="/login">Log in</router-link></li>
        <template v-else>
            <li></li>
            <li><router-link :to="`/profile/${loggedUser._id}`"></router-link></li>
            <li @click.stop><a class="profile-img" @click="toggleDropdown"><img class="profile" :src="loggedUser.img"></a></li>
            <ul class="dropdown" v-if="dropdown" @click.stop>
                <li><router-link to="/">Home</router-link></li> 
                <li><router-link to="/search">Search</router-link></li> 
                <li><router-link to="/about">About</router-link></li> 
                <li><router-link :to="`/profile/user/${loggedUser._id}`">My profile</router-link></li>
                <li v-if="loggedUser.isTeacher"><router-link :to="`/profile/edit/classes/${loggedUser._id}`">My Classes</router-link></li>
                <li><a @click="logOut">Log out</a></li>
            </ul>
        </template>   
      </ul>      
    </div>
  </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
            scrolled: true,
            YOffset: 0
        }
    },
  methods: {
    logOut() {
      this.$store.commit({ type: 'logOut' });
      this.$router.push('/');
    },
    toggleDropdown() {
      this.$store.commit({ type: 'toggleDropdown' });
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    dropdown() {
      return this.$store.getters.dropdown;
    },
    alerts() {
      return this.$store.getters.alertsNum;
    }
  },
};
</script>

<style scoped>
nav {
  width: 100vw;
  height: 100px;
  padding: 10px 0;
  background-color: #0e0f10;
  text-align: left;
  font-family: 'MontBold', sans-serif;
}
.logo-img {
  width: 150px;
  /* margin: 10px auto; */
}
#nav-mobile {
  margin: auto 0;
}
.lower {
  padding-top: 12px;
}
.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 100%;
  padding: 20px;
  background-color: #0e0f10;
  z-index: 10;
}
.navbar-fixed {
  margin-bottom: 10px;
}
.hide-nav {
  top: -100%;
}

.profile-img {
  padding-right: 0;
}

.profile-img img {
    object-fit: cover;
}

.brand-logo {
  height: 100%;
}

.mobile {
    display: block;
    padding-top: 12px;
}

@media (min-width: 600px){
    .mobile {
        display: none;
    }
}

</style>
