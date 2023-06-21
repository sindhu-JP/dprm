import Service from './task/component';
import taskIcon from './task/icon';
import End from './event/component';
import eventIcon from './event/icon';
import Gateway from './diamond/component';
import DataBase from './dataBase/dataBaseComp';
import diamondIcon from './diamond/icon';
import FormTask from './Formtask/formTaskComp';
import FormTaskIcon from './Formtask/icon';
import DbIcon from './dataBase/dbIcon';
import Start from './Start/component';
import startIcon from './Start/icon';
import Hold from './Hold/component';
import HoldIcon from './Hold/HoldIcon'
import ManualService from './ManualSevice/ManualComp';
import ManualIcon from './ManualSevice/icon'

const config = {
  entityTypes: {
    Service : {
      width: 125,
      height: 75,
    },
    End: {
      width: 50,
      height: 50
    },
    Gateway: {
      width: 80,
      height: 80
    } ,
    Start : {
      width : 80 ,
      height : 80
    } ,
    Hold : {
      width : 80 ,
      height : 80
    } ,
    DataBase : {
      width : 50 ,
      height : 50
    } ,
    FormTask : {
      width : 70 ,
      height : 70
    } ,
    ManualService : {
      width : 80 ,
      height : 80
    }
  },
  gridSize: 25,
};

const customEntities = {
  Service : {
    component: Service,
    icon: taskIcon,
  },
  End: {
    component: End,
    icon: eventIcon,
  },
  Gateway: {
    component: Gateway,
    icon: diamondIcon
  } ,
  Start : {
    component: Start,
    icon: startIcon
  } ,
  Hold : {
    component : Hold ,
    icon : HoldIcon
  }
  , 
  DataBase : {
    component : DataBase ,
    icon : DbIcon
  },
  FormTask : {
    component : FormTask ,
    icon : FormTaskIcon
  }
  , 
  ManualService : {
    component : ManualService,
    icon : ManualIcon
  }
};

export { config, customEntities };
