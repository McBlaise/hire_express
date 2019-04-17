<template>
	<div>
		<div class="box box-warning">
	        <div class="box-body box-profile">
	          
	          <div class="row">
	          	<div class="col-xs-12">
	          		<img class="profile-user-img img-responsive img-circle" style="height: 100px; width: 100px; margin-left: auto; margin-right: auto; display: block;" :src="$uriImage+profile" alt="User profile picture">
	          	</div>
	          </div>
	          <div class="row" v-if="is_verified>0">
	          	<div class="col-xs-12">
	          		<div style="width: 100px; margin-left: auto; margin-right: auto"><i style="margin-top: -30px; font-size: 30px; color: #2196F3" class="fa fa-check-circle pull-right" aria-hidden="true"></i></div>
	          	</div>
	          </div>

	          <input type="file" id="seekerPhoto" class="hide">
	          <h3 class="profile-username text-center">{{name}}</h3>

	          <!-- <p class="text-muted text-center">Software Engineer</p> -->
	          <ul class="list-group list-group-unbordered" v-if="isConnected == ''">
	            <li class="list-group-item text-center">
	              <b class="text-center">Loading...</b>
	            </li>
	          </ul>
	          <ul class="list-group list-group-unbordered" >
	            <li class="list-group-item">
	              <b>Address</b> <a class="pull-right">{{address}}</a>
	            </li>
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
	          <!-- <ul class="list-group list-group-unbordered" v-if="isConnected == 'pending'">
	            <li class="list-group-item text-center">
	              <button class="btn btn-sm btn-default btn-flat ">Request Pending</button>
	            </li>
	          </ul> -->
	          <!-- <ul class="list-group list-group-unbordered" v-if="isConnected == 'false'">
	            <li class="list-group-item text-center">
	              <button class="btn btn-sm btn-primary " @click="requestInfo">Request to View Information</button>
	            </li>
	          </ul> -->
	          
	          <strong></i>Objectives</strong>
	          <p>{{objectives}}</p>
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
	    <!-- <div class="row">
	    	<div class="col-sm-12">
	    		<button class="btn btn-success btn-block" data-toggle="modal" data-target="#myModal">HIRE ME</button>
	    	</div>
	    </div> -->
	    <br>
	    <div class="row">
        	<div class="col-sm-12">
        		<router-link :to="'/viewSeekerPosts/'+this.$route.params.userid" class="btn btn-flat btn-block btn-default">
        			View Job Posts
        		</router-link>
        	</div>
        </div>
	    <br>
	    <div class="row" v-if="allowed == 'allowed'">
        	<div class="col-sm-12">
        		<router-link :to="'/completedJob/'+this.$route.params.userid" class="btn btn-flat btn-block btn-default">
        			View work history
        		</router-link>
        	</div>
        </div>
        <div class="row" v-else-if="allowed == 'pending'">
        	<div class="col-sm-12">
        		<button class="btn btn-flat btn-block btn-default">
        			Waitig for Confirmation
        		</button>
        	</div>
        </div>
        <div class="row" v-else>
        	<div class="col-sm-12">
        		<button @click="sendRequest" class="btn btn-flat btn-block btn-default">
        			Send Request to View Information 
        		</button>
        	</div>
        </div>
        <br>
        <div class="row">
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
	    <div id="myModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <h4 class="modal-title text-center">Select Job To Offer</h4>
		      </div>
		      <div class="modal-body" style="height: 400px; overflow: scroll; overflow-x: hidden;">
		        <div class="row" v-for="(item, index) in jobList">
					<div class="col-sm-12">
						<div class="box box-widget widget-user">

				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000; height: 100px'">
				            	<button class="btn btn-sm btn-primary pull-right" @click="offerJob(item.id)" v-if="item.offer == 'none'">OFFER</button>
				            	<button class="btn btn-sm btn-default pull-right" v-if="item.offer == 'pending'">WAITING RESPONSE</button>
				              <h3 class="widget-user-username">{{item.position}}</h3>
				            </div>
				            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000; height: 100px'">
				            	<button class="btn btn-sm btn-primary pull-right" @click="offerJob(item.id)" v-if="item.offer == 'none'">OFFER</button>
				            	<button class="btn btn-sm btn-default pull-right" v-if="item.offer == 'pending'">WAITING RESPONSE</button>
				              <h3 class="widget-user-username">{{item.position}}</h3>
				            </div>
				            
				            <div class="box-footer" style="padding-top: 10px">
				              <div class="row">
				              	<div class="col-sm-12">{{item.description}}</div>
				              </div>
				            </div>
				          </div>
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
	import swal from 'sweetalert2';
	
	export default{
		mounted(){
			this.getDetails(this.$route.params.userid);
			this.checkNetwork(this.$route.params.userid);
			this.getJobList();
			this.getJobPosts();
			this.getReviews();
			this.getPermission();
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
				isConnected: "",
				jobList:[],
				jobPostList: [],
				seekerRating: "",
				reviewList:[],
				is_verified: 0,
				reviews: 0,
				allowed: false
			}

		},
		methods:{

			getJobPosts(){
				axios.get(this.$uri+"/job/getAllSeekerPost?userid="+this.$route.params.userid)
				.then(response=>{

					this.jobPostList = response.data;

				})
				.catch(()=>{
					console.log('error get getJobsByEmployer')
				})
			},
			getDetails(userid){

				axios.get(this.$uri+"/jobhunter/details?userid="+userid)
				.then(response=>{
					var data = response.data;
					this.name = data.firstname+" "+data.middlename+" "+data.lastname;
					this.address = data.address;
					this.tel = data.telno;
					this.cell = data.cellno;
					this.objectives = data.objectives;
					this.profile = data.profileimg;
					this.seekerRating = data.rating;
					this.is_verified =  data.is_verified;
					this.reviews = data.reviews;
					this.email = data.email;
				})
				.catch(()=>{

					console.log('jobhunter details error')

				})

			},
			checkNetwork(userid){

				axios.get(this.$uri+"/jobhunter/isConnected?userid="+userid+"&id="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					var data = response.data;
					if(data.status){
						this.isConnected = data.status;
					}
					else{
						this.isConnected = 'false';
					}
				})
				.catch(()=>{

					console.log('jobhunter details error')

				})

			},
			requestInfo(){
				axios.post(this.$uri+"/jobhunter/requestInfo", {seeker_id: this.$route.params.userid, employer_id: window.sessionStorage.getItem('userid')})
				.then(response=>{

					this.checkNetwork(this.$route.params.userid);
					swal('Request successfully sent.');

				})
				.catch(()=>{
					console.log('requestInfo error');
				})
			},
			getJobList(){
				axios.get(this.$uri+"/job/getJobsToOffer?seeker_id="+this.$route.params.userid+"&employer_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.jobList = response.data;

				})
				.catch(()=>{
					console.log('error get getJobsByEmployer')
				})
			},
			offerJob(job_id){

				axios.post(this.$uri+"/jobhunter/offerJob", {seeker_id: this.$route.params.userid, employer_id: window.sessionStorage.getItem('userid'), job_id})
				.then(response=>{

					this.getJobList();

				})
				.catch(()=>{
					console.log('requestInfo error');
				})

			},
			getReviews(){

				axios.get(this.$uri+"/jobhunter/getReviews?seeker_id="+this.$route.params.userid)
				.then(response=>{

					this.reviewList = response.data;

				})
				.catch(()=>{
					console.log('error getJobsToOffer');
				})

			},
			getPermission(){
				axios.get(this.$uri+"/jobhunter/getPermission?seeker_id="+this.$route.params.userid+"&userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.allowed = response.data.is_allowed;
				})
				.catch(()=>{
					console.log('erroro get permission')
				})
			},
			sendRequest(){
				axios.get(this.$uri+"/jobhunter/sendRequest?seeker_id="+this.$route.params.userid+"&userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.getPermission();
				})
				.catch(()=>{
					console.log('erroro get permission')
				})	
			}
		}
	}

</script>