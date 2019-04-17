<template>
	<div>
		<h3 class="text-center">Information Requests</h3>
		<br>
		<div class="row" v-for="(item, index) in requestList">
			<div class="col-sm-12">
				<div class="box box-widget widget-user-2" v-if="item.company">
		            <!-- Add the bg color to the header using any of the bg-* classes -->
		            <div class="widget-user-header">
		              <div class="widget-user-image">
		                <img class="img-circle" :src="$uriImage+item.company.profileimg" alt="User Avatar">
		              </div>
		              <!-- /.widget-user-image -->
		              <h3 class="widget-user-username">{{item.company.companyname}}</h3>
		              <h5 class="widget-user-desc"><button class="btn-xs btn btn-success" @click="respondRequest('accept', item.employer_id)">Accept</button>
		              	&nbsp;<button class="btn-xs btn btn-default" @click="respondRequest('decline', item.employer_id)">Decline</button></h5>
		            </div>
		        </div>
			</div>
		</div>
		<div v-if="requestList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		mounted(){

			this.getRequestList();
			
		},
		data(){

			return{

				requestList: [],
				loading: "Loading..."

			}

		},
		methods:{

			getRequestList(){

				axios.get(this.$uri+"/jobhunter/getRequestList?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.requestList = response.data;
					if(this.requestList.length == 0){
						this.loading = "No data to show.";
					}

				})
				.catch(()=>{
					console.log('error requestList');
				})

			},
			respondRequest(response, employer_id){
				axios.post(this.$uri+"/jobhunter/respondRequest",{
					employer_id,
					seeker_id: window.sessionStorage.getItem('userid'),
					is_accepted: response
				})
				.then(response=>{
					this.getRequestList();
				})
				.catch(()=>{
					console.log('respondRequest error')
				})

			}

		}

	}

</script>