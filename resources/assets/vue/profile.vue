<template>
	<div>
		<div class="box box-warning" v-if="isJobseeker">
            <div class="box-body box-profile">
            	<div class="row">
            		<div class="col-xs-6"><label class="text-sm text text-info" @click="editProfile('seeker')">Edit Profile</label></div>
            		<div class="col-xs-6">
            			<label href="javascript:void(0)" class="text-sm text pull-right text-info" @click="openSeekerCover">Change cover photo</label>
            			<input type="file" id="seekerCover" class="hide">
            		</div>
            	</div>
              <div class="row">
	          	<div class="col-xs-12">
	          		<img class="profile-user-img img-responsive img-circle" style="height: 100px; width: 100px; margin-left: auto; margin-right: auto; display: block;" :src="$uriImage+profile" alt="User profile picture" @click="openBrowserSeeker">
	          	</div>
	          </div>
              <div class="row" v-if="is_verified > 0">
	          	<div class="col-xs-12">
	          		<div style="width: 100px; margin-left: auto; margin-right: auto"><i style="margin-top: -30px; font-size: 30px; color: #2196F3" class="fa fa-check-circle pull-right" aria-hidden="true"></i></div>
	          	</div>
	          </div>
              <input type="file" id="seekerPhoto" class="hide">
              <h3 class="profile-username text-center">{{name}}</h3>

              <!-- <p class="text-muted text-center">Software Engineer</p> -->

              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Address</b> <a class="pull-right">{{address}}</a>
                </li>
                <!-- <li class="list-group-item">
                  <b>Email</b> <a class="pull-right">{{email}}</a>
                </li> -->
                <li class="list-group-item">
                  <b>Email</b> <a class="pull-right">{{email}}</a>
                </li>
                <li class="list-group-item">
                  <b>Cell no.</b> <a class="pull-right">{{cell}}</a>
                </li>
                <li class="list-group-item">
                  <b>Tel no.</b> <a class="pull-right">{{tel}}</a>
                </li>
              </ul>
              <strong></i>Objectives</strong>
              <p>{{objectives}}</p>
              <hr>
              <div class="row">
	          	<div class="col-sm-12">
	          		<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
			        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(seekerRating)"></i> 
			        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(seekerRating)"></i>
			        </div>
	          		<p class="text-center">{{(seekerRating*1).toFixed(1)}}</p>
	          		<p class="text-center">Reviews ({{reviews}})</p>
	          	</div>
	          </div>
              <!-- <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> -->
            </div>
            <hr style="margin: 0px">
            <!-- /.box-body -->
            <div class="row">
            	<div class="col-sm-12">
            		<div style="padding: 15px; max-height: 100px; overflow-y: scroll">
            			<span v-for="(item, index) in requestsList" style="display: block;margin-bottom: 5px" >
            				{{item.companyname}} <button @click="acceptRequest(item.empid)" class="pull-right btn btn-xs btn-primary">Accept</button>
            			</span>
            		</div>
            	</div>
            </div>
        </div>
        <div class="box box-warning" v-else>
            <div class="box-body box-profile">
            	<!-- <div class="row">
            		<div class="col-sm-12">
            			<router-link to="/editEmployer" class="pull-right">Edit</router-link>
            		</div>
            	</div> -->
            	<div class="row">
            		<div class="col-xs-6"><label class="text-sm text text-info" @click="editProfile('employer')">Edit Profile</label></div>
            		<div class="col-xs-6">
            			<label href="javascript:void(0)" class="text-sm text pull-right text-info" @click="openEmployerCover">Change cover photo</label>
            			<input type="file" id="employerCover" class="hide">
            		</div>
            	</div>
              <img class="profile-user-img img-responsive img-circle" style="height: 100px" :src="$uriImage+profile" alt="User profile picture" @click="openBrowser">
              <input type="file" id="employerPhoto" class="hide">
              <h3 class="profile-username text-center">{{companyname}}</h3>

              <!-- <p class="text-muted text-center">Software Engineer</p> -->
              <strong></i>About</strong>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;{{description}}</p>
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Address</b> <a class="pull-right">{{eaddress}}</a>
                </li>
                <li class="list-group-item">
                  <b>Industry</b> <a class="pull-right">{{industry}}</a>
                </li>
                <li class="list-group-item">
                  <b>Website</b> <a class="pull-right">{{website}}</a>
                </li>
                <li class="list-group-item">
                  <b>Cell no.</b> <a class="pull-right">{{ecell}}</a>
                </li>
                <li class="list-group-item">
                  <b>Tel no.</b> <a class="pull-right">{{etel}}</a>
                </li>
                <li class="list-group-item">
                  <b>Personnel</b> <a class="pull-right">{{personel}}</a>
                </li>
              </ul>
              <div class="row">
	          	<div class="col-sm-12">
	          		<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
			        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(seekerRating)"></i> 
			        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(seekerRating)"></i>
			        </div>
	          		<p class="text-center">{{(seekerRating*1).toFixed(1)}}</p>
	          		<p class="text-center">Reviews ({{reviews}})</p>
	          	</div>
	          </div>
              <!-- <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> -->
            </div>
            <!-- /.box-body -->
        </div>
        <br>
        <div v-if="isJobseeker">
	        <div class="row">
	        	<div class="col-sm-12">
	        		<router-link :to="'/viewSeekerPosts/'+userid" class="btn btn-flat btn-block btn-default">
	        			View Job Posts
	        		</router-link>
	        	</div>
	        </div>
		    <br>
        </div>
        <div class="row" v-if="isJobseeker">
        	<div class="col-sm-12">
        		<div class="box box-widget">
		            <!-- /.box-header -->
		            <div class="box-body">
		              <h4 class="text-center">Feedbacks</h4>
		            </div>
		            <!-- /.box-body -->
		            <div class="box-footer box-comments" v-if="reviewList.length">
		              <div class="box-comment" v-for="(item, index) in reviewList">
		                <!-- User image -->
		                <img class="img-circle img-sm" :src="$uriImage+item.companyDetails.profileimg" alt="User Image">

		                <div class="comment-text">
		                    <span class="username">
		                    	{{item.companyDetails.companyname}} 
		                    	<div class="text-center" style="display: inline-block;">
						        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
						        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
						        </div>
		                    	<!-- <span class="text-muted pull-right">8:03 PM Today</span> -->
		                    </span><!-- /.username -->
		                  	{{item.content}}
		                </div>
		                <!-- /.comment-text -->
		              </div>
		              <!-- /.box-comment -->
		            </div>
		            <div class="box-footer box-comments" v-else>
		            	<h4>No reviews</h4>
		            </div>
		            <!-- /.box-footer -->
		        </div>
        	</div>
        </div>
        <div class="row" v-else>
        	<div class="col-sm-12">
        		<div class="box box-widget">
		            <!-- /.box-header -->
		            <div class="box-body">
		              <h4 class="text-center">Feedbacks</h4>
		            </div>
		            <!-- /.box-body -->
		            <div class="box-footer box-comments" v-if="reviewListEmployer.length">
		              <div class="box-comment" v-for="(item, index) in reviewListEmployer">
		                <!-- User image -->
		                <img class="img-circle img-sm" :src="$uriImage+item.seekerDetails.profileimg" alt="User Image">

		                <div class="comment-text">
		                    <span class="username">
		                    	{{item.seekerDetails.firstname+" "+item.seekerDetails.lastname}} 
		                    	<div class="text-center" style="display: inline-block;">
						        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
						        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
						        </div>
		                    	<!-- <span class="text-muted pull-right">8:03 PM Today</span> -->
		                    </span><!-- /.username -->
		                  	{{item.content}}
		                </div>
		                <!-- /.comment-text -->
		              </div>
		              <!-- /.box-comment -->
		            </div>
		            <div class="box-footer box-comments" v-else>
		            	<h4>No reviews</h4>
		            </div>
		            <!-- /.box-footer -->
		        </div>
        	</div>
        </div>
        <div id="editSeeker" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Edit Profile</h4>
		      </div>
		      <div class="modal-body">
		        <div class="row">
              		<div class="col-sm-12">
              			<form @submit.prevent="">
					    	<h4>Login Details</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Username" v-model="editusername">
					        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
					      </div>
					      <div class="form-group has-feedback">
					        <input type="password" class="form-control" placeholder="Password" v-model="editpassword">
					        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					      </div>
					      	<hr>
					      	<h4>Personal Information</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Firstname" v-model="editfirstname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Middlename" v-model="editmiddlename">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Lastname" v-model="editlastname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Address" v-model="editaddress">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="email" class="form-control" placeholder="Email" v-model="editjemail">
					      </div>
					      <div class="form-group">
			                  <label>Gender</label>
			                  <select class="form-control" v-model="editgender">
			                    <option>Male</option>
			                    <option>Female</option>
			                  </select>
			              </div>
			              <div class="form-group">
					        <textarea class="form-control" placeholder="Objectives" v-model="editobjective"></textarea>
					      </div>
					      <hr>
					      <h4>Contact No.</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Cell no." v-model="editcell">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Tel no." v-model="edittel">
					      </div>
					      <div class="row">
					        <div class="col-xs-8">
					        	<!-- <p class="text-danger">{{message}}</p> -->
					        </div>
					        <!-- /.col -->
					        <div class="col-xs-4">
					          <button type="submit" class="btn btn-primary btn-block btn-flat" @click="updateSeekerProfile">Save</button>
					        </div>
					        <!-- /.col -->
					      </div>
					    </form>
              		</div>
              	</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>

		  </div>
		</div>
		<div id="editEmployer" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Edit Profile</h4>
		      </div>
		      <div class="modal-body">
		        <div class="row">
              		<div class="col-sm-12">
              			<form @submit.prevent="">
					    	<h4>Login Details</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Username" v-model="editcompanyusername">
					        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
					      </div>
					      <div class="form-group has-feedback">
					        <input type="password" class="form-control" placeholder="Password" v-model="editcompanypassword">
					        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					      </div>
					      	<hr>
					      	<h4>Employer Information</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Company Name" v-model="editcompanycompanyname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Address" v-model="editcompanyaddress">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Industry" v-model="editcompanyindustry">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Website" v-model="editcompanywebsite">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="email" class="form-control" placeholder="Email" v-model="editcompanyemail">
					      </div>
					      <div class="form-group">
			                  <label>Typology</label>
			                  <select class="form-control" v-model="editcompanytypology">
			                    <option>Direct Employer</option>
			                    <option>Recruitment Agency</option>
			                    <option>Event Service</option>
			                    <option>Homebased</option>
			                  </select>
			              </div>
			              <div class="form-group">
					        <textarea class="form-control" placeholder="Description" v-model="editcompanydescription"></textarea>
					      </div>
					      <hr>
					      <h4>Contact Person Information</h4>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Firstname" v-model="editcompanyfirstname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Lastname" v-model="editcompanylastname">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Cell no." v-model="editcompanycell">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Tel no." v-model="editcompanytel">
					      </div>
					      <div class="row">
					        <div class="col-xs-8">
					        	<!-- <p class="text-danger">{{emessage}}</p> -->
					        </div>
					        <!-- /.col -->
					        <div class="col-xs-4">
					          <button type="submit" class="btn btn-primary btn-block btn-flat" @click="updateCompanyProfile">Save</button>
					        </div>
					        <!-- /.col -->
					      </div>
					    </form>
              		</div>
              	</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>

		  </div>
		</div>
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		mounted(){

			if(window.sessionStorage.getItem('usertype') == "jobseeker"){
				this.isJobseeker = true;
				this.getDetails();
			}
			else{
				this.isJobseeker = false;
				this.getEmployerDetails();
			}
			this.getReviews();
			this.getSeekerRequests();
			// document.getElementById('employerPhoto').onchange = function() {
			//     // fire the upload here
			//     alert('s')
			// };
		},
		data(){

			return{
				name: "...",
				address: "...",
				tel: "...",
				cell: "...",
				email: "...",
				objectives: "...",
				isJobseeker: "...",
				companyname: "...",
				eaddress: "...",
				industry: "...",
				website: "...",
				ecell: "...",
				etel: "...",
				personel: "...",
				profile: "default.jpg",
				seekerRating: "",
				userid: window.sessionStorage.getItem('userid'),
				reviewList:[],
				reviewListEmployer: [],
				is_verified: 0,
				reviews: 0,
				description: "",

				seekerInformation: {},
				employerInformation: {},

				editusername: "",
				editpassword: "",
				editfirstname: "",
				editmiddlename: "",
				editlastname: "",
				editaddress: "",
				editjemail: "",
				editgender: "",
				editobjective: "",
				editcell: "",
				edittel: "",

				editcompanyusername: "",
				editcompanypassword: "",
				editcompanycompanyname: "",
				editcompanyaddress: "",
				editcompanywebsite: "",
				editcompanyemail: "",
				editcompanytypology: "",
				editcompanydescription: "",
				editcompanyfirstname: "",
				editcompanylastname: "",
				editcompanycell: "",
				editcompanytel: "",
				editcompanyindustry: "",

				requestsList: []

			}

		},
		methods:{

			acceptRequest(id){
				axios.get(this.$uri+"/jobhunter/acceptRequest?userid="+id+"&seeker_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.getSeekerRequests();
				})
				.catch(()=>{
					console.log('error requests')
				})
			},
			getSeekerRequests(){
				axios.get(this.$uri+"/jobhunter/getRequests?seeker_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.requestsList = response.data;
				})
				.catch(()=>{
					console.log('error requests')
				})				
			},
			updateSeekerProfile(){
				var data = {
					firstname: this.editfirstname,
					middlename: this.editmiddlename,
					lastname: this.editlastname,
					username: this.editusername,
					password: this.editpassword,
					address: this.editaddress,
					gender: this.editgender,
					objective: this.editobjective,
					cell: this.editcell,
					tel: this.edittel,
					email: this.editjemail,
					userid: window.sessionStorage.getItem('userid')
				}
				axios.post(this.$uri+'/jobhunter/updateSeekerProfile', data)
				.then((response)=>{
					$('#editSeeker').modal('hide');
					this.getDetails();
				})
				.catch(()=>{
					console.log('jobhunter/register-error')
				})
			},
			editProfile(type){
				if(type == "seeker"){
					$('#editSeeker').modal('show');
					this.editusername = this.seekerInformation.username;

					this.editfirstname = this.seekerInformation.firstname;
					this.editmiddlename = this.seekerInformation.middlename;
					this.editlastname = this.seekerInformation.lastname;
					this.editaddress = this.seekerInformation.address;
					this.editjemail = this.seekerInformation.email;
					this.editgender = this.seekerInformation.gender;
					this.editobjective = this.seekerInformation.objectives;
					this.editcell = this.seekerInformation.cellno;
					this.edittel = this.seekerInformation.telno;
				}
				else{console.log(this.employerInformation)
					$('#editEmployer').modal('show');
					this.editcompanyfirstname = this.employerInformation.firstname;
					this.editcompanylastname = this.employerInformation.lastname;
					this.editcompanycell = this.employerInformation.cellno;
					this.editcompanytel = this.employerInformation.telno;
					this.editcompanyusername = this.employerInformation.username;

					this.editcompanycompanyname = this.employerInformation.companyname;
					this.editcompanyaddress = this.employerInformation.address;
					this.editcompanyindustry = this.employerInformation.industry;
					this.editcompanywebsite = this.employerInformation.website;
					this.editcompanyemail = this.employerInformation.email;
					this.editcompanytypology = this.employerInformation.typology;
					this.editcompanydescription = this.employerInformation.description;
				}
			},
			updateCompanyProfile(){
				var data = {
					firstname: this.editcompanyfirstname,
					lastname: this.editcompanylastname,
					cell: this.editcompanycell,
					tel: this.editcompanytel,
					username: this.editcompanyusername,
					password: this.editcompanypassword,
					companyname: this.editcompanycompanyname,
					address: this.editcompanyaddress,
					industry: this.editcompanyindustry,
					website: this.editcompanywebsite,
					email: this.editcompanyemail,
					typology: this.editcompanytypology,
					description: this.editcompanydescription,
					userid: window.sessionStorage.getItem('userid')
				}
				axios.post(this.$uri+'/jobhunter/updateCompanyProfile', data)
				.then((response)=>{ console.log(response.data)
					$('#editEmployer').modal('hide');
					this.getEmployerDetails()
				})
				.catch(()=>{
					console.log('jobhunter/register-error')
				})
			},
			getDetails(){
				$.get("http://hire-express.pbgeabeif.com/api/index.php/jobhunter/details?userid="+window.sessionStorage.getItem('userid'), function(data, status){
			      var data = JSON.parse(data);
			      $('.profilePic').attr('src', "http://hire-express.pbgeabeif.com/profileimage/"+data.profileimg)
			    });
				axios.get(this.$uri+"/jobhunter/details?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					var data = response.data;
					this.seekerInformation = response.data;
					this.name = data.firstname+" "+data.middlename+" "+data.lastname;
					this.address = data.address;
					this.tel = data.telno;
					this.cell = data.cellno;
					this.objectives = data.objectives;
					this.profile = data.profileimg;
					this.seekerRating = data.rating;
					this.email = data.email;
					this.is_verified = data.is_verified;
					this.reviews = data.reviews;
				})
				.catch(()=>{

					console.log('jobhunter details error')

				})

			},
			getEmployerDetails(){

				axios.get(this.$uri+"/employer/details?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					var data = response.data;
					this.employerInformation = data;
					this.companyname = data.companyname;
					this.eaddress = data.address;
					this.etel = data.telno;
					this.ecell = data.cellno;
					this.email = data.email;
					this.personel = data.firstname+" "+data.lastname;
					this.website = data.website;
					this.industry = data.industry;
					this.seekerRating = data.rating;
					this.reviews = data.reviews;
					this.profile = data.profileimg;
					this.description = data.description;
				})
				.catch(()=>{

					console.log('employer details error')

				})

			},
			openBrowser(){
				$('#employerPhoto').click();
				$("#employerPhoto").change(()=>{
					var formData = new FormData();
					formData.append('photo', $('#employerPhoto')[0].files[0]);
					formData.append('id', window.sessionStorage.getItem('userid'));
					axios.post(this.$uri+'/employer/changePhoto', formData)
					.then(response=>{

						this.getEmployerDetails();

					})
					.catch(()=>{
						console.log('error employerphoto')
					})
				});
			},
			openSeekerCover(){
				$('#seekerCover').click();
				$("#seekerCover").change(()=>{
					var formData = new FormData();
					formData.append('photo', $('#seekerCover')[0].files[0]);
					formData.append('id', window.sessionStorage.getItem('userid'));
					axios.post(this.$uri+'/employer/changeCover', formData)
					.then(response=>{

						this.getEmployerDetails();

					})
					.catch(()=>{
						console.log('error employerphoto')
					})
				});
			},
			openBrowserSeeker(){
				$('#seekerPhoto').click();
				$("#seekerPhoto").change(()=>{
					var formData = new FormData();
					formData.append('photo', $('#seekerPhoto')[0].files[0]);
					formData.append('id', window.sessionStorage.getItem('userid'));
					axios.post(this.$uri+'/employer/changePhoto', formData)
					.then(response=>{

						this.getDetails();

					})
					.catch(()=>{
						console.log('error employerphoto')
					})
				});
			},
			openEmployerCover(){
				$('#employerCover').click();
				$("#employerCover").change(()=>{
					var formData = new FormData();
					formData.append('photo', $('#employerCover')[0].files[0]);
					formData.append('id', window.sessionStorage.getItem('userid'));
					axios.post(this.$uri+'/employer/changeCover', formData)
					.then(response=>{

						this.getEmployerDetails();

					})
					.catch(()=>{
						console.log('error employerphoto')
					})
				});
			},
			getReviews(){

				axios.get(this.$uri+"/jobhunter/getReviews?seeker_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.reviewList = response.data;

				})
				.catch(()=>{
					console.log('error getJobsToOffer');
				})

				axios.get(this.$uri+"/employer/getReviews?employer_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.reviewListEmployer = response.data;

				})
				.catch(()=>{
					console.log('error getJobsToOffer');
				})

			},

		}

	}

</script>