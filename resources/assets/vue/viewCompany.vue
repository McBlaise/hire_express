<template>
	<div>
		<div class="box box-warning">
	        <div class="box-body box-profile">
	        	<!-- <div class="row">
	        		<div class="col-sm-12">
	        			<router-link to="/editEmployer" class="pull-right">Edit</router-link>
	        		</div>
	        	</div> -->
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
	          <input type="file" id="employerPhoto" class="hide">
	          <h3 class="profile-username text-center">{{companyname}}</h3>

	          <!-- <p class="text-muted text-center">Software Engineer</p> -->
	          <strong></i>About</strong>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;{{description}}</p>
	          <ul class="list-group list-group-unbordered">
	            <li class="list-group-item" style="height: 60px">
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
	          		<div style="display: block; margin-left: auto; margin-right: auto;" class="text-center">
	          			<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(ratings)"></i> 
			        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(ratings)"></i>
	          		</div>
	          		<p class="text-center">{{(ratings*1).toFixed(1)}}</p>
	          		<p class="text-center">Reviews ({{reviews}})</p>
	          	</div>
	          </div>
	          <!-- <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> -->
	        </div>
	        <!-- /.box-body -->
	    </div>
	    <div class="row">
        	<div class="col-sm-12">
        		<router-link :to="'/viewCompanyPosts/'+this.$route.params.userid" class="btn btn-flat btn-block btn-default">
        			View Job Posts
        		</router-link>
        	</div>
        </div>
        <br>
	    <div class="row">
	    	<div class="col-sm-12">
	    		<router-link :to="'/viewCompletedJobs/'+this.$route.params.userid" class="btn btn-flat btn-block btn-default">
	    			Recently Worked With
	    		</router-link>
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
	</div>
</template>

<script>

	import axios from 'axios';
	
	export default{

		mounted(){
			this.getDetails(this.$route.params.userid);
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
				reviewListEmployer:[],
				is_verified: "",
				ratings: 0,
				reviews: 0,
				description: ""
			}

		},
		methods:{
			getDetails(userid){

				axios.get(this.$uri+"/employer/details?userid="+userid)
				.then(response=>{
					var data = response.data;
					this.companyname = data.companyname;
					this.eaddress = data.address;
					this.etel = data.telno;
					this.ecell = data.cellno;
					this.email = data.email;
					this.personel = data.firstname+" "+data.lastname;
					this.website = data.website;
					this.industry = data.industry;
					this.is_verified = data.is_verified;
					this.profile = data.profileimg;
					this.ratings = data.rating;
					this.reviews = data.reviews;
					this.description = data.description;
				})
				.catch(()=>{

					console.log('employer details error')

				})

				axios.get(this.$uri+"/employer/getReviews?employer_id="+userid)
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