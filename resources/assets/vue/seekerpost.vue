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
						
					      <!-- <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Address" v-model="address">
					      </div> -->

					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Position" v-model="position">
					      </div>

					      <div class="form-group has-feedback">
					        <input type="textbox" class="form-control" placeholder="Rate per hour" v-model="perhour">
					      </div>

					      <textarea class="form-control" placeholder="Service Offer" v-model="service"></textarea>
					      <br>
					      <textarea class="form-control" placeholder="Description" v-model="description"></textarea>

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
						{{message}}
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

		data(){

			return{
				address: "",
				position: "",
				perhour: "",
				service: "",
				description: "",
				message: "",
				total: 0
			}

		},
		methods:{
			postjob(){

				if(this.total == 0){
					var data = {

						address: this.address,
						position: this.position,
						serviceoffer: this.service,
						rateperhour: this.perhour,
						description: this.description,
						jobseekerid: window.sessionStorage.getItem('userid'),
						plan: this.total

					}
					this.message = "Loading...";
					axios.post(this.$uri+"/job/newSeekerPost", data)
					.then(response=>{
						this.message = "";
						this.address = "";
						this.position = "";
						this.perhour = "";
						this.service = "";
						this.description = "";
						this.total = 0;
						$('#regular').css('background-color', 'white');
						$('#special').css('background-color', 'white');
						$('#free').css('background-color', 'white');
						swal('Job successfully posted.');
					})
					.catch(()=>{
						console.log('error')
					})
				}
				else{
					$('#paypalModal').modal('show')
				}

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
			}
		},
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

						address: vm.address,
						position: vm.position,
						serviceoffer: vm.service,
						rateperhour: vm.perhour,
						description: vm.description,
						jobseekerid: window.sessionStorage.getItem('userid'),
						plan: vm.total

					}
					vm.message = "Loading...";
					axios.post(vm.$uri+"/job/newSeekerPost", data)
					.then(response=>{
						vm.message = "";
						vm.address = "";
						vm.position = "";
						vm.perhour = "";
						vm.service = "";
						vm.description = "";
						vm.total = 0;
						$('#regular').css('background-color', 'white');
						$('#special').css('background-color', 'white');
						$('#free').css('background-color', 'white');
						$('#paypalModal').modal('hide')
						swal('Job successfully posted.');
					})
					.catch(()=>{
						console.log('error')
					})

			      });
			    }
			}, '#paypal-button');
		}

	}

</script>