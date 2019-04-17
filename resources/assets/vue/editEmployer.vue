<template>
	<div>
		<div class="row">
			<div class="col-sm-12">
				<div class="box box-success">
					<div class="box-header with-border">
						<h3 class="box-title text-center">Edit Profile</h3>
					</div>
					<div class="box-body">
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
					    </form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{

		data(){

			return{

				eusername: "",
				epassword: ""

			}

		}

	}
</script>