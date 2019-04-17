<template>
	<div>
		<h3 class="text-center">Recently Worked With</h3>
		<br>
		<div class="row" v-for="(item, index) in completedList" v-if="usertype == 'employer'">
			<div class="col-sm-12">
				<div class="callout callout-default" style="background-color: white; border-color: orange; padding-bottom: 7px">
			        <h4>{{item.companyname}}</h4>
			        <p>Position: {{item.jobdetails.position}}</p>
			        <p>Address: {{item.address}}</p>
			        <p>Contact No: {{item.cellno+" | "+item.telno}}</p>
			        <p>Contract End: {{item.contract.contractend}}</p>
			    </div>
			</div>
		</div>
		<div class="row" v-for="(item, index) in completedList" v-if="usertype == 'jobseeker'" @click="openRatingModal(index)">
			<div class="col-sm-12">
				<div class="callout callout-default" style="background-color: white; border-color: orange; padding-bottom: 7px">
			        <h4>{{item.companyname}}</h4>
			        <p>Position: {{item.jobdetails.position}}</p>
			        <p>Address: {{item.address}}</p>
			        <p>Contact No: {{item.cellno+" | "+item.telno}}</p>
			        <p>Contract End: {{item.contract.contractend}}</p>
			    </div>
			</div>
		</div>
		<div v-if="completedList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
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
	              	<div class="col-xs-6">
	              		<div class="text-center" style="display: inline-block;">
				        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="(rate, x) in parseInt(rating)" @click="rateEmployee((x+1))"></i> 
				        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="(rate, x) in 5-parseInt(rating)" @click="rateEmployee((1+parseInt(rating))+x)" ></i>
				      </div>
	              	</div>
	              	<div class="col-xs-6">
	              		<button class="pull-right btn btn-flat btn-primary" @click="submitFeedback">Send</button>
	              	</div>
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
	
	export default{

		data(){

			return{
				completedList: [],
				loading: "Loading...",
				usertype: window.sessionStorage.getItem('usertype'),
				feedback: "",
				rating: 0,
				currentEmpid: 0
			}

		},
		mounted(){

			this.getCompletedJobs();

		},
		methods:{
			submitFeedback(){
				axios.post(this.$uri+'/employer/submitFeedback', {feedback: this.feedback, empid: this.currentEmpid, jobid: window.sessionStorage.getItem('userid')})
				.then(response=>{
					this.feedback = "";
					$('#feedbackModal').modal('hide');
					
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			rateEmployee(rating){
				// console.log(this.applicantList[index].rating);
				// this.applicantList[index].rating.rating = rating
				// this.items.$set(index, val)
				// console.log(this.applicantList[index].rating)
				this.rating = rating;
				axios.post(this.$uri+'/employer/rateSeeker', {rating, jobid: window.sessionStorage.getItem('userid'), empid: this.currentEmpid})
				.then(response=>{
					
				})
				.catch(()=>{
					console.log('removeApplicant error')
				})
			},
			openRatingModal(index){
				this.rating = this.completedList[index].rating;
				this.currentEmpid = this.completedList[index].empid;
				$('#feedbackModal').modal('show');
			},
			getCompletedJobs(){

				axios.get(this.$uri+"/job/getCompletedJobs?seeker_id="+this.$route.params.userid)
				.then(response=>{

					this.completedList = response.data;
					if(this.completedList.length == 0){
						this.loading = "No data to show.";
					}

				})
				.catch(()=>{
					console.log('error getCompletedJobs');
				})

			}

		}

	}

</script>