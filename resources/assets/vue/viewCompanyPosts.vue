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
			              		<router-link :to="'/viewCompany/'+$route.params.userid" style="color: white">{{companyname}}</router-link>
			              	</h3>
			              	<div class="text-center" style="display: inline-block;">
					        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.floor(employerRating)"></i> 
					        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.floor(employerRating)"></i>
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
		            	<div class="row"  v-if="usertype != 'jobseeker'">
		            		<div class="col-sm-12">
		            			<a href="javascript:void(0)" class="pull-right" @click="editPost(index, item.id)">Edit</a>
		            		</div>
		            	</div>
		              <div class="row">
		              	<div class="col-xs-12">
		              		<div class="row">
		              			<div class="col-xs-6">
		              				<h5 style="margin: 0px">Vacancy({{ item.vacancy }})</h5>
		              			</div>
		              			<div class="col-xs-6">
		              				<h5 style="margin: 0px" class="pull-right">{{item['date1']}}</h5>
		              			</div>
		              		</div>
		              		<hr>
			              	<h3 class="widget-user-username" style="margin-left: 0px; ">
			              		{{item.position}}
			              	</h3>
			              	<p><i class="fa fa-map-marker" aria-hidden="true"></i> Address: {{item.address}}</p>
		              		<p><i class="fa fa-user" aria-hidden="true"></i> Work Type: {{item.worktype}}</p>
		              		<p><i class="fa fa-user" aria-hidden="true"></i> Gender: {{item.gender}}</p>
		              		<p><i class="fa fa-user" aria-hidden="true"></i> Experience: {{item.experience}}</p>
		              	</div>
		              </div>
		              
		            </div>
		            <div class="box-footer no-padding">
		              <ul class="nav nav-stacked">
		                <li><a href="javascript:void(0)">
		                	<p>{{item.description}}</p>
		                </a></li>
		                <li v-if="usertype == 'jobseeker'">
		                	<a href="javascript:void(0)">
		                		<input type="file" class="hidden" :id="'uploadResume_'+item.id" @change="openSwal(item.id)">
				              	<button type="button" class="btn btn-default btn-xs btn-block" style="margin-left: auto; margin-right: auto" @click="uploadResume(item.id)"><i class="fa fa-share"></i> Send Resume</button>
		                	</a>
		                </li>
		                <li v-if="usertype == 'employer'">
		                	<a href="javascript:void(0)">
		                		<button class="btn btn-default btn-block btn-xs" @click="openModal(item.id)">View Applicants</button>
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
		<div id="applicantsModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        Applicants
		      </div>
		      <div class="modal-body">
		        <div class="box-body">
		            <div v-if="applicantList.length == 0">
						<h3 class="text-center">{{loadingApplicants}}</h3>
					</div>	
		            <div v-for="(item, index) in applicantList">
		            	<div class="row">
		            		<div class="col-xs-12">
		            			<div class="widget-user-header">
					              <div class="widget-user-image pull-left">
					                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px" @click="viewSeeker(item.userDetail.userid)">
					            		<img :src="$uriImage+item.profileimg" style="height: 100%" alt="User Avatar">
					            	</div>
					            	<p v-if="item.status == 'applicant'" class="text-warning text-center">Applicant</p>
			            			<p v-if="item.status == 'hired'" class="text-success text-center">With Contract</p>
			            			<p v-if="item.status == 'endcontract'" class="text-danger text-center">Contract Ended</p>
			            			<p v-if="item.status == 'endcontract'" class="text-success text-center">
			            				<span v-if="item.rating == null"><button class="btn btn-flat btn-xs btn-primary btn-block">Rate Employee</button></span>
			            				<div class="text-center" style="display: inline-block;" v-if="item.rating">
								        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="(rating, x) in parseInt(item.rating.rating)" @click="rateEmployee((x+1), item.userDetail.userid)"></i> 
								        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="(rating, x) in 5-parseInt(item.rating.rating)" @click="rateEmployee((1+parseInt(item.rating.rating))+x, item.userDetail.userid)" ></i>
								        </div>
			            			</p>
					              </div>
					              <!-- /.widget-user-image -->
					              <div class="pull-right">
					              		<h3 style="margin-top: 0px" class="widget-user-username" @click="viewSeeker(item.userDetail.userid)">{{item.userDetail.firstname+" "+item.userDetail.lastname}}</h3>
						              <h5 class="widget-user-desc">{{item.userDetail.cellno+" / "+item.userDetail.telno}}</h5>
						              <h5 class="widget-user-desc">{{item.address}}</h5>
						              <h5 class="widget-user-desc">
						              	<a :href="$uriImage.replace('profileimage', 'files')+item.attachfile">resume</a>
						              	<div style="display: inline" class="pull-right"  v-if="item.status == 'applicant'">
						              		<button class="btn btn-flat btn-success btn-xs" @click="hireApplicant(item.applicationid)">Hire</button>
						              		<button class="btn btn-flat btn-danger btn-xs" @click="removeApplicant(item.applicationid)">Remove</button>
						              	</div>
		            					<button class="btn btn-flat btn-warning pull-right btn-xs" v-if="item.status == 'hired'" @click="endContract(item.applicationid)">End Contract</button>
		            					<button class="btn btn-flat btn-primary pull-right btn-xs" v-if="item.status == 'endcontract'" @click="openFeedbackModal(item.userDetail.userid)">Leave Feedback</button>
						              </h5>
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
		<div id="feedbackModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-body">
		        <div class="box-body">
		              <!-- post text -->
	              <h4>Leave a feedback</h4>
	              <div class="row">
	              	<div class="col-xs-12">
	              		<textarea class="form-control" placeholder="Leave a feedback..." v-model="feedback"></textarea>
	              	</div>
	              </div>
	              <br>
	              <div class="row">
	              	<div class="col-sm-12">
	              		<button class="pull-right btn btn-flat btn-primary" @click="submitFeedback">Send</button>
	              	</div>
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
		<div id="editPostModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Update Job Vacancy</h4>
		      </div>
		      <div class="modal-body">
		        <div class="row">
					<div class="col-sm-12">
						<form @submit.prevent="postjob">
						<div class="row">
							<div class="col-sm-12">
								<div class="form-group has-feedback">
							        <input type="textbox" class="form-control" placeholder="Vacancies" v-model="evacancy">
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
	</div>
