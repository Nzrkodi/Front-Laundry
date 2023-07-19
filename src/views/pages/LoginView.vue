<template>
  <div id="auth">

    <div class="container">
      <div class="row">
        <div class="col-md-5 col-sm-12 mx-auto">
          <div class="card pt-4">
            <div class="card-body">
              <div class="text-center mb-5">
                <img src="assets/images/favicon.svg" height="48" class='mb-4'>
                <h3>Sign In</h3>
                <p>Please sign in to continue to Voler.</p>
              </div>
              <div>
                <h6 class="text-danger mb-3" v-if="errMessage">Username atau password salah</h6>
                <div class="form-group position-relative has-icon-left">
                  <label for="username">Username</label>
                  <div class="position-relative">
                    <input v-model="userPayload.username" type="text" class="form-control" id="username" autocomplete="off">
                    <small class="text-danger">
                      {{ errorPayload.username }}
                    </small>
                    <div class="form-control-icon">
                      <i data-feather="user"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group position-relative has-icon-left">
                  <div class="clearfix">
                    <label for="password">Password</label>
                  </div>
                  <div class="position-relative">
                    <input v-model="userPayload.password" type="password" class="form-control" id="password" autocomplete="off">
                    <small class="text-danger">
                      {{ errorPayload.password }}
                    </small>
                    <div class="form-control-icon">
                      <i data-feather="lock"></i>
                    </div>
                  </div>
                </div>
                <div class="clearfix">
                  <button type="button" @click="getScope" class="btn btn-primary float-end">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import Other from '../../utils/Other';
import Auth from '../../utils/Auth';
import * as Yup from 'yup'
import { useRouter } from 'vue-router'

const userPayload = reactive({
  grant_type   : import.meta.env.VITE_GRANT_TYPE,
  client_id    : import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_AUTH_KEY,
  username     : "admin@mail.com",
  password     : "123456",
  scope        : ""
})

const errMessage = ref(false)
const errorPayload = ref('')
const router = useRouter()

const getScope = async () => {
  try {
    const payloadSchema = Yup.object().shape({
      username: Yup.string()
      .required('Field harus diisi')
      .min(2, 'Field minimal terdiri dari 2 karakter')
      .max(150, 'Field maksimal terdiri dari 150 karakter'),
      password: Yup.string()
      .required('Field harus diisi')
      .min(2, 'Field minimal terdiri dari 2 karakter')
      .max(150, 'Field maksimal terdiri dari 150 karakter'),
    });

    await payloadSchema.validate(userPayload, { abortEarly: false });

    Auth.getScope(userPayload)
    .then((res) => {
      let scope = res.data.data
      userPayload.scope = scope

      Other.encryptScope(scope)
      getToken()
    })
    .catch((err) => {
      console.log(err);
      errMessage.value = true
    })
  } catch (err) {
    const errorMessages = err.inner.reduce((errors, error) => {
      errors[error.path] = error.message;
      return errors;
    }, {});
    errorPayload.value = errorMessages;
  }
}

const getToken = () => {
  Auth.getToken(userPayload)
  .then((res) => {
    console.log(res);
    localStorage.setItem('token', res.data.access_token)

    router.push('/')
  })
  .catch((err) => {
    console.log(err);
    errMessage.value = true
  })
}

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push('/')
  }
})
</script>