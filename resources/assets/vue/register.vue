<template>
	<div>
		<div class="row">
			<div class="col-sm-12">
				<h2 class="text-center">Register</h2>
			</div>
		</div>
		<br>
		  <div class="nav-tabs-custom">
            <!-- Tabs within a box -->
            <ul class="nav nav-tabs pull-right">
              <li class="active"><a href="#jobseeker" data-toggle="tab" @click="changeTitle('Jobseeker')">Jobseeker</a></li>
              <li><a href="#employer" data-toggle="tab"  @click="changeTitle('Employer')">Employer</a></li>
              <li class="pull-left header"><i class="fa fa-inbox"></i>{{title}}</li>
            </ul>
            <div class="tab-content">
              <!-- Morris chart - Sales -->
              <div class="tab-pane active" id="jobseeker">

              	<div class="row">
              		<div class="col-sm-12">
              			<form @submit.prevent="register">
					    	<h4>Login Details</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Username" v-model="username">
					        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
					      </div>
					      <div class="form-group has-feedback">
					        <input type="password" class="form-control" placeholder="Password" v-model="password">
					        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					      </div>
					      	<hr>
					      	<h4>Personal Information</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Firstname" v-model="firstname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Middlename" v-model="middlename">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Lastname" v-model="lastname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Address" v-model="address">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="email" class="form-control" placeholder="Email" v-model="jemail">
					      </div>
					      <div class="form-group">
			                  <label>Gender</label>
			                  <select class="form-control" v-model="gender">
			                    <option>Male</option>
			                    <option>Female</option>
			                  </select>
			              </div>
			              <div class="form-group">
					        <textarea class="form-control" placeholder="Objectives" v-model="objective"></textarea>
					      </div>
					      <hr>
					      <h4>Contact No.</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Cell no." v-model="cell">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Tel no." v-model="tel">
					      </div>
					      <div class="row">
					        <div class="col-xs-8">
					        	<p class="text-danger">{{message}}</p>
					        </div>
					        <!-- /.col -->
					        <div class="col-xs-4">
					          <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
					        </div>
					        <!-- /.col -->
					      </div>
					      	<hr>
					      	<router-link to="/" class="text-center">Already have an account? Login now</router-link>
					    </form>
              		</div>
              	</div>

              </div>
              <div class="tab-pane" id="employer">

              	<div class="row">
              		<div class="col-sm-12">
              			<form @submit.prevent="registerEmployer">
					    	<h4>Login Details</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Username" v-model="eusername">
					        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
					      </div>
					      <div class="form-group has-feedback">
					        <input type="password" class="form-control" placeholder="Password" v-model="epassword">
					        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					      </div>
					      	<hr>
					      	<h4>Employer Information</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Company Name" v-model="companyname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Address" v-model="eaddress">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Industry" v-model="industry">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Website" v-model="website">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="email" class="form-control" placeholder="Email" v-model="email">
					      </div>
					      <div class="form-group">
			                  <label>Typology</label>
			                  <select class="form-control" v-model="typology">
			                    <option>Direct Employer</option>
			                    <option>Recruitment Agency</option>
			                    <option>Event Service</option>
			                    <option>Homebased</option>
			                  </select>
			              </div>
			              <div class="form-group">
					        <textarea class="form-control" placeholder="Description" v-model="description"></textarea>
					      </div>
					      <hr>
					      <h4>Contact Person Information</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Firstname" v-model="efirstname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Lastname" v-model="elastname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Cell no." v-model="ecell">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Tel no." v-model="etel">
					      </div>
					      <div class="row">
					        <div class="col-xs-8">
					        	<p class="text-danger">{{emessage}}</p>
					        </div>
					        <!-- /.col -->
					        <div class="col-xs-4">
					          <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
					        </div>
					        <!-- /.col -->
					      </div>
					      	<hr>
					      	<router-link to="/" class="text-center">Already have an account? Login now</router-link>
					    </form>
              		</div>
              	</div>

              </div>
            </div>
          </div>
          <!-- /.nav-tabs-custom -->
          
	</div>
</template>
<script>

	import axios from 'axios';
	
	export default{

		mounted(){

			$('#user-nav').hide();
			if(window.sessionStorage.getItem('userid') && window.sessionStorage.getItem('userid') != "undefined"){
		        $('#user-nav').show();
		        this.$router.push('/index');
		    }

		},
		data(){
			return{
				firstname: "",
				middlename: "",
				lastname: "",
				username: "",
				password: "",
				address: "",
				gender: "",
				objective: "",
				cell: "",
				tel: "",
				message:"",
				emessage: "",
				title: "Jobseeker",
				efirstname: "",
				elastname: "",
				ecell: "",
				etel: "",
				eusername: "",
				epassword: "",
				companyname: "",
				eaddress: "",
				industry: "",
				website: "",
				email: "",
				jemail: "",
				typology: "",
				description: "",
			}
		},
		methods: {

			register(){
				var data = {
					firstname: this.firstname,
					middlename: this.middlename,
					lastname: this.lastname,
					username: this.username,
					password: this.password,
					address: this.address,
					gender: this.gender,
					objective: this.objective,
					cell: this.cell,
					tel: this.tel,
					email: this.jemail,
					type: "jobseeker"
				}
				axios.post(this.$uri+'/jobhunter/registers', data)
				.then((response)=>{
					if(response.data.status == "failed"){

						this.message = "Username already exists";

					}
					else{
						$('#seekerSide').show();
						$('#employerSide').hide();
						$('#profilename').html(this.firstname+" "+this.lastname);
						window.sessionStorage.setItem('name', this.firstname+" "+this.lastname);
						window.sessionStorage.setItem('userid', response.data.id)
						window.sessionStorage.setItem('usertype', 'jobseeker')
						$('#user-nav').show();
						this.$router.push('/index')
					}
					window.location.reload();
				})
				.catch(()=>{
					console.log('jobhunter/register-error')
				})

			},
			registerEmployer(){
				var data = {
					firstname: this.efirstname,
					lastname: this.elastname,
					cell: this.ecell,
					tel: this.etel,
					username: this.eusername,
					password: this.epassword,
					companyname: this.companyname,
					address: this.eaddress,
					industry: this.industry,
					website: this.website,
					email: this.email,
					typology: this.typology,
					description: this.description,
					type: "employer"
				}
				axios.post(this.$uri+'/jobhunter/registers', data)
				.then((response)=>{ console.log(response.data)
					if(response.data.status == "failed"){

						this.emessage = "Username already exists";

					}
					else{
						$('#seekerSide').hide();
						$('#employerSide').show();
						$('#profilename').html(this.efirstname+" "+this.elastname);
						window.sessionStorage.setItem('name', this.efirstname+" "+this.elastname);
						window.sessionStorage.setItem('userid', response.data.id)
						window.sessionStorage.setItem('usertype', 'employer')
						$('#user-nav').show();
						this.$router.push('/indexEmployer')
					}
					window.location.reload();
				})
				.catch(()=>{
					console.log('jobhunter/register-error')
				})
			},
			changeTitle(title){

				this.title = title;

			}

		}

	}

</script>