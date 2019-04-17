<template>
	<div>
		<div class="row">
			<div class="col-sm-12">
				<form @submit.prevent="postjob">
				<div class="box box-warning">
					<div class="box-header with-border">
		              <h3 class="box-title">Job Information</h3>
		            </div>
					<div class="box-body">
						
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Title/Position" v-model="title">
					      </div>
					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Address" v-model="address">
					      </div>
					      <div class="form-group">
			                  <select class="form-control" v-model="type">
			                    <option>Full Time</option>
			                    <option>Part Time</option>
			                    <option>Home Service</option>
			                    <option>Event Service</option>
			                  </select>
			              </div>
			              <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="vacancy" v-model="vacancy">
					      </div>
					      <div class="form-group">
			                  <select class="form-control" v-model="gender">

			                    <option>Male</option>
			                    <option>Female</option>
			                    <option>All</option>
			                  </select>
			              </div>

					</div>
				</div>

				<div class="box box-warning">
					<div class="box-header with-border">
		              <h3 class="box-title">Optional</h3>
		            </div>
					<div class="box-body">
						
					      <div class="row">
					      	<div class="col-sm-3">
					      		<div class="form-group has-feedback">
							        <input type="textbox" class="form-control" placeholder="Experience" v-model="experience">
							    </div>
					      	</div>
					      </div>
					      <div class="form-group">
					        <textarea class="form-control" placeholder="Description" v-model="description"></textarea>
					      </div>
					      <div class="row hidden">
								<div class="col-sm-12">
									<label for="uploadPhoto" class="btn btn-success btn-flat pull-right">Upload Photo</label>
									<input type="file" class="hidden" id="uploadPhoto">
								</div>
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
											- 1 Month Urgent Hiring Display<br>
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
											- 6 Months Urgent Hiring Display<br>
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
								<div class="col-xs-12">
									<h4 style="color: black" class="text-center"><b>Free - PHP 0</b></h4>
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
					<div class="col-xs-8">
						{{message}}
					</div>
					<div class="col-xs-4">
						<button type="submit" class="btn btn-flat btn-primary pull-right">Post</button>
					</div>
				</div>
				</form>
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
		        		<div id="paypal-button"></div>
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
						position: vm.title,
						address: vm.address,
						employment_type: vm.type,
						vacancy: vm.vacancy,
						gender: vm.gender,
						ageA: vm.ageA,
						ageB: vm.ageB,
						ageType: vm.ageType,
						experience: vm.experience,
						experienceType: vm.experienceType,
						description: vm.description,
						companyid: window.sessionStorage.getItem('userid'),
						plan: vm.total
					}
					data = JSON.stringify(data);
					vm.message = "Loading...";

					var formData = new FormData();
					formData.append('data', data);
					formData.append('photo', $('#uploadPhoto')[0].files[0]);
					axios.post(vm.$uri+"/job/newJob", formData)
					.then(response=>{
						
						if(response.data.status == "success"){
							// this.$router.push('/jobDetails/'+response.data.jobid)
							// this.$router.push('/indexEmployer')
							swal('Job vacancy successfully posted.');
							vm.title = "";
							vm.address = "";
							vm.type = "Full Time";
							vm.vacancy = "";
							vm.gender = "Male";
							vm.experience = "";
							vm.description = "";
							vm.message = "";
							vm.total = 0;
							$('#paypalModal').modal('hide')
						}

					})
					.catch(()=>{

						console.log('error job new')

					})

			      });
			    }
			}, '#paypal-button');
		},
		data(){
			return{
				title: "",
				address: "",
				type: "Full Time",
				vacancy: "",
				gender: "Male",
				ageA: "",
				ageB: "",
				ageType: "To",
				experience: "",
				experienceType: "Years",
				description: "",
				message:"",
				total: 0
			}

		},
		methods:{
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
						position: this.title,
						address: this.address,
						employment_type: this.type,
						vacancy: this.vacancy,
						gender: this.gender,
						ageA: this.ageA,
						ageB: this.ageB,
						ageType: this.ageType,
						experience: this.experience,
						experienceType: this.experienceType,
						description: this.description,
						companyid: window.sessionStorage.getItem('userid'),
						plan: this.total
					}
					data = JSON.stringify(data);
					this.message = "Loading...";

					var formData = new FormData();
					formData.append('data', data);
					formData.append('photo', $('#uploadPhoto')[0].files[0]);
					axios.post(this.$uri+"/job/newJob", formData)
					.then(response=>{
						
						if(response.data.status == "success"){
							// this.$router.push('/jobDetails/'+response.data.jobid)
							// this.$router.push('/indexEmployer')
							swal('Job vacancy successfully posted.');
							this.title = "";
							this.address = "";
							this.type = "Full Time";
							this.vacancy = "";
							this.gender = "Male";
							this.experience = "";
							this.description = "";
							this.message = "";
							this.plan = 0;
						}

					})
					.catch(()=>{

						console.log('error job new')

					})
				}
				else{
					$('#paypalModal').modal('show')
				}

			}

		}

	}

</script>