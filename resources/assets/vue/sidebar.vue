<template>
	<aside class="main-sidebar">
	    <!-- sidebar: style can be found in sidebar.less -->
	    <div id="seekerSide" style="display: none">
	    	<section class="sidebar">
	     	
		      <ul class="sidebar-menu" data-widget="tree">
		        <li class="header">MAIN NAVIGATION</li>
		       
		        <li>
		        	<router-link to="/index">
		        		<i class="fa fa-home"></i> <span>Home</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		        	</router-link>
		        </li>

		        <li>
		          <router-link :to="'/viewSeekerPosts/'+userid">
			          	<i class="fa fa-th"></i> <span>My Posts</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		          </router-link>
		        </li>

		        <!-- <li>
		          <router-link to="/infoRequests">
			          	<i class="fa fa-th"></i> <span>Information Requests</span>
			            <span class="pull-right-container">
			            </span>
		          </router-link>
		        </li> -->

		        <!-- <li>
		          <router-link to="/jobOffers">
			          	<i class="fa fa-th"></i> <span>Job Offers</span>
			            <span class="pull-right-container"> -->
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            <!-- </span>
		          </router-link>
		        </li>
 -->		        
		        <li>
		          <router-link :to="'/completedJob/'+userid">
			          	<i class="fa fa-check-square-o"></i> <span>Completed Job</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		          </router-link>
		        </li>

		        <li>
		          <router-link :to="'/myApplications'">
			          	<i class="fa fa-address-card-o"></i> &nbsp;<span>My Applications</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		          </router-link>
		        </li>

		        <li>
		          <router-link :to="'/chat/'+userid">
			          	<i class="fa fa-comment"></i> <span>Messages</span>
			            <span class="pull-right-container">
			              <small class="label pull-right bg-green" v-if="newMessage>0">new</small>
			            </span>
		          </router-link>
		        </li>

		        <li>
		          <a href="javascript:void(0)"></a>
		        </li>
		        <li>
		          <router-link to="/seekerpost" >
			          	<span class="btn btn-success btn-block" style="width: 190px">Post Job</span>
		          </router-link>
		        </li>

		      </ul>
		    </section>
	    </div>
	    <div id="employerSide" style="display: none;">
	    	<section class="sidebar">
		     	
		      <ul class="sidebar-menu" data-widget="tree">
		        <li class="header">MAIN NAVIGATION</li>
		       
		        <li>
		        	<router-link to="/employerHome">
		        		<i class="fa fa-home"></i> <span>Home</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		        	</router-link>
		        </li>
		        <!-- <li>
		          <router-link to="/profile">
			          	<i class="fa fa-th"></i> <span>Profile</span>
			            <span class="pull-right-container">
			              
			            </span>
		          </router-link>
		        </li> -->

		        <li>
		        	<router-link :to="'/viewCompanyPosts/'+userid">
		        		<i class="fa fa-th"></i> <span>Posted Vacancies</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		        	</router-link>
		        </li>

		        <li>
		          <router-link :to="'/viewCompletedJobs/'+userid">
			          	<i class="fa fa-handshake-o"></i> <span>&nbsp;&nbsp;Recently Worked With</span>
			            <span class="pull-right-container">
			              <!-- <small class="label pull-right bg-green">new</small> -->
			            </span>
		          </router-link>
		        </li>

		        <li>
		          <router-link :to="'/chat/'+userid">
			          	<i class="fa fa-comment"></i> <span>Messages</span>
			            <span class="pull-right-container">
			               <small class="label pull-right bg-green" v-if="newMessage>0">new</small>
			            </span>
		          </router-link>
		        </li> 
		        
		        <li>
		          <a href="javascript:void(0)"></a>
		        </li>
		        <li>
		          <router-link to="/postJob" >
			          	<span class="btn btn-success btn-block" style="width: 190px">Post Job Vacancy</span>
		          </router-link>
		        </li>

		      </ul>
		    </section>
	    </div>
	    
	  </aside>
</template>

<script>
	import axios from 'axios';
	export default{

		data(){
			return{

				isJobseeker: "",
				userid: window.sessionStorage.getItem('userid'),
				newMessage: 0

			}
		},
		mounted(){

			if(window.sessionStorage.getItem('usertype')=="jobseeker"){
				$('#seekerSide').show();
				$('#employerSide').hide();
			}
			else{
				$('#seekerSide').hide();
				$('#employerSide').show();
			}
			
			var vm = this
			setInterval(function(){
				axios.get(vm.$uri+"/messages/getAllChatCount?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					
					vm.newMessage = response.data;

				})
				.catch(()=>{
					console.log('error get getJobsByEmployer')
				})
			}, 8000)

		}

	}
</script>
<style scoped>
	i{
		font-size: 20px;
		margin-left: 3px !important;
	}
</style>