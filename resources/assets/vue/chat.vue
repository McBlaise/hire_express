<template>
	<div>
		<h3 class="text-center" v-if="type=='jobseeker'">Chat with Employers</h3>
		<h3 class="text-center" v-else>Chat with Jobseekers</h3>
		<input placeholder="Search..." type="textbox" class="form-control" v-model="searchTxt" @keyup="search">
		<br>
		<div v-if="peopleList.length > 0">
			<div class="box box-widget" v-if="type=='employer'">
	            <!-- /.box-body -->
	            <div class="box-footer box-comments">
	              <div class="box-comment" v-for="(item, index) in peopleList" @click="goToConversation(item.userid)">
	                <!-- User image -->
	                <img class="img-circle img-sm" :src="$uriImage+item.profileimg" alt="User Image">

	                <div class="comment-text">
	                      <span class="username">
	                        {{item.fullname}}
	                        <!-- <span class="text-muted pull-right">8:03 PM Today</span> -->
	                      </span><!-- /.username -->
	                  {{item.contentchat}}
	                  <span class="label label-success pull-right" v-if="item.chatcount>0">{{item.chatcount}}</span>
	                </div>
	                <!-- /.comment-text -->
	              </div>
	              <!-- /.box-comment -->
	            </div>
	          </div>
	          <div class="box box-widget" v-else>
	            <!-- /.box-body -->
	            <div class="box-footer box-comments">
	              <div class="box-comment" v-for="(item, index) in peopleList" @click="goToConversation(item.userid)">
	                <!-- User image -->
	                <img class="img-circle img-sm" :src="$uriImage+item.profileimg" alt="User Image">

	                <div class="comment-text">
	                      <span class="username">
	                        {{item.fullname}}
	                        <!-- <span class="text-muted pull-right">8:03 PM Today</span> -->
	                      </span><!-- /.username -->
	                  {{item.contentchat}}
	                  <span class="label label-success pull-right" v-if="item.chatcount>0">{{item.chatcount}}</span>
	                </div>
	                <!-- /.comment-text -->
	              </div>
	              <!-- /.box-comment -->
	            </div>
	          </div>
		</div>
          <div v-if="peopleList.length == 0">
			<h3 class="text-center">{{loading}}</h3>
		</div>
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		data(){

			return{

				peopleList: [],
				receiver: 0,
				type: window.sessionStorage.getItem('usertype'),
				searchTxt: "",
				backUp: [],
				loading: "Loading..."

			}

		},
		methods:{

			getPeople(){
				this.loading = "Loading...";
				if(window.sessionStorage.getItem('usertype')=="employer"){
					axios.get(this.$uri+"/messages/getPeople?userid="+this.$route.params.userid)
					.then(response=>{

						this.peopleList = response.data;
						this.backUp = response.data;
						if(this.peopleList == 0){
							this.loading = "No user found."
						}

					})
					.catch(()=>{
						console.log('error getPeople');
					})
				}
				else{
					axios.get(this.$uri+"/messages/getPeopleSeeker?userid="+this.$route.params.userid)
					.then(response=>{

						this.peopleList = response.data;
						this.backUp = response.data;
						if(this.peopleList == 0){
							this.loading = "No user found."
						}

					})
					.catch(()=>{
						console.log('error getPeople');
					})
				}

			},
			goToConversation(jobid){

				this.$router.push('/conversation/'+this.$route.params.userid+'/'+jobid);

			},
			search(){
				var filtered = [];

				if(window.sessionStorage.getItem('usertype')=="employer"){
					for(var i = 0; i < this.peopleList.length; i++){
						if(this.peopleList[i].fullname.toLowerCase().search(this.searchTxt.toLowerCase()) != -1 && this.searchTxt != ""){
							filtered.push(this.peopleList[i]);
						}
					}
				}
				else{
					for(var i = 0; i < this.peopleList.length; i++){
						if(this.peopleList[i].fullname.toLowerCase().search(this.searchTxt.toLowerCase()) != -1 && this.searchTxt != ""){
							filtered.push(this.peopleList[i]);
						}
					}
				}
				if(filtered.length == 0){
					this.loading = "No user found."
					this.peopleList = [];
				}
				if(filtered.length > 0){
					this.peopleList = filtered;
				}
				if(this.searchTxt == ""){
					this.peopleList = this.backUp;
				}
				
			}

		},
		mounted(){

			this.getPeople();

		}

	}

</script>