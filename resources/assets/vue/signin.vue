<template>
	<div>
		<div class="row">
			<div class="col-sm-12">
				<h2 class="text-center">Login</h2>
			</div>
		</div>
		<br>
		<div class="login-box-body">
		    <p class="login-box-msg">Sign in to start your session</p>

		    <form @submit.prevent="login">
		      <div class="form-group has-feedback">
		        <input type="textbox" class="form-control" placeholder="Username" v-model="username">
		      </div>
		      <div class="form-group has-feedback">
		        <input type="password" class="form-control" placeholder="Password" v-model="password">
		      </div>
		      <div class="row">
		        <div class="col-xs-8">
		        	<p class="">{{message}}</p>
		        </div>
		        <!-- /.col -->
		        <div class="col-xs-4">
		          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
		        </div>
		        <!-- /.col -->
		      </div>
		    </form>
		    <hr>
		    <router-link to="/register" class="text-center">Register a new membership</router-link>

		</div>
	</div>
</template>
<script>

	import axios from 'axios';
	
	export default{

		mounted(){

			$('#user-nav').hide()
			if(window.sessionStorage.getItem('userid') && window.sessionStorage.getItem('userid') != "undefined"){
		        $('#user-nav').show();
		        this.$router.push('/index');
		    }

		},
		data(){

			return{

				username: "",
				password: "",
				message: ""

			}

		},
		methods:{

			login(){
				this.message = "Cheking details...";
				axios.post(this.$uri+"/jobhunter/login", {username: this.username, password: this.password})
				.then(response=>{

					if(response.data.status == "failed"){

						this.message = "Incorrect password or username";

					}
					else{
						$('#profilename').html(response.data.firstname+" "+response.data.lastname);
						window.sessionStorage.setItem('name', response.data.firstname+" "+response.data.lastname);
						window.sessionStorage.setItem('userid', response.data.id)
						window.sessionStorage.setItem('usertype', response.data.usertype)
						$('#user-nav').show();
						if(response.data.usertype=="jobseeker"){
							$('#seekerSide').show();
							$('#employerSide').hide();
							this.$router.push('/index')
						}
						else{
							$('#seekerSide').hide();
							$('#employerSide').show();
							this.$router.push('/employerHome')
						}
						$('.profilePic').attr('src', "http://hire-express.pbgeabeif.com/profileimage/"+response.data.profileimg)
						window.location.reload();
					}

				})
				.catch(()=>{

					console.log('error jobhunter login')

				})

			}

		}

	}

</script>