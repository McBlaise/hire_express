<template>
	<div>
		<div class="row">
			<div class="col-sm-12">
				<div class="box box-widget widget-user-2">
		            <!-- Add the bg color to the header using any of the bg-* classes -->
		            <div class="widget-user-header" style="background: #ea6060;
background: -moz-linear-gradient(45deg, #ea6060 0%, #f4a82e 100%, #2989d8 100%, #207cca 100%, #7db9e8 100%);
background: -webkit-linear-gradient(45deg, #ea6060 0%,#f4a82e 100%,#2989d8 100%,#207cca 100%,#7db9e8 100%);
background: linear-gradient(45deg, #ea6060 0%,#f4a82e 100%,#2989d8 100%,#207cca 100%,#7db9e8 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ea6060', endColorstr='#7db9e8',GradientType=1 );">
		              <div class="row">
		              	<div class="col-xs-4">
		              		<div class="widget-user-image" v-if="profileimg != ''">
				                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
				            		<img :src="$uriImage+profileimg" style="height: 100%" alt="User Avatar">
				            	</div>
				            </div>
				            <div class="widget-user-image" v-else>
				                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
				            		<img :src="$uriImage+profileimg" style="height: 100%" alt="User Avatar">
				            	</div>
				            </div>
		              	</div>
		              	<div class="col-xs-8">
			              	<h3 class="widget-user-username" style="margin-left: 0px; color: white">
			              		<router-link :to="'/viewSeeker/'+$route.params.userid" style="color: white">{{name}}</router-link>
			              	</h3>
			              	<div class="text-center" style="display: inline-block;">
					        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(seekerRating)"></i> 
					        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(seekerRating)"></i>
					        </div>
					        <p class="text-center" style="color: white; display: inline-block;"><small v-if="reviewCount>0">{{reviewCount}} reviews</small></p>
		              	</div>
		              </div>
		              
		            </div>
		        </div>
			</div>
		</div>	
		<div class="row" v-for="(item, index) in jobList">
			<div class="col-sm-12">
				<div class="box box-widget widget-user-2">
		            <!-- Add the bg color to the header using any of the bg-* classes -->
		            <div class="widget-user-header">
		            	<div class="row"  v-if="usertype == 'jobseeker'">
		            		<div class="col-sm-12">
		            			<a href="javascript:void(0)" class="pull-right" @click="editPost(index, item.jobpostid)">Edit</a>
		            		</div>
		            	</div>
		              <div class="row">
		              	<div class="col-xs-12">
			              	<h3 class="widget-user-username" style="margin-left: 0px; ">
			              		{{item.position}}
			              	</h3>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; ">Date Posted: {{item["date1"]}}</h5>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; ">Rate: &#8369; {{item.rateperhour+"/hr"}}</h5>
		              	</div>
		              </div>
		              
		            </div>
		            <div class="box-footer no-padding">
		              <ul class="nav nav-stacked">
		                <li><a href="javascript:void(0)">Service Offer:<br>&nbsp;&nbsp;&nbsp;{{item.serviceoffer}}</a></li>
		                <!-- <li><a href="javascript:void(0)">Address:<br>&nbsp;&nbsp;&nbsp;{{item.address}}</a></li> -->
		                <li><a href="javascript:void(0)">Description:<br>&nbsp;&nbsp;&nbsp;{{item.description}}</a></li>
		                <li v-if="usertype == 'jobseeker'"><a href="javascript:void(0)"><button class="btn btn-default btn-block" @click="showInvitationModal(index)">View Invitations</button></a></li>
		                <li v-if="usertype == 'employer'">
		                	<a href="javascript:void(0)" v-if="item.isOffered == false">
		                		<button class="btn btn-default btn-block" @click="sendInvitation(index)">Send Invitation</button>
		                	</a>
		                	<a href="javascript:void(0)" v-else>
		                		<p class="text-center text-success">Invitation Sent</p>
		                	</a>
		                </li>
		              </ul>
		            </div>
		        </div>
			</div>
		</div>
		<div v-if="jobList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
		<div id="invitationModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        Invitation List
		      </div>
		      <div class="modal-body">
		        <div class="box-body">
		         <div v-if="invitationList.length == 0">
						<h3 class="text-center">{{invitationLoading}}</h3>
					</div>	
		            <div v-for="(item, index) in invitationList">
		            	<div class="row">
		            		<div class="col-xs-12">
		            			<div class="widget-user-header">
					              <div class="widget-user-image pull-left">
					                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
					            		<img :src="$uriImage+item.profileimg" style="height: 100%" alt="User Avatar">
					            	</div>
					            	
					              </div>
					              <!-- /.widget-user-image -->
					              <div class="pull-right">
					              		<h3 style="margin-top: 0px" class="widget-user-username" @click="viewSeeker(item.userid)">{{item.companyname}}</h3>
						              <h5 class="widget-user-desc">Offered</h5>
						              <button class="btn btn-flat btn-primary" @click="viewSeeker(item.userid)">Visit Profile</button>
					              </div>
					            </div>
		            		</div>
		            	</div>
		            	<hr>
		            </div>
	            </div>
		      </div>
		    </div>

		  </div>
		</div>
		<div id="editPostModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Update Job Post</h4>
		      </div>
		      <div class="modal-body">
		        <div class="row">
					<div class="col-sm-12">
						<form @submit.prevent="postjob">
						<div class="row">
							<div class="col-sm-12">
								<div class="form-group has-feedback">
							        <input type="textbox" class="form-control" placeholder="Rate per hour" v-model="eperhour">
							    </div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div class="small-box" @click="setPayment(300)" style="background-color: white" id="regular">
									<div class="row">
										<div class="col-xs-12">
											<h4 style="color: black" class="text-center"><b>Premium - PHP 300</b></h4>
										</div>
									</div>
									<hr style="margin: 0px">
									<div class="row">
										<div class="col-xs-12">
											<div class="pull-left">
												<p style="margin-left: 20px;color: black; text-align: left;">
													- 1 Month Suggested Jobs Post Display<br>
													- 1 Month Free<br>
													- Advertising display
												</p>
											</div>
										</div>
									</div>
						        </div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div class="small-box" @click="setPayment(800)" style="background-color: white" id="special">
									<div class="row">
										<div class="col-xs-12">
											<h4 style="color: black" class="text-center"><b>Premium - PHP 800</b></h4>
										</div>
									</div>
									<hr style="margin: 0px">
									<div class="row">
										<div class="col-xs-12">
											<div class="pull-left">
												<p style="margin-left: 20px;color: black; text-align: left;">
													- 6 Month Suggested Jobs Post Display<br>
													- 1 Month Free<br>
													- Advertising display
												</p>
											</div>
										</div>
									</div>
						        </div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div class="small-box" @click="setPayment(0)" style="background-color: white" id="free">
									<div class="row">
										<div class="col-xs-6">
											<h4 style="color: black"><b>Free</b></h4>
										</div>
										<div class="col-xs-6">
											<h4 style="color: black">PHP 0</h4>
										</div>
									</div>
									<hr style="margin: 0px">
									<div class="row">
										<div class="col-xs-12">
											<div class="pull-left">
												<p style="margin-left: 20px;color: black; text-align: left;">
													- No Urgent Hiring Display<br>
													- No 1 Month Free<br>
													- No Advertising display
												</p>
											</div>
										</div>
									</div>
						        </div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-4">
								<!-- {{message}} -->
							</div>
							<div class="col-xs-4">
								
							</div>
							<div class="col-xs-4">
								<button type="submit" class="btn btn-flat btn-primary pull-right">Post</button>
							</div>
						</div>
						</form>
					</div>
				</div>
		      </div>
		    </div>

		  </div>
		</div>
		<div id="paypalModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-body">
		      	<h4 class="text-center">Checkout</h4>
		      	<br>
		        <div class="row">
		        	<div class="col-xs-7">
		        		<div id="paypal-buttonn"></div>
		        	</div>
		        	<div class="col-xs-5">PHP {{total}}</div>
		        </div>
		      </div>
		    </div>

		  </div>
		</div>
	</div>
</template>
<script>

	import axios from 'axios';
	import swal from 'sweetalert2';
	
	export default{

		mounted(){

			this.getJobs();
			this.getUserDetails();

			var vm = this;
			window.paypal.Button.render({
			    // Configure environment
			    env: 'sandbox',
			    client: {
			      sandbox: 'demo_sandbox_client_id',
			      production: 'demo_production_client_id'
			    },
			    // Customize button (optional)
			    locale: 'en_US',
			    style: {
			      size: 'small',
			      color: 'gold',
			      shape: 'pill',
			    },

			    // Enable Pay Now checkout flow (optional)
			    // commit: true,

			    // Set up a payment
			    payment: function(data, actions) {
			      return actions.payment.create({
			        transactions: [{
			          amount: {
			            total: vm.total,
			            currency: 'PHP'
			          }
			        }]
			      });
			    },
			    // Execute the payment
			    onAuthorize: function(data, actions) {
			      return actions.payment.execute().then(function() {
			        var data = {

						jobpostid: vm.selectedJobid,
						rateperhour: vm.eperhour,
						plan: vm.total

					}
					axios.post(vm.$uri+"/job/editPost", data)
					.then(response=>{
						vm.eperhour = 0;
						vm.total = 0;
						vm.getJobs();
						$('#regular').css('background-color', 'white');
						$('#special').css('background-color', 'white');
						$('#free').css('background-color', 'white');
						$('#paypalModal').modal('hide')
						swal('Job successfully updated.');
					})
					.catch(()=>{
						console.log('error')
					})

			      });
			    }
			}, '#paypal-buttonn');

		},
		data(){

			return{

				jobList: [],
				loading: "Loading...",
				name: "",
				address: "",
				tel: "",
				cell: "",
				objectives: "",
				profileimg: "",
				seekerRating: "",
				email: "",
				reviewCount: 0,
				usertype: window.sessionStorage.getItem('usertype'),
				invitationList: [],
				invitationLoading: "Loading...",
				total:0,
				eperhour: "",
				selectedJobid: 0

			}

		},
		methods:{
			viewSeeker(id){
				$('#invitationModal').modal('hide');
				this.$router.push('/viewCompanyPosts/'+id);
			},
			showInvitationModal(index){

				this.invitationLoading == "Loading...";
				$('#invitationModal').modal('show');
				axios.get(this.$uri+"/jobhunter/invitationList?postid="+this.jobList[index].jobpostid)
				.then(response=>{

					this.invitationList = response.data;
					if(this.invitationList.length == 0){
						this.invitationLoading = "No data to show.";
					}
					
				})
				.catch(()=>{

					console.log('jobhunter detailss error')

				})
			},
			sendInvitation(index){

				axios.post(this.$uri+"/jobhunter/sendInvitation", {
					jobid: this.jobList[index].jobseekerid,
					empid: window.sessionStorage.getItem('userid'),
					postid: this.jobList[index].jobpostid,
					status: "offered"
				})
				.then(response=>{
					this.getJobs();
					swal.fire(
					      'Success!',
					      'Invitation successfully sent.',
					      'success'
					    )
				})
				.catch(()=>{
					console.log('sendInvitation error')
				})
			},
			getJobs(){

				if(this.usertype == 'employer'){
					this.loading = "Loading...";
					axios.get(this.$uri+"/job/getAllSeekerPost?userid="+this.$route.params.userid+"&empid="+window.sessionStorage.getItem('userid'))
					.then(response=>{

						this.jobList = response.data;
						if(this.jobList.length == 0){
							this.loading = "No data to show.";
						}

					})
					.catch(()=>{
						console.log('error get getJobsByEmployer')
					})
				}
				else{
					this.loading = "Loading...";
					axios.get(this.$uri+"/job/getAllSeekerPost?userid="+this.$route.params.userid)
					.then(response=>{

						this.jobList = response.data;
						if(this.jobList.length == 0){
							this.loading = "No data to show.";
						}

					})
					.catch(()=>{
						console.log('error get getJobsByEmployer')
					})
				}
				

			},
			getUserDetails(){
				axios.get(this.$uri+"/jobhunter/details?userid="+this.$route.params.userid)
				.then(response=>{
					var data = response.data;
					this.name = data.firstname+" "+data.lastname;
					this.address = data.address;
					this.tel = data.telno;
					this.cell = data.cellno;
					this.objectives = data.objectives;
					this.profile = data.profileimg;
					this.seekerRating = data.rating;
					this.email = data.email;
					this.profileimg = data.profileimg;
					this.reviewCount = data.reviews;
				})
				.catch(()=>{

					console.log('jobhunter details error')

				})
			},
			editPost(index, id){

				$('#editPostModal').modal('show');
				this.eperhour = this.jobList[index].rateperhour;
				this.selectedJobid = this.jobList[index].jobpostid;

			},
			setPayment(price){
				this.total = price;
				if(price == 300){
					$('#regular').css('background-color', '#ddd');
					$('#special').css('background-color', 'white');
					$('#free').css('background-color', 'white');
				}
				if(price == 800){
					$('#special').css('background-color', '#ddd');
					$('#regular').css('background-color', 'white');
					$('#free').css('background-color', 'white');
				}
				if(price == 0){
					$('#free').css('background-color', '#ddd');
					$('#special').css('background-color', 'white');
					$('#regular').css('background-color', 'white');
				}
			},
			postjob(){
				if(this.total == 0){
					var data = {

						jobpostid: this.selectedJobid,
						rateperhour: this.eperhour,
						plan: this.total

					}
					axios.post(this.$uri+"/job/editPost", data)
					.then(response=>{
						this.eperhour = "";
						this.total = 0;
						this.getJobs();
						$('#regular').css('background-color', 'white');
						$('#special').css('background-color', 'white');
						$('#free').css('background-color', 'white');
						$('#editPostModal').modal('hide');
						swal('Job successfully updated.');
					})
					.catch(()=>{
						console.log('error')
					})
				}
				else{
					$('#editPostModal').modal('hide')
					$('#paypalModal').modal('show')
				}
			}

		}

	}

</script>