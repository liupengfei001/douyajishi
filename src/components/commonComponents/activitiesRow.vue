<template>
  <div id="activitiesRow">
      <mu-card style="margin-bottom:0.75rem;">
      <router-link :to="{ name: 'activitiesDeta', params: { activitiesId: Data.id}}">
        <mu-card-media>
          <mu-grid-list>
            <mu-grid-tile :rows="1.4" :cols="2">
              <!-- <img :src="tile.image"/> -->
              <img :src="Data.activity_img" />
              <span slot="title">{{Data.activity_name}}</span>
              <span slot="subTitle"><b>{{Data.merchant_name}}</b></span>
              <!-- <mu-icon-button icon="star_border" slot="action" /> -->
            </mu-grid-tile>
          </mu-grid-list>

        </mu-card-media>
        <mu-card-text>
          <div class="active-detail-box">
            <h4 class="ak-txtDOver">{{Data.activity_name}}</h4>
            <p class="ak-flexB">
              <span><i class="iconfont icon-huodong"></i>{{Data.merchant_name}}</span>
              <mu-chip class="active-chip-price" backgroundColor="rgba(244, 67, 54,0.7)">
                ￥{{Data.price}}
              </mu-chip>
            </p>
            <div class="ak-flexB" style="margin-top:0.5rem;">
              <div class="ak-flex" style="flex:1">
                <div class="active-chip ak-flexC">
                  {{Data.start_time}}-{{Data.end_time}}
                </div>
                <div class="active-chip ak-flexC">
                  <i class="iconfont icon-shoucang1"></i>{{Data.collect_number}}人收藏
                </div>
                <div class="active-chip ak-flexC">
                  <i class="iconfont icon-liulan"></i>{{Data.allpage_view}}人浏览
                </div>
              </div>

            </div>
          </div>
        </mu-card-text>

      </router-link>
      </mu-card>

  </div>
</template>
<script>
export default {
  name: "activitiesRow",
  props: ['Data'],
  data: function data() {
    return {
    }
  }
}
</script>
<style>
</style>
