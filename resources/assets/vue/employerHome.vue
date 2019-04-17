<template>
	<div>
		
		<div v-if="ads.length>0">
			<div class="row">
				<div class="col-xs-5"><p class="text-center" style="font-size: 20px">Verified Users</p></div>
				<div class="col-xs-7"><hr style="border-top: 2px solid #ddd; margin-top: 15px"></div>
			</div>
			
			
			<div id="employerAds" class="carousel slide" data-ride="carousel">

			  <!-- Wrapper for slides -->
			  <div class="carousel-inner">
			  	<div class="row item active" v-for="(item, index) in ads" v-if="index == 0">
					<div class="col-sm-12">
						<div class="box box-widget widget-user-2" @click="goToProfile(item.userid)">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div class="widget-user-header" style="background: #ea6060;
		background: -moz-linear-gradient(45deg, #ea6060 0%, #f4a82e 100%, #2989d8 100%, #207cca 100%, #7db9e8 100%);
		background: -webkit-linear-gradient(45deg, #ea6060 0%,#f4a82e 100%,#2989d8 100%,#207cca 100%,#7db9e8 100%);
		background: linear-gradient(45deg, #ea6060 0%,#f4a82e 100%,#2989d8 100%,#207cca 100%,#7db9e8 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ea6060', endColorstr='#7db9e8',GradientType=1 );">
				              <div class="row">
				              	<div class="col-xs-4">
				              		<div class="widget-user-image" v-if="item.profileimg != ''">
						                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
						            		<img :src="$uriImage+item.profileimg" style="height: 100%" alt="User Avatar">
						            	</div>
						            </div>
						            <div class="widget-user-image" v-else>
						                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
						            		<img :src="$uriImage+item.profileimg" style="height: 100%" alt="User Avatar">
						            	</div>
						            </div>
						            <div class="text-center" style="display: block;">
							        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.floor(item.rating)"></i> 
							        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.floor(item.rating)"></i>
							        </div>
							        <!-- <p class="text-center" style="color: white"><small>{{item.reviewCount}} reviews</small></p> -->
				              	</div>
				              	<div class="col-xs-8">
					              	<h3 class="widget-user-username" style="margin-left: 0px; color: white">
					              		<router-link :to="'/viewSeekerPosts/'+item.userid" style="color: white">{{item.position}}</router-link>
					              	</h3>
					              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.firstname+" "+item.lastname}}</h5>
					              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.completedJobCount}} completed jobs</h5>
					              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.objectives}}</h5>
				              	</div>
				              </div>
				              
				              
				            </div>
				        </div>
					</div>
				</div>
			    <div class="row item" v-for="(item, index) in ads" v-if="index > 0">
					<div class="col-sm-12">
						<div class="box box-widget widget-user-2" @click="goToProfile(item.userid)">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div class="widget-user-header" style="background: #ea6060;
		background: -moz-linear-gradient(45deg, #ea6060 0%, #f4a82e 100%, #2989d8 100%, #207cca 100%, #7db9e8 100%);
		background: -webkit-linear-gradient(45deg, #ea6060 0%,#f4a82e 100%,#2989d8 100%,#207cca 100%,#7db9e8 100%);
		background: linear-gradient(45deg, #ea6060 0%,#f4a82e 100%,#2989d8 100%,#207cca 100%,#7db9e8 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ea6060', endColorstr='#7db9e8',GradientType=1 );">
				              <div class="row">
				              	<div class="col-xs-4">
				              		<div class="widget-user-image" v-if="item.profileimg != ''">
						                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
						            		<img :src="$uriImage+item.profileimg" style="height: 100%" alt="User Avatar">
						            	</div>
						            </div>
						            <div class="widget-user-image" v-else>
						                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
						            		<img :src="$uriImage+item.profileimg" style="height: 100%" alt="User Avatar">
						            	</div>
						            </div>
						            <div class="text-center" style="display: block;">
							        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.floor(item.rating)"></i> 
							        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.floor(item.rating)"></i>
							        </div>
							        <!-- <p class="text-center" style="color: white"><small>{{item.reviewCount}} reviews</small></p> -->
				              	</div>
				              	<div class="col-xs-8">
					              	<h3 class="widget-user-username" style="margin-left: 0px; color: white">
					              		<router-link :to="'/viewSeekerPosts/'+item.userid" style="color: white">{{item.position}}</router-link>
					              	</h3>
					              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.firstname+" "+item.lastname}}</h5>
					              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.completedJobCount}} completed jobs</h5>
					              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.objectives}}</h5>
				              	</div>
				              </div>
				              
				              
				            </div>
				        </div>
					</div>
				</div>
			  </div>

			  <!-- Left and right controls -->
			  <a class="left carousel-control" href="#employerAds" data-slide="prev">
			    <span class="glyphicon glyphicon-chevron-left"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="right carousel-control" href="#employerAds" data-slide="next">
			    <span class="glyphicon glyphicon-chevron-right"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
			<hr style="border-top: 2px solid #ddd; margin-top: 0px">
		</div>
		
		<div class="row">
			<div class="col-sm-12">
				<input type="textbox" class="form-control" placeholder="Search.." @keyup="search" v-model="searchTxt">
			</div>
		</div>
		<br>
		<div class="row" v-for="(item, index) in jobList">
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
		              		<div class="widget-user-image" v-if="item.image != ''">
				                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
				            		<img :src="$uriImage+item.image" style="height: 100%" alt="User Avatar">
				            	</div>
				            </div>
				            <div class="widget-user-image" v-else>
				                <div class="img-circle" style="overflow: hidden; height: 90px; width: 90px">
				            		<img :src="$uriImage+item.image" style="height: 100%" alt="User Avatar">
				            	</div>
				            </div>
				            <div class="text-center" style="display: block;">
					        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.floor(item.rating)"></i> 
					        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.floor(item.rating)"></i>
					        </div>
					        <p class="text-center" style="color: white"><small>{{item.reviewCount}} reviews</small></p>
		              	</div>
		              	<div class="col-xs-8">
			              	<h3 class="widget-user-username" style="margin-left: 0px; color: white">
			              		<router-link :to="'/viewSeekerPosts/'+item.userid" style="color: white">{{item.position}}</router-link>
			              	</h3>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.name}}</h5>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">Date Posted: {{item["date1"]}}</h5>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">Rate: &#8369; {{item.rateperhour+"/hr"}}</h5>
		              	</div>
		              </div>
		              
		              
		            </div>
		            <div class="box-footer no-padding">
		              <ul class="nav nav-stacked">
		                <li><a href="javascript:void(0)">Service Offer:<br>&nbsp;&nbsp;&nbsp;{{item.serviceoffer}}</a></li>
		                <li><a href="javascript:void(0)">Address:<br>&nbsp;&nbsp;&nbsp;{{item.address}}</a></li>
		                <li><a href="javascript:void(0)">Description:<br>&nbsp;&nbsp;&nbsp;{{item.description}}</a></li></li>
		              </ul>
		            </div>
		        </div>
			</div>
		</div>
		<div v-if="jobList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
	</div>
</template>
<script>

	import axios from 'axios';
	
	export default{

		mounted(){
			$(function(){
				$('.carousel').carousel({
				      interval: 2000
				    });
				setInterval(function(){
					$('.right.carousel-control').trigger('click');
				}, 10000)
			});
			this.getJobs();
			this.getAds();

		},
		data(){

			return{

				jobList: [],
				loading: "Loading...",
				searchTxt: "",
				ads: []
			}

		},
		methods:{

			getJobs(){
				
				this.loading = "Loading...";
				axios.get(this.$uri+"/job/getAllSeekerPostEmployer")
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
			getAds(){
				this.ads = []
				axios.get(this.$uri+"/job/getAds")
				.then(response=>{

					this.ads = response.data;

				})
				.catch(()=>{
					console.log('error get getJobsByEmployer')
				})
			},
			search(){

				this.loading = "Loading...";
				axios.get(this.$uri+"/job/searchSeeker?searchTxt="+this.searchTxt)
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
			goToProfile(userid){
				this.$router.push('/viewSeeker/'+userid);
			}

		}

	}

</script>