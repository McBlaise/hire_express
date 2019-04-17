<template>
	<div>
		<div class="row" v-for="(item, index) in employeeList">
			<div class="col-sm-12">
				<div class="box box-widget widget-user-2">
		            <!-- Add the bg color to the header using any of the bg-* classes -->
		            <div class="widget-user-header">
		              <div class="widget-user-image">
		                <img class="img-circle" :src="$uriImage+item.profileimg" alt="User Avatar">
		              </div>
		              <!-- /.widget-user-image -->
		              <h3 class="widget-user-username">{{item.firstname+" "+item.lastname}}</h3>
		              <h5 class="widget-user-desc" v-if="item.rating == 0">
		              	<button class="btn-xs btn btn-block btn-info" data-toggle="modal" data-target="#rateModal" @click="setEmployeeId(item.userid)">Rate Employee</button>
		              </h5>
		              <h5 class="widget-user-desc" v-else>
		              	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
				        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in parseInt(item.rating)"></i> 
				        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-parseInt(item.rating)"></i>
				        </div>
		              </h5>
		            </div>
		        </div>
			</div>
		</div>
		<div v-if="employeeList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
		<div id="rateModal" class="modal fade" role="dialog">
		  <div class="modal-dialog" style="margin-top: 170px">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-body">
		      	<h4 class="modal-title text-center">Rate Service</h4>
		        <div class="text-center" style="display: block; margin-left: auto; margin-right: auto; font-size: 30px">
		        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" @click="rateEmployee(index+1)" v-for="(item, index) in selectedRating"></i>
		        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" @click="rateEmployee((index+1)+selectedRating)" v-for="(item, index) in 5-selectedRating"></i>
		        </div>
		        <br>
		        <textarea class="form-control" placeholder="Leave a feedback..." v-model="feedback"></textarea>
		        <br>
		        <button class="btn btn-warning btn-flat btn-block" @click="submitRating">Submit</button>
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

		data(){

			return{

				loading: "Loading...",
				employeeList: [],
				selectedId: 0,
				selectedRating: 0,
				feedback: ""

			}

		},
		mounted(){

			this.getEmployeesByJob();

		},
		methods:{

			getEmployeesByJob(){

				axios.get(this.$uri+"/jobhunter/getEmployeesByJob?job_id="+this.$route.params.id)
				.then(response=>{

					this.employeeList = response.data;
					console.log('ths');
					console.log(this.employeeList.length)
					console.log('test')
					if(this.employeeList.length == 0){
						this.loading = "No data to show.";
					}

				})
				.catch(()=>{
					console.log('error getEmployeesByJob');
				})

			},
			rateEmployee(rating){

				this.selectedRating = rating;
			},
			submitRating(){

				axios.post(this.$uri+"/jobhunter/rateEmployee",{
					rating: this.selectedRating,
					seeker_id: this.selectedId,
					feedback: this.feedback,
					job_id: this.$route.params.id
				})
				.then(response=>{
					this.getEmployeesByJob();
					this.selectedId = 0;
					this.feedback = "";
					this.selectedRating = 0;
					$('#rateModal').modal('hide');
					swal('Employee successfully rated.');
				})
				.catch(()=>{
					console.log('rateEmployee error')
				})

			},
			setEmployeeId(userid){

				this.selectedId = userid;

			}

		}

	}

</script>