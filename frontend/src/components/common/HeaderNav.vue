<template>
  <b-navbar
    toggleable="lg"
    class="navbar navbar-expand-lg navbar-light fixed-top"
    id="mainNav"
  >
    <div class="container px-4 px-lg-5">
      <router-link to="/"><a class="navbar-brand">HappyHouse</a></router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item router-link to="/search">Search</b-nav-item>
          <b-nav-item router-link to="/board">Board</b-nav-item>
          <b-nav-item router-link to="/notice">Notice</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item v-b-modal="'log-in'">LogIn</b-dropdown-item>
            <LogIn />
            <b-dropdown-item v-b-modal="'sign-up'">Sign Up</b-dropdown-item>
            <SignUp />
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import SignUp from "@/components/Member/SignUp.vue";
import LogIn from "@/components/Member/LogIn.vue";

export default {
  components: {
    SignUp,
    LogIn,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbarCollapsible = document.body.querySelector("#mainNav");
      if (!navbarCollapsible) {
        return;
      }
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove("navbar-shrink");
      } else {
        navbarCollapsible.classList.add("navbar-shrink");
      }
    },
    movePage(target) {
      this.$router.push("/" + target);
      window.scrollBy({ top: 0 });
    },
    changeNavBarColor() {
      console.log(this.$route.name);
    },
  },
};
</script>
<style>
#mainNav {
  min-height: 3rem;
  background-color: #f5f8fd;
}

#mainNav .navbar-toggler:focus {
  outline: none;
}
#mainNav .navbar-brand {
  color: #413e66;
  font-weight: 700;
  padding: 0.9rem 0;
}

#mainNav .navbar-nav .nav-item:active,
#mainNav .navbar-nav .nav-item:focus {
  outline: none;
  background-color: transparent;
}
@media (min-width: 992px) {
  #mainNav {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: none;
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
  }
  #mainNav .navbar-brand {
    padding: 0.5rem 0;
    color: rgba(65, 62, 102);
  }
  #mainNav .nav-link {
    transition: none;
    padding: 2rem 1.5rem;
    color: rgba(65, 62, 102);
  }

  #mainNav .nav-link:hover {
    color: rgba(65, 62, 102, 0.75);
  }
  #mainNav .nav-link:active {
    color: #413e66;
  }
  #mainNav.navbar-shrink {
    background-color: #f5f8fd;
  }
  #mainNav.navbar-shrink .navbar-brand {
    color: #413e66;
  }
  #mainNav.navbar-shrink .nav-link {
    color: #413e66;
    padding: 1.5rem 1.5rem 1.25rem;
    border-bottom: 0.25rem solid transparent;
  }
}
.btn .btn-secondary {
  background-color: #fff;
}
</style>