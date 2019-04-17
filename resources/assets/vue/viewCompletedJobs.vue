<template>
	<div>
		<h3 class="text-center">Recently Worked With</h3>
		<br>
		<div class="row" v-for="(item, index) in completedList">
			<div class="col-sm-12">
				<div class="callout callout-default" style="background-color: white; border-color: orange; padding-bottom: 7px">
			        <h4>{{item.firstname+" "+item.lastname}}</h4>
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

				axios.get(this.$uri+"/jobhunter/getEmployeesWorkedWith?employer_id="+this.$route.params.userid)
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