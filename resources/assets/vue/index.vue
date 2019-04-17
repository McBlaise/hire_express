<template>
	<div>
		<div v-if="ads.length>0">
			<div class="row">
				<div class="col-xs-5"><p class="text-center" style="font-size: 20px">Verified Users</p></div>
				<div class="col-xs-7"><hr style="border-top: 2px solid #ddd; margin-top: 15px"></div>
			</div>
			<div id="myCarousel" class="carousel slide" data-ride="carousel">
			  <!-- Indicators -->
			  <ol class="carousel-indicators">
			    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			    <li data-target="#myCarousel" data-slide-to="1"></li>
			    <li data-target="#myCarousel" data-slide-to="2"></li>
			  </ol>

			  <!-- Wrapper for slides -->
			  <div class="carousel-inner">
			  	<div class="row item active" v-for="(item, index) in ads" v-if="index==0">
			    	<div class="col-sm-12">
						<div class="box box-widget widget-user" @click="goToProfile(item.userid)">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				            	<!-- <h5 style="margin-top: 0px" class="pull-right">{{item['date1']}}</h5> -->
				              <h3 class="widget-user-username" ><router-link :to="'/viewCompanyPosts/'+item.userid" style="color: white">{{item.companyname}}</router-link></h3>
				              <!-- <h5 class="widget-user-desc"><router-link :to="'/viewCompanyPosts/'+item.userid" style="color: white">{{item.companyname}}</router-link></h5> -->
				              <div class="row">
					          	<div class="col-sm-12">
					          		<div class="" >
							        	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
								        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
								        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
								        </div>
							        </div>
					          	</div>
					          </div>
				            </div>
				            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				            	<!-- <h5 style="margin-top: 0px" class="pull-right">{{item['date1']}}</h5> -->
				              <!-- <h3 class="widget-user-username" @click="expand(index, item.id)">{{item.position}}</h3> -->
				              <h3 class="widget-user-username" ><router-link :to="'/viewCompanyPosts/'+item.userid" style="color: white">{{item.companyname}}</router-link></h3>
				              <div class="row">
					          	<div class="col-sm-12">
					          		<div class="" >
							        	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
								        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
								        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
								        </div>
							        </div>
					          	</div>
					          </div>
				            </div>
				            
				            <div class="box-footer" style="padding-top: 0px" @click="expand(index, item.id)">
				              <div class="row">
				                <div class="col-xs-12">
				                  <div class="description-block">
				                    <h5 class="description-header"><b>Address</b></h5>
				                    <span class="description-text">{{item.address}}</span>
				                  </div>
				                  <!-- /.description-block -->
				                </div>
				              </div>
				              <!-- /.row -->
				              <!-- <hr style="margin-top: 0px; margin-bottom: 0px">
				              <div class="row">
				              	<div class="col-sm-12">{{item.description}}</div>
				              </div> -->
				            </div>
				          </div>
					</div>
			    </div>
			    <div class="row item" v-for="(item, index) in ads" v-if="index>0">
			    	<div class="col-sm-12">
						<div class="box box-widget widget-user" @click="goToProfile(item.userid)">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				            	<!-- <h5 style="margin-top: 0px" class="pull-right">{{item['date1']}}</h5> -->
				              <!-- <h3 class="widget-user-username" @click="expand(index, item.id)">{{item.position}}</h3> -->
				              <h3 class="widget-user-username" ><router-link :to="'/viewCompanyPosts/'+item.userid" style="color: white">{{item.companyname}}</router-link></h3>
				              <div class="row">
					          	<div class="col-sm-12">
					          		<div class="" >
							        	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
								        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
								        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
								        </div>
							        </div>
					          	</div>
					          </div>
				            </div>
				            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				            	<!-- <h5 style="margin-top: 0px" class="pull-right">{{item['date1']}}</h5> -->
				              <!-- <h3 class="widget-user-username" @click="expand(index, item.id)">{{item.position}}</h3> -->
				              <h3 class="widget-user-username" ><router-link :to="'/viewCompanyPosts/'+item.userid" style="color: white">{{item.companyname}}</router-link></h3></h5>
				              <div class="row">
					          	<div class="col-sm-12">
					          		<div class="" >
							        	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
								        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
								        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
								        </div>
							        </div>
					          	</div>
					          </div>
				            </div>
				            
				            <div class="box-footer" style="padding-top: 0px" >
				              <div class="row">
				                <div class="col-xs-12">
				                  <div class="description-block">
				                    <h5 class="description-header"><b>Address</b></h5>
				                    <span class="description-text">{{item.address}}</span>
				                  </div>
				                  <!-- /.description-block -->
				                </div>
				              </div>
				              <!-- /.row -->
				              <!-- <hr style="margin-top: 0px; margin-bottom: 0px">
				              <div class="row">
				              	<div class="col-sm-12">{{item.description}}</div>
				              </div> -->
				            </div>
				          </div>
					</div>
			    </div>
			  </div>

			  <!-- Left and right controls -->
			  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
			    <span class="glyphicon glyphicon-chevron-left"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="right carousel-control" href="#myCarousel" data-slide="next">
			    <span class="glyphicon glyphicon-chevron-right"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
			<hr style="border-top: 2px solid #ddd; margin-top: 0px">
		</div>
		<div class="row">
			<div class="col-sm-12">
				<input type="textbox" class="form-control" placeholder="Search..." v-model="searchTxt" @keyup="search">
			</div>
		</div>
		<br>
		<div class="row" v-for="(item, index) in jobList">
			<div class="col-sm-12">
				<div class="box box-widget widget-user">
		            <!-- Add the bg color to the header using any of the bg-* classes -->
		            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
		            	<h5 style="margin-top: 0px" class="pull-right">{{item['date1']}}</h5>
		              <h3 class="widget-user-username" @click="expand(index, item.id)">{{item.position}}</h3>
		              <h5 class="widget-user-desc"><router-link :to="'/viewCompanyPosts/'+item.userid" style="color: white">{{item.company.companyname}}</router-link></h5>
		              <div class="row">
			          	<div class="col-sm-12">
			          		<div class="" >
					        	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
						        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
						        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
						        </div>
					        </div>
			          	</div>
			          </div>
		            </div>
		            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
		            	<h5 style="margin-top: 0px" class="pull-right">{{item['date1']}}</h5>
		              <h3 class="widget-user-username" @click="expand(index, item.id)">{{item.position}}</h3>
		              <h5 class="widget-user-desc"><router-link :to="'/viewCompany/'+item.userid" style="color: white">{{item.company.companyname}}</router-link></h5>
		              <div class="row">
			          	<div class="col-sm-12">
			          		<div class="" >
					        	<div class="text-center" style="display: block; margin-left: auto; margin-right: auto;">
						        	<i aria-hidden="true" class="fa fa-star" style="color: orange;" v-for="rating in Math.round(item.rating)"></i> 
						        	<i aria-hidden="true" class="fa fa-star-o" style="color: orange;" v-for="rating in 5-Math.round(item.rating)"></i>
						        </div>
					        </div>
			          	</div>
			          </div>
		            </div>
		            
		            <div class="box-footer" style="padding-top: 0px" @click="expand(index, item.id)">
		              <div class="row">
		                <div class="col-xs-12">
		                  <div class="description-block">
		                    <h5 class="description-header"><b>Address</b></h5>
		                    <span class="description-text">{{item.address}}</span>
		                  </div>
		                  <!-- /.description-block -->
		                </div>
		              </div>
		              <!-- /.row -->
		              <!-- <hr style="margin-top: 0px; margin-bottom: 0px">
		              <div class="row">
		              	<div class="col-sm-12">{{item.description}}</div>
		              </div> -->
		            </div>
		          </div>
			</div>
		</div>
		<div v-if="jobList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
		<div id="expandModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <div class="user-block">
	                <img class="img-circle" :src="$uriImage+modalContent.profileimg" alt="User Image">
	                <span class="username"><a href="javascript:void(0)" @click="goToCompany">{{modalContent.companyname}}</a></span>
	                <span class="description">Vacancies(2) | {{modalContent['date1']}}</span>
	              </div>
		      </div>
		      <div class="modal-body">
		        <div class="box-body">
		              <!-- post text -->
	              <h4>{{modalContent.position}}</h4>
	              <div class="row">
	              	<div class="col-xs-12">
	              		<p><i class="fa fa-map-marker" aria-hidden="true"></i> Address: {{modalContent.address}}</p>
	              		<p><i class="fa fa-user" aria-hidden="true"></i> Work Type: {{modalContent.worktype}}</p>
	              		<p><i class="fa fa-user" aria-hidden="true"></i> Gender: {{modalContent.gender}}</p>
	              		<p><i class="fa fa-user" aria-hidden="true"></i> Experience: {{modalContent.experience}}</p>
	              	</div>
	              </div>
	              <p>{{modalContent.description}}</p>

	              <input type="file" class="hidden" id="uploadResume">
	              <!-- Social sharing buttons -->
	              <button type="button" class="btn btn-default btn-xs" @click="uploadResume"><i class="fa fa-share"></i> Send Resume</button>

	            </div>
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
			$('#uploadResume').on('change', ()=>{
				swal.fire({
				  title: 'Confirmation',
				  text: "Send an application for this job?",
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes'
				}).then((result) => {
				  if (result.value) {

				  	var formData = new FormData();
					formData.append('photo', $('#uploadResume')[0].files[0]);
					formData.append('id', window.sessionStorage.getItem('userid'));
					formData.append('jobid', this.modalContent.id)
					axios.post(this.$uri+'/jobhunter/uploadResume', formData)
					.then(response=>{

						$('#expandModal').modal('hide');
						swal.fire(
					      'Success!',
					      'Application successfully submitted.',
					      'success'
					    )

					})
					.catch(()=>{
						console.log('error uploadResume')
					})

				  }
				})
			})

		},
		data(){

			return{

				jobList: [],
				loading: "Loading...",
				searchTxt: "",
				modalContent: {},
				ads: []

			}

		},
		methods:{
			uploadResume(){
				$('#uploadResume').click();
			},
			expand(index, id){

				

				this.modalContent = "Loading...";

				axios.get(this.$uri+"/job/getJobDetails?id="+id)
				.then(response=>{

					this.modalContent = response.data;
					$('#expandModal').modal('show');
				})
				.catch(()=>{
					console.log("get job details error")
				})

			},
			getJobs(){

				this.loading = "Loading...";
				axios.get(this.$uri+"/job/getAllJobs")
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
				axios.get(this.$uri+"/job/getAdsSeeker")
				.then(response=>{

					this.ads = response.data;

				})
				.catch(()=>{
					console.log('error get getJobsByEmployer')
				})
			},
			search(){

				if(this.searchTxt == ""){
					this.getJobs();
				}
				else{
					this.loading = "Loading...";
					axios.get(this.$uri+"/job/searchJobs?searchTxt="+this.searchTxt)
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

			},
			goToCompany(){
				$('#expandModal').modal('hide');
				this.$router.push('/viewCompany/'+this.modalContent.userid);

			},
			goToProfile(userid){
				this.$router.push('/viewCompany/'+userid);
			},

		}

	}

</script>
<style scoped>
	.widget-user-username{
      height: 60px  !important;
    }
    .widget-user-desc{
      height: 20px   !important;
    }
    .widget-user-header{
      height: 140px !important;
    }
</style>