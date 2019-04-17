<template>
	<div>
		<h3 class="text-center">My Applications</h3>
		<br>
		<div  v-for="(item, index) in completedList" v-if="usertype == 'jobseeker'" @click="goToCompany(item.empid)">
			<div class="row">
				<div class="col-sm-12">
					<div class="callout callout-default" style="background-color: white; border-color: orange; padding-bottom: 7px">
				        <div class="row">
				        	<div class="col-xs-6">
				        		<div class="img-circle" style="width: 60px; height: 60px; overflow: hidden;">
                    				<img :src="$uriImage+item.profileimg" style="width: 100%">
                    			</div>
				        	</div>
							<div class="col-xs-6">
								<p class="pull-right text-success" v-if="item.status == 'hired'">Ongoing</p>
								<p class="pull-right text-warning" v-if="item.status == 'applicant'">Pending</p>
							</div>
						</div>
						<br>
				        <h4>{{item.companyname}}</h4>
				        <p>Position: {{item.jobdetails.position}}</p>
				        <p>Address: {{item.address}}</p>
				        <p>Contact No: {{item.cellno+" | "+item.telno}}</p>
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
				loading: "Loading...",
				usertype: window.sessionStorage.getItem('usertype'),
				feedback: "",
				rating: 0,
				currentEmpid: 0
			}

		},
		mounted(){

			this.getUnfinishedJobs();

		},
		methods:{
			getUnfinishedJobs(){

				axios.get(this.$uri+"/job/getUnfinishedJobs?seeker_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.completedList = response.data;
					if(this.completedList.length == 0){
						this.loading = "No data to show.";
					}

				})
				.catch(()=>{
					console.log('error getCompletedJobs');
				})

			},
			goToCompany(empid){
				this.$router.push('/viewCompany/'+empid)
			}

		}

	}

</script>