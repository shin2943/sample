<template>

    <section class="editArea" >
        <img :src="image" width="700px" height="700px" alt="">
        <v-stage ref="contents" :width="width" :height="height" 
                 @dragstart="dragStart" @dragend="dragEnd" @dblclick="getContent">
            <v-layer ref="content">
                <v-text v-for="(content,i) in contents" :key="i"
                        :config="{
                            x: content.x,
                            y: content.y,
                            text: content.text,
                            id: content.id,
                            draggable: true,
                        }">
                    
                </v-text>
            </v-layer>
        </v-stage>
        <ul>
            <li v-for="(content,i) in contents" :key="i">
                    <button @click="deleteContent(content)">×</button>
                <span>
                    {{ i + 1 }}
                    {{ content.text }}
                    
                </span>
            </li>
            <button @click="modeCreate">+</button>
            <form action="" @submit.prevent="editContent" @keydown.ctrl.enter="editContent">
                <textarea v-model="text" @blur="editContent"></textarea>
                <button type="submit">適用</button>
            </form>
        </ul>
        
          
    </section>

</template>

<script>
export default {
    props:['image'],
    data(){
        return{
            mode: false,
            text: '',
            contents:[],
            content: {},
            width: window.innerWidth,
            height: window.innerHeight,
            stage: null,
            layer: null,
            context: null,
            drawtext: null,
            url: 'http://localhost:3000/contents'
        }
    },
    methods:{
        modeCreate(){
            this.mode = !this.mode;
            console.log(this.mode);
        },
        getContent(e){
            this.content = {
                   text: e.target.text(),
                   id: e.target.id(),
                   x: e.target.x(),
                   y: e.target.y()
            };
            this.text = e.target.text();
            console.log(this.content);
        },
        editContent(){
           if(this.mode == false){
               let content = this.contents.find((id) => id.id === this.content.id);
               content.text = this.text;
               const url = this.url+'/'+content.id
               this.$axios.patch(url,{content}).then(content => {
                   this.getContents();
               }).catch(err => {
                   console.log(err);
               })
           }else{
                 this.content = {
                text: this.text,
                x: this.width/2,
                y: this.height/2
               };
             this.$axios.post(this.url,this.content).then(content => {
                 this.getContents();
             }).catch(err => {
                 console.log(e);
             })
             this.modeCreate()
           }
        },
        deleteContent(content){
             const url = this.url+'/'+content.id
             this.$axios.delete(url).then(() => {
                 this.getContents();
             }).catch(err => {
                 console.log(err);
             })
        },
        dragStart(e){
            this.content = {
                   text: e.target.text(),
                   id: e.target.id(),
                   x: e.target.x(),
                   y: e.target.y()
            };
             console.log(this.content);
             
        },
        dragEnd(e){
            let content = this.content;
            const url = this.url+'/'+content.id
            content.x = e.target.x();
            content.y = e.target.y();

            this.$axios.patch(url,{content}).then(() => {
                this.getContents();
            }).catch(err => {
                console.log(err);
            })
        },
        getContents(){
        this.$axios.get(this.url).then(result => {
            this.contents=result.data;
        }).catch(err => {
            console.log(err);
        });
        }
　　　　　
    },
    mounted(){
       this.getContents();
    }
}
</script>

<style lang="scss" scoped>

</style>