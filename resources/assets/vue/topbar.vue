<template>
	<div>
		<div class="navbar-custom-menu">
	        <ul class="nav navbar-nav">
	          <li class="dropdown notifications-menu">
	            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" @click="clearNotif">
	              <i class="fa fa-bell-o"></i>
	              <span class="label label-success" v-if="notifCount > 0" >{{notifCount}}</span>
	            </a>
	            <ul class="dropdown-menu" style="height: 400px; overflow-y: scroll;">
	              <li v-for="(item, index) in notifList">
	                <!-- inner menu: contains the actual data -->
	                <ul class="menu">
	                  <li>
	                    <a href="#" style="white-space: normal">
	                    	<div style="display: inline-block;">
                    			<div style="width: 40px; height: 40px; overflow: hidden;">
                    				<img :src="$uriImage+item.userDetails.profileimg" style="width: 100%">
                    			</div>
                    		</div>
                    		&nbsp;&nbsp;
                    		<div style="display: inline-block;" v-if="usertype == 'employer'" @click="goToSeeker(item.userDetails.userid)">
			                      <h4 style="text-transform: capitalize;"><b>{{item.userDetails.firstname+" "+item.userDetails.lastname}}</b></h4>
			                      {{item.notifcontent}}
                    		</div>
                    		<div style="display: inline-block;" v-if="usertype == 'jobseeker'" @click="goToCompany(item.userDetails.userid)">
                    			<h4 style="text-transform: capitalize;"><b>{{item.userDetails.companyname}}</b></h4>
			                      {{item.notifcontent}}
                    		</div>
	                    </a>
	                  </li>
	                </ul>
	              </li>
	              <!-- <li class="footer"><a href="#">View all</a></li> -->
	            </ul>
	          </li>
	          <!-- User Account: style can be found in dropdown.less -->
	          <li class="dropdown user user-menu">
	            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
	              <img :src="$uriImage+profile" class="user-image profilePic" alt="User Image">
	              <!-- <span class="hidden-xs" id="profilename"></span> -->
	            </a>
	            <ul class="dropdown-menu">
	              <!-- User image -->
	              <li class="user-header">
	                <img :src="$uriImage+profile" class="img-circle profilePic" alt="User Image">

	                <p  id="profilename">
	                </p>
	              </li>
	              <!-- Menu Footer-->
	              <li class="user-footer">
	                <div class="pull-left">
	                  <a href="#/profile" class="btn btn-default btn-flat">Profile</a>
	                </div>
	                <div class="pull-right">
	                  <a href="javascript:void(0)" onclick="logout()" class="btn btn-default btn-flat">Sign out</a>
	                </div>
	              </li>
	            </ul>
	          </li>
	        </ul>
	    </div>
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		mounted(){

			if(window.sessionStorage.getItem('usertype') == "jobseeker"){
				this.isJobseeker = true;
				this.getDetails();
			}
			else{
				this.isJobseeker = false;
				this.getEmployerDetails();
			}

			setInterval(()=>{
				this.getNotif();
			}, 4000)
		},
		data(){
			return{
				
				isJobseeker: "...",
				profile: "default.jpg",
				userid: window.sessionStorage.getItem('userid'),
				notifList:[],
				usertype: window.sessionStorage.getItem('usertype'),
				notifCount: 0
			}
		},
		methods:{

			getDetails(){

				axios.get(this.$uri+"/jobhunter/details?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.profile = data.profileimg;
				})
				.catch(()=>{

					console.log('jobhunter details error')

				})

			},
			getEmployerDetails(){

				axios.get(this.$uri+"/employer/details?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					var data = response.data;
					this.profile = data.profileimg;
				})
				.catch(()=>{

					console.log('employer details error')

				})

			},
			clearNotif(){
				axios.get(this.$uri+"/job/clearNotif?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.notifCount = 0
				})
				.catch(()=>{

					console.log('employer details error')

				})
			},
			getNotif(){

				if(this.usertype == 'jobseeker'){

					axios.get(this.$uri+"/job/getNotifSeeker?userid="+window.sessionStorage.getItem('userid'))
					.then(response=>{
						var data = response.data;
						this.notifList = data;
						console.log(this.notifList)
					})
					.catch(()=>{

						console.log('employer details error')

					})
				}
				else{
					axios.get(this.$uri+"/job/getNotifEmployer?userid="+window.sessionStorage.getItem('userid'))
					.then(response=>{
						var data = response.data;
						this.notifList = data;
						console.log(this.notifList)
					})
					.catch(()=>{

						console.log('employer details error')

					})
				}

				axios.get(this.$uri+"/job/getNotifCount?userid="+window.sessionStorage.getItem('userid'))
				.then(response=>{
					this.notifCount = response.data.count
				})
				.catch(()=>{

					console.log('employer details error')

				})
				

			},
			goToSeeker(id){
				this.$router.push('viewSeeker/'+id)
			},
			goToCompany(id){
				this.$router.push('viewCompany/'+id)
			}

		}

	}

</script>