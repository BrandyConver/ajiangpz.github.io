# 校园二手网站
本项目是学校开放基金项目，主要解决同学们毕业时闲置物品过多，而入学同学又需要购置大量物品的问题，而搭建的一个二手的线下交易网站平台。整个项目包括了前端，后端和数据库的使用，是一个全栈的项目。</br>
# 技术栈
## 前端：vue全家桶（包括vuex vue-router vue-cli）elementUI(样式)
## 服务端：node.js express框架
## 数据库：mongoDB
# 模块
## 导航组件
   使用elementUI的navMenu组件并且结合vue的router实现导航(部分代码)
   
   ```html
     <template>
      <div class="tabs">
      <el-menu
      :default-active="activename"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router>
      <el-menu-item index="1"  disabled style="opacity:1 !important;padding:0px  100px 0px 20px !important;">
          <img src="../../assets/logo2.png" alt="logo" width="200px" height="60px">
      </el-menu-item>
      <el-menu-item index="../tabs">
        二手选购
      </el-menu-item>
      <el-menu-item index="../sail"> 
        二手出售
      </el-menu-item>
        <el-menu-item index="../help"> 
        帮助中心
      </el-menu-item> 
      <div class="loginout">
         <span  v-if="this.$store.state.token"> 
       欢迎你，{{$store.state.username}}
       </span>
      <router-link to="../login" v-if="!this.$store.state.token"> 
        登录/注册
      </router-link>   
      <router-link to="../login" v-if="this.$store.state.token"
      @click.native="logOut"> 
        注销
      </router-link>
      </div>
      </el-menu>
      <div style="height:500px;width:100%"><router-view class="tabs_view"></router-view></div>
      </div>
      </template>
   ```
   
## 商品选购组件
   使用elementUI的tabs组件，利用`axios`调用使用node编写后台接口获取数据库的商品信息，使用vue数据绑定来渲染页面
   
   ```javascript
    this.$axios.get("/goods",{
        params:param
      }).then((response)=>{
        let res=response.data;
        if(res.status=="0"){
          console.log(res.result.total)
          switch(type){
            case 'book':this.datas.books=res.result.list;this.total.bookstotal=res.result.total;break;
            case 'digital':this.datas.digitals=res.result.list;this.total.digitalstotal=res.result.total;break;
            case 'computer':this.datas.computers=res.result.list;this.total.computerstotal=res.result.total;break;
          }
        }else{
          this.datas.books=[];
          this.datas.computers=[];
          this.datas.digitals=[];
        }
      })
    }
   ```
   
## 商品出售组件
   使用elementUI的form组件，利用axios将数据post到node后台接口，并且利用fs将上传的图片写入磁盘，同时返回图片url，与商品信息一同存入数据库
   
   ```javascript
      onSubmit(formName){
      this.$refs[formName].validate((valid) => {
       if (valid) {
         console.log(formName)
         if(this.form.src==''){
           alert('请上传图片')
         }else{
            this.$axios.post("/goods",{
       params:{
         name:this.form.name,
         type:this.form.type,
         place:this.form.place,
         price:this.form.price,
         discript:this.form.discript,
         connact:this.form.connact,
         src:this.form.src
       }
      }).then((response)=>{
       let res=response.data;
       if(res.status=="0"){
           if(res.result==false){
               alert("数据提交失败")
           }else{
         this.$refs['form'].resetFields();
         this.fileList=[];
         alert('数据提交成功!');
       }
       }
      })
      }
   ```
   
## 登录注册组件
   使用elementUI的input组件，用户注册时利用axios将用户数据传到后台，node查看数据库中的users是否有此用户，同时返回对应的res。登录时，node将user数据存入session中，在用户用户刷新页面时判断session时候过期，实现登录状态的保持。使用vue-router的路由拦截钩子实现登录拦截。 
   
   ```javascript
      onRegister(){
           this.$axios.post("/users",{
             params:{user:this.regiuser,pass:this.regipass,type:"register"}
           }).then((response)=>{
             let res=response.data;
             if(res.status=="0"){
                 if(res.result==false){
                     alert("用户已存在")
                 }else{
               this.$store.dispatch('UserLogin', true);
               this.$store.dispatch('UserName',this.regiuser)
               this.$router.push('../tabs')
             }
             }
           })
       }
        onSubmit(){
        this.$axios.post("/users",{
          params:{user:this.user,pass:this.pass,type:"login"}
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
              if(res.result==false){
                  alert("用户名或密码错误")
              }else{
            this.$store.dispatch('UserLogin', true);
            this.$store.dispatch('UserName',this.user)
            // store.commit('UserLogin',true)
            this.$router.push(this.$route.query.redirect)
          }
          }
        })
        }
   ```  
   
## 后台接口模块
   本项目主要有两个后台接口，一个为goods，即商品接口，另一个为users，即用户接口，这两个接口实现了前台与数据库的对接。
