<template>
	<div>
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
		              	</div>
		              	<div class="col-xs-8">
			              	<h3 class="widget-user-username" style="margin-left: 0px; color: white">{{item.name}}</h3>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">{{item.position}}</h5>
			              	<h5 class="widget-user-desc" style="margin-left: 0px; color: white">Rate: &#8369; {{item.rateperhour+"/hr"}}</h5>
		              	</div>
		              </div>
		              
		              
		            </div>
		            <div class="box-footer no-padding">
		              <ul class="nav nav-stacked">
		                <li><a href="#">Service Offer:<br>&nbsp;&nbsp;&nbsp;{{item.serviceoffer}}</a></li>
		                <li><a href="#">Address:<br>&nbsp;&nbsp;&nbsp;{{item.address}}</a></li>
		                <li><a href="#">Description:<br>&nbsp;&nbsp;&nbsp;{{item.description}}</a></li>
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

			this.getJobs();

		},
		data(){

			return{

				jobList: [],
				loading: "Loading..."

			}

		},
		methods:{

			getJobs(){

				this.loading = "Loading...";
				axios.get(this.$uri+"/job/getAllSeekerPost?userid="+window.sessionStorage.getItem('userid'))
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

		}

	}

</script>