<template>
	<div>
		<div class="row" v-for="(item, index) in jobList">
			<div class="col-sm-12">
				<div class="box box-widget widget-user">

		            <!-- Add the bg color to the header using any of the bg-* classes -->
		            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
		            	<div class="btn-group pull-right">
		                  <button type="button" class="btn btn-default">{{item.status}}</button>
		                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" v-if="item.status != 'Done'">
		                    <span class="caret"></span>
		                    <span class="sr-only">Toggle Dropdown</span>
		                  </button>
		                  <ul class="dropdown-menu" role="menu" v-if="item.status == 'Open'">
		                    <li @click="closeJob(item.id)"><a href="javascript:void(0)">Close</a></li>
		                  </ul>
		                  <ul class="dropdown-menu" role="menu" v-if="item.status == 'Close'">
		                    <li @click="doneJob(item.id)"><a href="javascript:void(0)">Done</a></li>
		                  </ul>
		                </div>
		              <h3 class="widget-user-username">{{item.position}}</h3>
		              <h5 class="widget-user-desc">{{item.company.companyname}}</h5>
		            </div>
		            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
		            	<div class="btn-group pull-right">
		                  <button type="button" class="btn btn-default">{{item.status}}</button>
		                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" v-if="item.status != 'Done'">
		                    <span class="caret"></span>
		                    <span class="sr-only">Toggle Dropdown</span>
		                  </button>
		                  <ul class="dropdown-menu" role="menu" v-if="item.status == 'Open'">
		                    <li @click="closeJob(item.id)"><a href="javascript:void(0)">Close</a></li>
		                  </ul>
		                  <ul class="dropdown-menu" role="menu" v-if="item.status == 'Close'">
		                    <li @click="doneJob(item.id)"><a href="javascript:void(0)">Done</a></li>
		                  </ul>
		                </div>
		              <h3 class="widget-user-username">{{item.position}}</h3>
		              <h5 class="widget-user-desc">{{item.company.companyname}}</h5>
		            </div>
		            
		            <div class="box-footer" style="padding-top: 0px">
		              <div class="row">
		                <div class="col-xs-6 border-right">
		                  <div class="description-block">
		                    <h5 class="description-header"><b>Address</b></h5>
		                    <span class="description-text">{{item.address}}</span>
		                  </div>
		                  <!-- /.description-block -->
		                </div>
		                <!-- /.col -->
		                <div class="col-xs-6 border-right">
		                  <div class="description-block">
		                    <h5 class="description-header"><b>Contacts</b></h5>
		                    <span class="description-text">{{item.company.cellno+"  |  "+item.company.telno}}</span>
		                  </div>
		                  <!-- /.description-block -->
		                </div>
		                <!-- /.col -->
		              </div>
		              <!-- /.row -->
		              <hr style="margin-top: 0px; margin-bottom: 0px">
		              <div class="row">
		              	<div class="col-sm-12">{{item.description}}</div>
		              </div>
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
	import swal from 'sweetalert2';
	
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
				axios.get(this.$uri+"/job/getJobsByEmployer?userid="+window.sessionStorage.getItem('userid'))
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
			closeJob(id){
				axios.post(this.$uri+"/job/closeJob", {id})
				.then(response=>{
					this.getJobs();
					swal('Job successfully closed.');
				})
				.catch(()=>{
					console.log('error close job')
				})
			},
			doneJob(id){
				axios.post(this.$uri+"/job/doneJob", {id})
				.then(response=>{
					this.getJobs();
					swal('Job done. Please rate your employees');
				})
				.catch(()=>{
					console.log('error close job')
				})
			}

		}

	}

</script>