</template>
<script>
	
	import axios from 'axios';
	import swal from 'sweetalert2';

	export default{

		data(){
			
			return{
				companyname: "",
				employerRating: 0,
				reviewCount: 0,
				profileimg: "",
				jobList:[],
				loading: "Loading...",
				usertype: window.sessionStorage.getItem('usertype'),
				applicantList: [],
				loadingApplicants: "Loading...",
				currentJobId: 0,
				feedback: "",
				currentSeekerId: 0,
				selectedJobid: 0,
				evacancy: 0,
				total: 0
			}

		},
		methods: {
			openFeedbackModal(jobid){
				this.currentSeekerId = jobid;
				$('#applicantsModal').modal('hide');
				$('#feedbackModal').modal('show')
			},
			submitFeedback(){
				axios.post(this.$uri+'/jobhunter/submitFeedback', {feedback: this.feedback, jobid: this.currentSeekerId, empid: window.sessionStorage.getItem('userid')})
				.then(response=>{
					this.feedback = "";
					$('#feedbackModal').modal('hide');
					$('#applicantsModal').modal('show');
					
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			rateEmployee(rating, jobid){
				// console.log(this.applicantList[index].rating);
				// this.applicantList[index].rating.rating = rating
				// this.items.$set(index, val)
				// console.log(this.applicantList[index].rating)
				axios.post(this.$uri+'/jobhunter/rateSeeker', {rating, jobid, empid: window.sessionStorage.getItem('userid')})
				.then(response=>{
					axios.get(this.$uri+'/jobhunter/getApplicantsByJob?jobid='+this.currentJobId)
					.then(response=>{
						this.applicantList = response.data;
						if(this.applicantList.length == 0){
							this.loadingApplicants = "No data to show..."
						}
					})
					.catch(()=>{
						console.log('getApplicantsByJob error')
					})
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			endContract(id){
				axios.post(this.$uri+'/jobhunter/endContract', {id})
				.then(response=>{
					$('#applicantsModal').modal('hide');
					axios.get(this.$uri+'/jobhunter/getApplicantsByJob?jobid='+this.currentJobId)
					.then(response=>{
						this.applicantList = response.data;
						if(this.applicantList.length == 0){
							this.loadingApplicants = "No data to show..."
						}
					})
					.catch(()=>{
						console.log('getApplicantsByJob error')
					})
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			hireApplicant(id){
				axios.post(this.$uri+'/jobhunter/hireApplicant', {id})
				.then(response=>{
					$('#applicantsModal').modal('hide');
					axios.get(this.$uri+'/jobhunter/getApplicantsByJob?jobid='+this.currentJobId)
					.then(response=>{
						this.applicantList = response.data;
						if(this.applicantList.length == 0){
							this.loadingApplicants = "No data to show..."
						}
					})
					.catch(()=>{
						console.log('getApplicantsByJob error')
					})
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			removeApplicant(id){

				axios.post(this.$uri+'/jobhunter/removeApplicant', {id})
				.then(response=>{
					$('#applicantsModal').modal('hide');
					axios.get(this.$uri+'/jobhunter/getApplicantsByJob?jobid='+this.currentJobId)
					.then(response=>{
						this.applicantList = response.data;
						if(this.applicantList.length == 0){
							this.loadingApplicants = "No data to show..."
						}
					})
					.catch(()=>{
						console.log('getApplicantsByJob error')
					})
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			viewSeeker(id){
				this.$router.push('/viewSeeker/'+id);
				$('#applicantsModal').modal('hide');
			},
			openModal(id){
				$('#applicantsModal').modal('show')
				this.currentJobId = id;
				axios.get(this.$uri+'/jobhunter/getApplicantsByJob?jobid='+id)
				.then(response=>{
					this.applicantList = response.data;
					if(this.applicantList.length == 0){
						this.loadingApplicants = "No data to show..."
					}
				})
				.catch(()=>{
					console.log('getApplicantsByJob error')
				})

			},
			openSwal(id){

				swal.fire({
				  title: 'Confirmation',
				  text: "Send an application for this job?",
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes'
				}).then((result) => {
				  if (result.value) {

				  	var formData = new FormData();
					formData.append('photo', $('#uploadResume_'+id)[0].files[0]);
					formData.append('id', window.sessionStorage.getItem('userid'));
					formData.append('jobid', id)
					axios.post(this.$uri+'/jobhunter/uploadResume', formData)
					.then(response=>{

						swal.fire(
					      'Success!',
					      'Application successfully submitted.',
					      'success'
					    )

					})
					.catch(()=>{
						console.log('error uploadResume')
					})

				  }
				})
			},
			getProfile(){

				axios.get(this.$uri+"/employer/details?userid="+this.$route.params.userid)
				.then(response=>{
					console.log('test');
					console.log(response.data);
					console.log('test')
					var data = response.data;
					this.companyname = data.companyname;
					this.profileimg = data.profileimg;
					this.reviewCount = data.reviews;
					this.employerRating = data.rating;
				})
				.catch(()=>{

					console.log('employer details error')

				})

			},
			getCompanyPosts(){

				this.loading = "Loading...";
				axios.get(this.$uri+"/job/getJobsByEmployer?userid="+this.$route.params.userid)
				.then(response=>{

					this.jobList = response.data;
					if(this.jobList.length == 0){
						this.loading = "No data to show.";
					}

				})
				.catch(()=>{
					console.log('error get getJobsByEmployer')
				})

			},
			uploadResume(id){

				$('#uploadResume_'+id).click();
			},
			editPost(index, id){

				$('#editPostModal').modal('show');
				this.evacancy = this.jobList[index].vacancy;
				this.selectedJobid = this.jobList[index].id;

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

						id: this.selectedJobid,
						vacancy: this.evacancy,
						plan: this.total

					}
					axios.post(this.$uri+"/job/editPostVacant", data)
					.then(response=>{
						this.evacancy = "";
						this.total = 0;
						this.getCompanyPosts();
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
		},
		mounted(){

			this.getProfile();
			this.getCompanyPosts();

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

						id: vm.selectedJobid,
						vacancy: vm.evacancy,
						plan: vm.total

					}
					axios.post(vm.$uri+"/job/editPostVacant", data)
					.then(response=>{
						vm.evacancy = 0;
						vm.total = 0;
						vm.getCompanyPosts();
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
			
		}

	}

</script>