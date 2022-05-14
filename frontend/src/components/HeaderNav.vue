<template>
  <b-navbar fixed="top" toggleable="xl" type="dark" variant="info">
    <b-container fluid>
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">New</b-nav-item>
          <b-nav-item href="#">Notice</b-nav-item>
          <b-nav-item href="#">Search</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    navbarShrink(event) {
      event.preventDefault();
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
  },
};
</script>
<style>
body {
  background-color: rgb(174, 141, 141);
}
#mainNav {
  min-height: 3.5rem;
  background-color: #fff;
}
#mainNav .navbar-toggler {
  font-size: 80%;
  padding: 0.75rem;
  color: #64a19d;
  border: 1px solid #64a19d;
}
#mainNav .navbar-toggler:focus {
  outline: none;
}
#mainNav .navbar-brand {
  color: #000;
  font-weight: 700;
  padding: 0.9rem 0;
}
#mainNav .navbar-nav .nav-item:hover {
  color: fade(#fff, 80%);
  outline: none;
  background-color: transparent;
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
    color: rgba(255, 255, 255, 0.5);
  }
  #mainNav .nav-link {
    transition: none;
    padding: 2rem 1.5rem;
    color: rgba(255, 255, 255, 0.5);
  }
  #mainNav .nav-link:hover {
    color: rgba(255, 255, 255, 0.75);
  }
  #mainNav .nav-link:active {
    color: #fff;
  }
  #mainNav.navbar-shrink {
    background-color: #fff;
  }
  #mainNav.navbar-shrink .navbar-brand {
    color: #000;
  }
  #mainNav.navbar-shrink .nav-link {
    color: #000;
    padding: 1.5rem 1.5rem 1.25rem;
    border-bottom: 0.25rem solid transparent;
  }
  #mainNav.navbar-shrink .nav-link:hover {
    color: #64a19d;
  }
  #mainNav.navbar-shrink .nav-link:active {
    color: #467370;
  }
  #mainNav.navbar-shrink .nav-link.active {
    color: #64a19d;
    outline: none;
    border-bottom: 0.25rem solid #64a19d;
  }
}
</style>