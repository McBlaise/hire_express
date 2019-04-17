<template>
	<div>
		<h3 class="text-center">Job Offers</h3>
		<div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab" @click="getOffers()">Awaiting Response</a></li>
              <li><a href="#tab_2" data-toggle="tab" @click="getOngoing()">Pending</a></li>
              <li><a href="#tab_3" data-toggle="tab" @click="getOngoing()">Ongoing</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                <div class="row" v-for="(item, index) in offerList">
					<div class="col-sm-12">
						<div class="box box-widget widget-user">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				            	<div class="btn-group pull-right">
				                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
				                    <span class="caret"></span>
				                    <span class="sr-only">Toggle Dropdown</span>
				                  </button>
				                  <ul class="dropdown-menu" role="menu">
				                    <li @click="respondToOffer(item.offerid, 'accept')"><a href="javascript:void(0)">Accept</a></li>
				                    <li @click="respondToOffer(item.offerid, 'decline')"><a href="javascript:void(0)">Decline</a></li>
				                  </ul>
				                </div>
				              <h3 class="widget-user-username">{{item.position}}</h3>
				              <h5 class="widget-user-desc"><router-link :to="'/viewCompany/'+item.userid" style="color: white">{{item.company.companyname}}</router-link></h5>
				            </div>
				            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				            	<div class="btn-group pull-right">
				                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
				                    <span class="caret"></span>
				                    <span class="sr-only">Toggle Dropdown</span>
				                  </button>
				                  <ul class="dropdown-menu" role="menu">
				                    <li @click="respondToOffer(item.offerid, 'accept')"><a href="javascript:void(0)">Accept</a></li>
				                    <li @click="respondToOffer(item.offerid, 'decline')"><a href="javascript:void(0)">Decline</a></li>
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
				<div v-if="offerList.length == 0">
					<h3 class="text-center">{{loading}}</h3>
				</div>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_2">
                <div class="row" v-for="(item, index) in acceptedList" v-if="item.status == 'Open'">
					<div class="col-sm-12">
						<div class="box box-widget widget-user">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				              <h3 class="widget-user-username">{{item.position}}</h3>
				              <h5 class="widget-user-desc"><router-link :to="'/viewCompany/'+item.userid" style="color: white">{{item.company.companyname}}</router-link></h5>
				            </div>
				            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
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
				<div v-if="pendingList == 0">
					<h3 class="text-center">{{pendingLoading}}</h3>
				</div>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_3">
                <div class="row" v-for="(item, index) in acceptedList" v-if="item.status == 'Close'">
					<div class="col-sm-12">
						<div class="box box-widget widget-user">
				            <!-- Add the bg color to the header using any of the bg-* classes -->
				            <div v-if="item.profileimg != ''" class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+item.profileimg+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
				              <h3 class="widget-user-username">{{item.position}}</h3>
				              <h5 class="widget-user-desc"><router-link :to="'/viewCompany/'+item.userid" style="color: white">{{item.company.companyname}}</router-link></h5>
				            </div>
				            <div v-else class="widget-user-header bg-black" :style="'background: url(\''+$uriImage+'defaultjob.png'+'\') center center; box-shadow: 0px 0px 15pc inset #000'">
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
				<div v-if="ongoingList == 0">
					<h3 class="text-center">{{ongoingLoading}}</h3>
				</div>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
        </div>
		
		
	</div>
</template>
<script>
	
	import axios from 'axios';

	export default{

		mounted(){
			this.getOffers();
		},
		data(){
			return{
				offerList: [],
				acceptedList: [],
				loading: "Loading...",
				pendingLoading: "Loading...",
				pendingList: 0,
				ongoingList: 0,
				ongoingLoading: "Loading...",
			}
		},
		methods:{

			getOffers(){
				this.loading = "Loading...";
				axios.get(this.$uri+"/job/getOffers?seeker_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.offerList = response.data;
					if(this.offerList.length == 0){
						this.loading = "No data to show.";
					}
				})
				.catch(()=>{
					console.log('get offers error');
				})

			},
			getOngoing(){
				this.pendingLoading = "Loading...";
				this.ongoingLoading = "Loading...";
				this.pendingList = 0;
				this.ongoingList = 0;
				axios.get(this.$uri+"/job/getOngoing?seeker_id="+window.sessionStorage.getItem('userid'))
				.then(response=>{

					this.acceptedList = response.data;

					for(var i = 0; i < this.acceptedList.length; i++){

						if(this.acceptedList[i].status == "Close"){
							this.ongoingList++;
						}
						if(this.acceptedList[i].status == "Open"){
							this.pendingList++;
						}

					}

					if(this.pendingList == 0){
						this.pendingLoading = "No data to show.";
					}
					if(this.ongoingList == 0){
						this.ongoingLoading = "No data to show.";
					}
				})
				.catch(()=>{
					console.log('get offers error');
				})

			},
			respondToOffer(id, response){

				axios.post(this.$uri+"/job/respondToOffer", {id, response})
				.then(response=>{
					this.getOffers();
				})
				.catch(()=>{
					console.log('error respondToOffer');
				})

			}

		}

	}

</script>