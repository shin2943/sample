<template>
<section class="content">
          <Edit :image="image" v-if="image!== null"/>
  <div class="drop_area" 
               v-if="image === null "
               @dragenter="dragEnter"
               @dragleave="dragLeave"
               @dragover.prevent
               @drop.prevent="dropFile"
               :class="{enter: isEnter}"
               >
    ファイルをアップロード
      <input
                        class="fileInput"
                        v-if="image === null "
                        type="file"
                        @change="editAvatar"
                    />
  </div>

</section>

</template>
 
<script>
import Edit from './components/edit.vue'
export default {
  components: {
        Edit,
    },
  data () {
    return {
     image: null,
     isEnter: false
    }
  },
  methods: {
    dragEnter(){
         console.log('Enter Drop Area');
         this.isEnter = true
    },
    dragLeave(){
         console.log('Leave Drop Area');
    },
    dropFile(e){

         console.log(e.dataTransfer.files);
         this.image = e.dataTransfer.files[0];
         this.getBase64(this.image).then(img => {
           this.image = img;
           this.isEnter = false;
         })

    },
    editAvatar(e){
        console.log(e);
        this.image = e.target.files[0];
         this.getBase64(this.image).then(img => {
           this.image = img;
         })
    },
     getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
            });
        },
  }
}
</script>

<style lang="scss" scoped>
.content{
  
   .drop_area{
        color: gray;
        font-weight: bold;
        font-size: 1.2em;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 300px;
        border: 5px solid gray;
        border-radius: 15px;
    }

    .enter{
        border: 10px dotted powderblue;
    }

}
   
</style>



