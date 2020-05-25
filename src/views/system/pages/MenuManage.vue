<template>
  <div>
    <div class="addBtn">
      <el-dropdown>
        <el-button type="primary">
          添加<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 88px">
          <span @click="handleAdd(0)"><el-dropdown-item>菜单</el-dropdown-item></span>
          <span @click="handleAdd(1)"><el-dropdown-item>按钮</el-dropdown-item></span>
          <span @click="handleAdd(2)"><el-dropdown-item>API</el-dropdown-item></span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="permissionName"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="180">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type == 0 ? 'success' : (scope.row.type == 1 ? 'primary' : 'warning')"
              disable-transitions>{{scope.row.type == 0 ? '菜单' : (scope.row.type == 1 ? '按钮' : 'API')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="path"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="component"
          label="Vue组件">
        </el-table-column>
        <el-table-column
          prop="perms"
          label="权限">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加菜单-->
    <div>
      <el-drawer
        :visible.sync="addMenuDrawer"
        direction="ltr"
        :with-header="false">
        <div class="editUser-header"><span>添加按钮</span></div>
        <div class="editUser-body">
          <el-form :model="addMenuForm" status-icon  ref="addMenuForm" label-width="150px">
            <el-form-item label="菜单名称:" prop="pass">
              <el-input style="width: 320px" v-model="addMenuForm.permissionName"></el-input>
            </el-form-item>
            <el-form-item label="菜单URL:" prop="checkPass">
              <el-input style="width: 320px" v-model="addMenuForm.path" ></el-input>
            </el-form-item>
            <el-form-item label="组件地址:" prop="age">
              <el-input style="width: 320px" v-model="addMenuForm.component"></el-input>
            </el-form-item>
            <el-form-item label="相关权限:" prop="dept">
              <el-input style="width: 320px" v-model="addMenuForm.perms"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序:" prop="status">
              <el-input style="width: 320px" v-model="addMenuForm.orderNum"></el-input>
            </el-form-item>
            <el-form-item label="图标:" prop="icon">
              <el-input style="width: 320px" v-model="addMenuForm.icon"></el-input>
              <el-button type="primary" @click="showIcons">选择图标</el-button>
            </el-form-item>
            <el-form-item label="上级菜单:" prop="sex">
              <el-tree
                :data="menulist"
                :check-strictly="true"
                show-checkbox
                node-key="id"
                ref="vuetree"
                @check="getCheckedKeys"
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addMenuSubmit('addMenuForm')">提交</el-button>
              <el-button @click='addChanel'>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>

    <!--添加按钮-->
    <div>
      <el-drawer
        :visible.sync="addButtonDrawer"
        direction="ltr"
        :with-header="false">
        <div class="editUser-header"><span>添加按钮</span></div>
        <div class="editUser-body">
          <el-form :model="addButtonForm" status-icon  ref="addButtonForm" label-width="150px">
            <el-form-item label="按钮名称:" prop="pass">
              <el-input style="width: 320px" v-model="addButtonForm.permissionName"></el-input>
            </el-form-item>
            <el-form-item label="相关权限:" prop="dept">
              <el-input style="width: 320px" v-model="addButtonForm.perms"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单:" prop="sex">
              <el-tree
                :data="menulist"
                :check-strictly="true"
                show-checkbox
                node-key="id"
                ref="vuetree"
                @check="getCheckedKeys"
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addButtonSubmit('addButtonForm')">提交</el-button>
              <el-button @click='addChanel'>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>

    <!--添加菜单-->
    <div>
      <el-drawer
        :visible.sync="addApiDrawer"
        direction="ltr"
        :with-header="false">
        <div class="editUser-header"><span>添加API</span></div>
        <div class="editUser-body">
          <el-form :model="addApiForm" status-icon  ref="addApiForm" label-width="150px">
            <el-form-item label="菜单名称:" prop="pass">
              <el-input style="width: 320px" v-model="addApiForm.permissionName"></el-input>
            </el-form-item>
            <el-form-item label="菜单URL:" prop="checkPass">
              <el-input style="width: 320px" v-model="addApiForm.path" ></el-input>
            </el-form-item>
            <el-form-item label="相关权限:" prop="dept">
              <el-input style="width: 320px" v-model="addMenuForm.perms"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序:" prop="status">
              <el-input style="width: 320px" v-model="addMenuForm.orderNum"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单:" prop="sex">
              <el-tree
                :data="menulist"
                :check-strictly="true"
                show-checkbox
                node-key="id"
                ref="vuetree"
                @check="getCheckedKeys"
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addApiSubmit('addApiForm')">提交</el-button>
              <el-button @click='addChanel'>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>

    <!--添加图标按钮-->
    <Icons :visible="showIconPage" @init="closeIconPage"></Icons>

  </div>
</template>

<script>
  import * as sysmenuApi from '@/api/system/sysmenu';
  import Icons from '../icons'
  export default {
    name: 'MenuManage',
    components: { Icons},
    data() {
      return {
        showIconPage:false, //图标页面展示和隐藏
        visible: false,
        pig:true,
        tableData: [],      //表格数据
        addRowData: {},     //添加行的父节点
        addForm: {},        //添加对象
        formLabelWidth: '120px',
        addMenuForm: {},    //添加菜单表单
        addButtonForm: {},  //添加按钮表单
        addApiForm: {},    //添加APi表单
        addMenuDrawer: false,//添加菜单抽屉
        addButtonDrawer: false,//添加按钮抽屉
        addApiDrawer: false,//添加API抽屉
        defaultProps: {
          children: 'children',
          label: 'permissionName'
        },
        checkedKeys: [],   //选中的key集合
      };
    },
    methods: {
      //选择图标
      showIcons(){
        this.showIconPage = true;
      },

      //关闭图标页面
      closeIconPage(){
        this.showIconPage = false;
      },

      //添加菜单提交事件
      addMenuSubmit(formName) {
        if(this.checkedKeys.length > 1){
          this.$message.error('只能选择一个父菜单')
          return
        }
        this.$refs[formName].validate((valid) => {
          this.addMenuForm.parentId = this.checkedKeys[0];
          this.add(this.addMenuForm);
        });
      },

      //添加按钮提交事件
      addButtonSubmit(formName) {
        if(this.checkedKeys.length == 0){
          this.$message.error('请选择父级菜单')
          return
        }
        if(this.checkedKeys.length > 1){
          this.$message.error('只能选择一个父菜单')
          return
        }
        this.$refs[formName].validate((valid) => {
          this.addButtonForm.parentId = this.checkedKeys[0];
          this.add(this.addButtonForm);
        });
      },

      //API提交事件
      addApiSubmit(formName) {
        if(this.checkedKeys.length == 0){
          this.$message.error('请选择父级菜单')
          return
        }
        if(this.checkedKeys.length > 1){
          this.$message.error('只能选择一个父菜单')
          return
        }
        this.$refs[formName].validate((valid) => {
          this.addApiForm.parentId = this.checkedKeys[0];
          this.add(this.addApiForm);
        });
      },

      //添加事件
      add(params){
        sysmenuApi
          .add(params)
          .then(res => {
            this.list();
            //清空数据
            this.clearData();
          })
      },

      //取消事件
      addChanel(){
       this.clearData();
      },

      //菜单选择事件
      getCheckedKeys(node,checkedNodes){
        this.checkedKeys = checkedNodes.checkedKeys;
      },

      //列表
      list(){
        sysmenuApi
          .list()
          .then(res => {
            this.tableData = res.data;
          })
      },

      //清除表单
      clearData(){
        this.addMenuDrawer = false;
        this.addButtonDrawer = false;
        this.addApiDrawer = false;
        this.addMenuForm = {};
        this.addButtonForm = {};
        this.addApiForm = {};
        this.$refs.vuetree.setCheckedKeys([]);
      },

      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //菜单列表
      menulist(type){
        sysmenuApi
          .list({type})
          .then(res => {
            if(!!res.data){
              this.menulist = res.data;
            }
            console.log('menuList',this.menulist)
          })
      },

      //展示需添加的菜单类型
      showChooseAddType(){
        this.visible = true;
      },

      //添加按钮
      handleAdd(type){
        switch (type) {
          case 0:
            this.addMenuForm.type = type;
            this.addMenuDrawer = true;
            break;
          case 1:
            this.addButtonForm.type = type;
            this.addButtonDrawer = true;
            break;
          case 2:
            this.addApiForm.type = type;
            this.addApiDrawer = true;
            break;
        }
      },

      //删除操作
      handleDel(index,row){
        sysmenuApi
          .del({id:row.id})
          .then(res => {
              if(res.flag){
                this.$message.success('操作成功');
                this.list();
              }else{
                this.$message.error(res.message);
              }
          })
      },

      show(){
        this.pig = !this.pig;
        this.visible = true;
      }
    },
    mounted() {
      //查询列表
      this.list();
      //查询菜单列表
      this.menulist(0)
    }
  }
</script>

<style scoped>
  .table {
    margin-top: 10px;
  }

  .pagination {
    margin-top: 10px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-col:first-child {
    margin:10px;
  }

  .editUser-header {
    height: 55px;
    text-align: center;
    font: normal 20px/55px '黑体';
    border-bottom: 1px solid lightgray;
  }
  .editUser-body {
    margin-top: 20px;
  }
  .table {
    margin-top: 10px;
  }

  .addBtn {
    margin-top: 10px;
  }
</style>
