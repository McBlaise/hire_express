<template>
	<div>
		<h3 class="text-center">Completed Jobs</h3>
		<br>
		<div class="row" v-for="(item, index) in completedList">
			<div class="col-sm-12">
				<div class="callout callout-default" style="background-color: white; border-color: orange; padding-bottom: 7px">
			        <h4>{{item.position}}</h4>
			        <p>{{item.companyname}}</p>
			        <hr style="margin-top: 7px; margin-bottom: 7px">
			        <div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
			        	<p class="text-center">
			        		<router-link :to="'/viewEmployees/'+item.id" style="color: #000000">View Employees ({{item.hireCount}})</router-link>
			        	</p>
			        </div>
			    </div>
			</div>
		</div>
		<div v-if="completedList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		data(){

			return{
				completedList: [],
				loading: "Loading..."
			}

		},
		mounted(){

			this.getCompletedJobs();

		},
		methods:{

			getCompletedJobs(){

				axios.get(this.$uri+"/job/getCompletedJobsEmployer?employer_id="+window.sessionStorage.getItem('userid'))
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