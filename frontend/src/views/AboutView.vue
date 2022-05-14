<template>
  <div id="page-top">
    <b-navbar
      toggleable="lg"
      class="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#page-top">HappyHouse</a>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

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
      </div>
    </b-navbar>
    <!-- Masthead-->
    <header class="masthead">
      <video autoplay loop id="bgvid">
        <source src="@/assets/video/house.mp4" type="video/mp4" />
      </video>

      <div
        class="
          container
          px-4 px-lg-5
          d-flex
          h-100
          align-items-center
          justify-content-center
        "
      >
        <div class="d-flex justify-content-center">
          <div class="text-center">
            <h1 class="mx-auto my-0 text-uppercase">HappyHouse</h1>
            <h2 class="text-white-50 mx-auto mt-2 mb-5">소개 자리</h2>
            <a class="btn btn-primary" href="#about">Get Started</a>
          </div>
        </div>
      </div>
    </header>
    <!-- About-->
    <section class="about-section text-center" id="about">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-lg-8">
            <h2 class="text-white mb-4">Built with Bootstrap 5</h2>
            <p class="text-white-50">
              Grayscale is a free Bootstrap theme created by Start Bootstrap. It
              can be yours right now, simply download the template on
              <a href="https://startbootstrap.com/theme/grayscale/"
                >the preview page.</a
              >
              The theme is open source, and you can use it for any purpose,
              personal or commercial.
            </p>
          </div>
        </div>
        <img class="img-fluid" src="@/assets/img/ipad.png" alt="..." />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);

    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener("click", () => {
        if (window.getComputedStyle(navbarToggler).display !== "none") {
          navbarToggler.click();
        }
      });
    });
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
  },
};
</script>


<style scoped>
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
.btn {
  box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.1) !important;
  padding: 1.25rem 2rem;
  font-family: "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 80%;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  border: 0;
}
.masthead {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 35rem;
  padding: 15rem 0;
  background: linear-gradient(rgba(0, 0, 0, 0.4));
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}
video {
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
}

.masthead h1,
.masthead .h1 {
  font-family: "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 2.5rem;
  line-height: 2.5rem;
  letter-spacing: 0.8rem;
  background: linear-gradient(rgba(255, 255, 255, 0.9));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.masthead h2,
.masthead .h2 {
  max-width: 20rem;
  font-size: 1rem;
}
@media (min-width: 768px) {
  .masthead h1,
  .masthead .h1 {
    font-size: 4rem;
    line-height: 4rem;
  }
}
@media (min-width: 992px) {
  .masthead {
    height: 100vh;
    padding: 0;
  }
  .masthead h1,
  .masthead .h1 {
    font-size: 6.5rem;
    line-height: 6.5rem;
    letter-spacing: 0.8rem;
  }
  .masthead h2,
  .masthead .h2 {
    max-width: 30rem;
    font-size: 1.25rem;
  }
}
.about-section {
  padding-top: 10rem;
  background: linear-gradient(
    to bottom,
    #000 0%,
    rgba(0, 0, 0, 0.9) 75%,
    rgba(0, 0, 0, 0.8) 100%
  );
}
.about-section p {
  margin-bottom: 5rem;
}
.projects-section {
  padding: 10rem 0;
}
.projects-section .featured-text {
  padding: 2rem;
}
@media (min-width: 992px) {
  .projects-section .featured-text {
    padding: 0 0 0 2rem;
    border-left: 0.5rem solid #64a19d;
  }
}
.projects-section .project-text {
  padding: 3rem;
  font-size: 90%;
}
@media (min-width: 992px) {
  .projects-section .project-text {
    padding: 5rem;
  }
  .projects-section .project-text hr {
    border-color: #64a19d;
    border-width: 0.25rem;
    width: 30%;
  }
}

.footer {
  padding: 5rem 0;
}
</style>