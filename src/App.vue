<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="6">
          <template>
            <v-form v-on:submit="register($event)">
              <v-alert v-if="registerIn" dark class="error">
                <v-icon>mdi-alert</v-icon>Tout les champs doivent être remplis
              </v-alert>

              <v-text-field label="Nom / Prenom" v-model="signIn.name" required></v-text-field>

              <v-text-field label="Adresse email" v-model="signIn.email" required></v-text-field>

              <v-text-field type="password" label="Mot de passe" v-model="signIn.password" required></v-text-field>

              <v-btn color="success" class="mr-4" type="submit">Inscription</v-btn>
            </v-form>
          </template>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <template>
            <v-form ref="form" v-on:submit="login($event)">
              <v-alert v-if="loggin" dark class="error">
                <v-icon>mdi-alert</v-icon>Tout les champs doivent être remplis
              </v-alert>
              <v-text-field v-model="signUp.email" label="Adresse email" required></v-text-field>

              <v-text-field v-model="signUp.password" type="password" label="Mot de passe" required></v-text-field>

              <v-btn color="warning" class="mr-4" type="submit">Connexion</v-btn>
            </v-form>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    signIn: {
      name: "",
      email: "",
      password: "",
      output: ""
    },
    signUp: {
      email: "",
      password: ""
    },
    registerIn: false,
    loggin: false
  }),

  methods: {
    register: function(e) {
      e.preventDefault();
      let hasError = false;
      if (!this.signIn.name) {
        hasError = true;
        this.registerIn = true;
      }

      if (!this.signIn.email) {
        hasError = true;
        this.registerIn = true;
      }

      if (!this.signIn.password) {
        hasError = true;
        this.registerIn = true;
      }

      if (!hasError) {
        this.$axios.post("/register", this.signIn).then(response => {
          console.log(response);
          this.registerIn = false;
        });
      }
    },
    login: function(e) {
      e.preventDefault();
      let hasError = false;

      if (!this.signUp.email) {
        hasError = true;
        this.loggin = true;
      }

      if (!this.signUp.password) {
        hasError = true;
        this.loggin = true;
      }

      if (!hasError) {
        this.$axios.post("/login", this.signUp).then(response => {
          // console.log(response.data.token);
          localStorage.setItem('token', response.data.token)
          this.loggin = false;
          this.$axios.get('/me').then(console.log)
        });
      }
    }
  }
};
</script>
