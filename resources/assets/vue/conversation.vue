<template>
	<div>
		<div class="box box-warning direct-chat direct-chat-warning" style="margin-bottom: 0px">
            <div class="box-header with-border">
              <h3 class="box-title">Chat</h3>

              <!-- <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts">
                  <i class="fa fa-comments"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div> -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <!-- Conversations are loaded here -->
              <div class="direct-chat-messages" id="chat_container" style="height: 400px">
                <!-- Message. Default to the left -->
                <div v-for="(item, index) in convoList">
                	<div class="direct-chat-msg right" v-if="item.jobid == $route.params.userid">
	                  <div class="direct-chat-info clearfix">
	                    <span class="direct-chat-name pull-right">{{item.fullname}}</span>
	                    <!-- <span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span> -->
	                  </div>
	                  <!-- /.direct-chat-info -->
	                  <img class="direct-chat-img" :src="$uriImage+item.profileimg" alt="Message User Image"><!-- /.direct-chat-img -->
	                  <div class="direct-chat-text">
	                    {{item.contentchat}}
	                  </div>
	                  <!-- /.direct-chat-text -->
	                </div>
	                <div class="direct-chat-msg" v-else>
	                  <div class="direct-chat-info clearfix">
	                    <span class="direct-chat-name pull-left">{{item.fullname}}</span>
	                    <!-- <span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span> -->
	                  </div>
	                  <!-- /.direct-chat-info -->
	                  <img class="direct-chat-img" :src="$uriImage+item.profileimg" alt="Message User Image"><!-- /.direct-chat-img -->
	                  <div class="direct-chat-text">
	                    {{item.contentchat}}
	                  </div>
	                  <!-- /.direct-chat-text -->
	                </div>
                </div>
                
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <div class="input-group">
	              <input type="text" name="message" placeholder="Type Message ..." class="form-control" v-model="message">
	                  <span class="input-group-btn">
	                    <button class="btn btn-warning btn-flat" @click="sendMessage">Send</button>
	                  </span>
	            </div>
            </div>
            <!-- /.box-footer-->
          </div>
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		data(){

			return{

				convoList: [],
				message: ""

			}

		},
		mounted(){

			setInterval(()=>{
				this.getConvo();
			}, 3000)

		},
		methods:{

			getConvo(){

				axios.get(this.$uri+"/messages/getConvo?userid="+this.$route.params.userid+"&senderid="+this.$route.params.senderid)
				.then(response=>{

					this.convoList = response.data;
					setTimeout(()=>{
						$('#chat_container').scrollTop(1E10);
					}, 500)

				})
				.catch(()=>{
					console.log('error getConvo');
				})

			},
			sendMessage(){

				var data = {
					sender: this.$route.params.userid,
					receiver: this.$route.params.senderid,
					contentchat: this.message
				}

				axios.post(this.$uri+"/messages/sendMessage", data)
				.then(response=>{

					this.getConvo();
					this.message = "";


				})
				.catch(()=>{
					console.log('error getPeople');
				})

			}

		}

	}

</script>