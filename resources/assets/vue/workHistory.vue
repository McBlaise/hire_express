<template>
	<div>
		<h3 class="text-center">Work History</h3>
		<br>
		<div class="row" v-for="(item, index) in completedList">
			<div class="col-sm-12">
				<div class="callout callout-default" style="background-color: white; border-color: orange; padding-bottom: 7px">
			        <h4>{{item.position}}</h4>
			        <p>Employer: {{item.companyname}}</p>
			        <p>Address: {{item.address}}</p>
			        <p>Contact: {{item.company.cellno+" | "+item.company.telno}}</p>
			        <p>Contract End: {{"contract ended"}}</p>
			        <hr style="margin-top: 7px; margin-bottom: 7px">
			        <div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
			        	<div v-if="item.rating == 0 || item.rating == undefined">
			        		<p class="text-center">No rating yet...</p>
			        	</div>
			        	<div v-else>
			        		<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in parseInt(item.rating)"></i> 
				        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-item.rating"></i>
			        	</div>
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

			this.getCompletedJob();

		},
		methods: {

			getCompletedJob(){

				axios.get(this.$uri+"/job/getCompletedJobs?seeker_id="+this.$route.params.id)
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