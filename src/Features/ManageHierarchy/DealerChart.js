import React, { useEffect, useRef, useState } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import MasterPartner from 'Assets/Icons/user.svg';
// import { history } from 'Store';
import TenantPartner from 'Assets/Icons/TenantPartner.svg';


import { useHistory } from 'react-router-dom';
import { Box, Paper, Typography } from '@material-ui/core';
import { TecnotreedigitalSales } from '../../Http/axios';

import Drawer from '@material-ui/core/Drawer';
import { useLocation } from 'react-router-dom';
import NodeData from './NodeData';

import ContractDialog from './ContractDialog';
import Modal from 'Store/Modals';
import { useSelector } from 'react-redux';
import ExistPartnerContract from '../../Components/ExistPartnerContract/ExistPartnerContract';
import "./index.css"
// import {
//   Drawer,
//   Select,
//   Row,
//   Col,
//   Modal,
//   message,
//   Button,
//   Input,
//   Divider,
//   Card,
//   Table,
// } from "antd";

import { useDispatch } from 'react-redux';
import AlertActions from 'Store/Alert';
import DealerDialog from 'Components/Modals/DealerModal';

// const { Option } = Select;
const DealerChart = (props) => {
  let location = useLocation();
  // const { Column, ColumnGroup } = Table;
  const history = useHistory();
  const divRef = useRef(null);
  const [userHierarchy, setUserHierarchy] = useState();
  const [details, setDetails] = useState();
  // const [manage, setManage] = useState([]);
  // const [masterDetails, setMasterDetails] = useState();
  const [visible, setVisible] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formIdentitySubDealerShop, setFormIdentitySubDealerShop] = useState();
  const [openDealer, setOpenDealer] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState();
  const [updateData, setUpdateData] = useState();
  const [user, setUser] = useState('');
  const [dealerType, setDealerType] = useState("")
  const [nodeId, setNodeId] = useState("")
  const [agentID, setAgentID] = useState("")
  const [currentNode, setCurrentNode] = useState({})
  const dispatch = useDispatch();
  const [partnerExistDialog, setPartnerExistDialog] = useState(false);

  const [state, setState] = React.useState({
    
    left: false,
    
    right: false,
  });
  const masterdata = useSelector(
    (state) => state?.master?.masterData
  );
  
  console.log(masterdata.formStepIdentity?.subDealerEmployee.formIdentity, "master data")
  const getHierarchy = async (partnerId) => {
  
    console.log(props.partnerlist, "popceiling")
    let endpoint = `users/userHierarchy/${props.username}`
    TecnotreedigitalSales &&
      (await TecnotreedigitalSales.get(
       endpoint
      )
        .then((resp) => {
          let nodeData = [];
          resp.data.forEach((item) => {
            console.log(item, "node item")
            if (item?.name?.length > 15) {
              var count = 15;

              item.nametitle =
                item.name.slice(0, count) +
                (item.name.length > count ? '...' : '');
            } else {
              item.nametitle = item.name;
            }
            if (item.parentId) {
              item['pid'] = item.parentId;
            }

            if (item.partnerType === 'tenant') {
              item.img0 = "";
              item.img3 = '';
              item.tenantCount = '';
            } else {
              item.img0 = "";
              item.img3 = "";
            }
            
            // if (item.img1 === 'NotesIcon') {
            //   item.img1 = ProductIcon;
            // } else {
            // }
         
            if (item.partnerType === 'tenant') {
              item.img0 = TenantPartner;
              item.img3 = '';
              item.tenantCount = '';
            } else {
              item.img0 = MasterPartner;
              item.img3 = "";
            }
            if (item.productCount !== '') {
              item.img1 = "";
            }
            // // if (item.img1 === 'NotesIcon') {
            // //   item.img1 = ProductIcon;
            // // } else {
            // // }
            if (item.img2 === 'ColoredNotesIcon') {
              item.img2 = "";
            }
            item.img1 = TenantPartner
            item.contractCount = ""
            
            

            nodeData.push(item);
          });
          console.log(nodeData, "nodedata")
          setDetails(nodeData);
          setUserHierarchy(nodeData);
          props.setHierarchy(nodeData);
        })
        .catch((error) => {
          console.log(error, "dey play")
        }));
  };
  const getGlobalHierarchy = async (partnerId) => {
    let payload = {
      username: 'dprmAdminUser',
      roleId: 'RO1032'
    };
    await TecnotreedigitalSales.post(`/auth/secure/globalhierarchy`, payload)
      .then((resp) => {
        let nodeData = [];
        // resp.data.forEach((item) => {
        //   if (item.parentId) {
        //     item['pid'] = item.parentId;
        //   }

        //   nodeData.push(item);
        // });
        setDetails(resp.data);
        setUserHierarchy(resp.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (location.state.partnerId !== '') {      
      setUser(location.state.userName);
      getHierarchy(location.state.partnerId);
    } else if (location.state.adminUser !== '') {
      getGlobalHierarchy();
    } else {
      var retrievedObject = localStorage.getItem('USER');
      var userName = JSON.parse(retrievedObject).sub;
      setUser(userName);
      getHierarchy(userName);     
    }
    // getHierarchy();
  }, []);
  // useEffect(() => {

  //   // filterByMaster()
  // }, [selectedNodeData]);

  // const tt = (result) => {
  //   let values;
  //   result.forEach((val) => {
  //     values = {
  //       name: val.name,
  //       desp: val.desp,
  //     };

  //     return values;
  //   });
  // };
  // const filterByMasterPartner = () => {
  //   // return userHierarchy
  //   const filterByTags = ["masterPartner"];
  //   const result = details.filter((item) =>
  //     item.tags.some((tag) => filterByTags.has(tag))
  //   );

  //   return result;

  //   // const data = result.forEach((val) => {
  //   //   let filteredMaster = {
  //   //     name: val.name,
  //   //     desp: val.desp,
  //   //   };

  //   //   return filteredMaster;
  //   // });
  //   // return data;
  // };

  useEffect(() => {
    // chart custom template

    // Default Template
    OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ula);

    // Approved template
    OrgChart.templates.completed = Object.assign({}, OrgChart.templates.ula);

    //pending template
    OrgChart.templates.pending = Object.assign({}, OrgChart.templates.ula);

     //pending template
     OrgChart.templates.inprogress = Object.assign({}, OrgChart.templates.ula);

    
    OrgChart.templates.pending.node =
      '<rect x="0" y="0" rx="1" ry="10" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#00000029"></rect>' +
      '<line rx="1" ry="10" x1="0" y1="0" x2="250" y2="0" stroke-width="5" stroke="#FF0000"></line>';
    OrgChart.templates.completed.node =
      '<rect x="0" y="0" rx="1" ry="10" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#00000029"></rect>' +
      '<line rx="1" ry="10" x1="0" y1="0" x2="250" y2="0" stroke-width="5" stroke="#2ED573"></line>';
      OrgChart.templates.inprogress.node =
      '<rect x="0" y="0" rx="1" ry="10" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#00000029"></rect>' +
      '<line rx="1" ry="10" x1="0" y1="0" x2="250" y2="0" stroke-width="5" stroke="#FD9024"></line>';

      OrgChart.templates.pending.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(0, 1, 1, 0, 238, 21)" control-node-menu-id="{id}">' +
    '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">' +
    '</rect>' +
    '<circle cx="0" cy="0" r="2" fill="#AEAEAE">' +
    '</circle><circle cx="7" cy="0" r="2" fill="#AEAEAE">' +
    '</circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle>' +
    '</g>';

    OrgChart.templates.completed.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(0, 1, 1, 0, 238, 21)" control-node-menu-id="{id}">' +
    '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">' +
    '</rect>' +
    '<circle cx="0" cy="0" r="2" fill="#AEAEAE">' +
    '</circle><circle cx="7" cy="0" r="2" fill="#AEAEAE">' +
    '</circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle>' +
    '</g>';

    OrgChart.templates.inprogress.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(0, 1, 1, 0, 238, 21)" control-node-menu-id="{id}">' +
    '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">' +
    '</rect>' +
    '<circle cx="0" cy="0" r="2" fill="#AEAEAE">' +
    '</circle><circle cx="7" cy="0" r="2" fill="#AEAEAE">' +
    '</circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle>' +
    '</g>';
    
    OrgChart.templates.completed.link =
      '<path stroke-dasharray="6, 4" stroke-linejoin="round" stroke="grey" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';
      OrgChart.templates.pending.link =
      '<path stroke-dasharray="6, 4" stroke-linejoin="round" stroke="grey" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';
      OrgChart.templates.inprogress.link =
      '<path stroke-dasharray="6, 4" stroke-linejoin="round" stroke="grey" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';

    //  Box name or field Name

    OrgChart.templates.completed.field_0 =
      '<text data-width="220" class="field_0" data-text-overflow="ellipsis" style="font-size: 20px; font-weight: 600;" fill="#1C1EC8" x="125" y="30" text-anchor="middle">{val}</text>';
    ('<text class="field_0"  style="font-size: 20px;" font-weight: 600;" fill="#1C1EC8" x="115" y="30" text-anchor="middle">{val}</text>');

    OrgChart.templates.inprogress.field_0 =
    '<text data-width="220" class="field_0" data-text-overflow="ellipsis" style="font-size: 20px; font-weight: 600;" fill="#1C1EC8" x="125" y="30" text-anchor="middle">{val}</text>';
  ('<text class="field_0"  style="font-size: 20px;" font-weight: 600;" fill="#1C1EC8" x="115" y="30" text-anchor="middle">{val}</text>');
    
    OrgChart.templates.pending.field_0 =
      '<text data-width="220" class="field_0" data-text-overflow="ellipsis" style="font-size: 20px; font-weight: 600;" fill="#1C1EC8" x="125" y="30" text-anchor="middle">{val}</text>';
    ('<text class="field_0"  style="font-size: 20px;" font-weight: 600;" fill="#1C1EC8" x="115" y="30" text-anchor="middle">{val}</text>');
    OrgChart.templates.completed.partner_id =
      '<text class="field_1"  style="font-size: 14px;" fill="#57606F" x="120" y="50" text-anchor="middle">{val}</text>';
      OrgChart.templates.pending.partner_id =
      '<text class="field_1"  style="font-size: 14px;" fill="#57606F" x="120" y="50" text-anchor="middle">{val}</text>';
      OrgChart.templates.inprogress.partner_id =
      '<text class="field_1"  style="font-size: 14px;" fill="#57606F" x="120" y="50" text-anchor="middle">{val}</text>';
    OrgChart.templates.completed.field_2 =
      '<text class="field_2"  style="font-size: 16px;" fill="#57606F" x="75" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.pending.field_2 =
      '<text class="field_2"  style="font-size: 16px;" fill="#57606F" x="75" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.inprogress.field_2 =
      '<text class="field_2"  style="font-size: 16px;" fill="#57606F" x="75" y="85" text-anchor="middle">{val}</text>';


    OrgChart.templates.completed.field_3 =
      '<text class="field_3"  style="font-size: 16px;" fill="#57606F" x="125" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.pending.field_3 =
      '<text class="field_3"  style="font-size: 16px;" fill="#57606F" x="125" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.inprogress.field_3 =
      '<text class="field_3"  style="font-size: 16px;" fill="#57606F" x="125" y="85" text-anchor="middle">{val}</text>';
    OrgChart.templates.completed.field_4 =
      '<text class="field_4"  style="font-size: 13px;" fill="#57606F" x="185" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.pending.field_4 =
      '<text class="field_4"  style="font-size: 13px;" fill="#57606F" x="185" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.inprogress.field_4 =
      '<text class="field_4"  style="font-size: 13px;" fill="#57606F" x="185" y="85" text-anchor="middle">{val}</text>';
    OrgChart.templates.completed.field_5 =
      '<text class="field_5"  style="font-size: 16px;" fill="#57606F" x="225" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.pending.field_5 =
      '<text class="field_5"  style="font-size: 16px;" fill="#57606F" x="225" y="85" text-anchor="middle">{val}</text>';
      OrgChart.templates.inprogress.field_5 =
      '<text class="field_5"  style="font-size: 16px;" fill="#57606F" x="225" y="85" text-anchor="middle">{val}</text>';

    // Icons

    OrgChart.templates.completed.img_0 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image preserveAspectRatio="xMidYMid slice"  xlink:href="{val}" x="16" y="18" width="20" height="20" >' +
      '</image>';
      OrgChart.templates.pending.img_0 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image preserveAspectRatio="xMidYMid slice"  xlink:href="{val}" x="16" y="18" width="20" height="20" >' +
      '</image>';
      OrgChart.templates.inprogress.img_0 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image preserveAspectRatio="xMidYMid slice"  xlink:href="{val}" x="16" y="18" width="20" height="20" >' +
      '</image>';
    OrgChart.templates.completed.img_1 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="50" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.pending.img_1 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="50" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.inprogress.img_1 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="50" y="70" width="16" height="18" >' +
      '</image>';
    OrgChart.templates.completed.img_2 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="100" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.pending.img_2 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="100" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.inprogress.img_2 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="100" y="70" width="16" height="18" >' +
      '</image>';
    OrgChart.templates.completed.img_3 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="150" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.pending.img_3 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="150" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.inprogress.img_3 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="150" y="70" width="16" height="18" >' +
      '</image>';
    OrgChart.templates.completed.img_4 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="200" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.pending.img_4 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="200" y="70" width="16" height="18" >' +
      '</image>';
      OrgChart.templates.inprogress.img_4 =
      '<clipPath id="ulaImg">' +
      '<circle cx="50" cy="50" r="100"></circle>' +
      '</clipPath>' +
      '<image   xlink:href="{val}" x="200" y="70" width="16" height="18" >' +
      '</image>';
    OrgChart.SEARCH_PLACEHOLDER = 'Enter Partner ID,Partner Name,Tenent Name';
    // OrgChart.templates.pending = Object.assign({}, OrgChart.templates.ula);

    // OrgChart.templates.pending.node =
    //   '<rect x="0" y="0" rx="1" ry="10" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#00000029"></rect>' +
    //   '<line rx="1" ry="10" x1="0" y1="0" x2="250" y2="0" stroke-width="5" stroke="#FFA369"></line>';

    // OrgChart.templates.pending.nodeMenuButton =
    //   '<g style="cursor:pointer;" transform="matrix(0, 1, 1, 0, 238, 21)" control-node-menu-id="{id}">' +
    //   '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">' +
    //   '</rect>' +
    //   '<circle cx="0" cy="0" r="2" fill="#AEAEAE">' +
    //   '</circle><circle cx="7" cy="0" r="2" fill="#AEAEAE">' +
    //   '</circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle>' +
    //   '</g>';
    // // link line

    // OrgChart.templates.pending.link =
    //   '<path stroke-dasharray="6, 4" stroke-linejoin="round" stroke="grey" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';

    // //  Box name or field Name

    // OrgChart.templates.pending.title =
    //   '<text class="field_0"  style="font-size: 20px;" font-weight: 600;" fill="#1C1EC8" x="115" y="30" text-anchor="middle">{val}</text>';
    // OrgChart.templates.pending.partner_id =
    //   '<text class="field_1"  style="font-size: 16px;" fill="#57606F" x="120" y="50" text-anchor="middle">{val}</text>';
    // OrgChart.templates.pending.field_2 =
    //   '<text class="field_2"  style="font-size: 16px;" fill="#57606F" x="75" y="85" text-anchor="middle">{val}</text>';

    // OrgChart.templates.pending.field_3 =
    //   '<text class="field_3"  style="font-size: 16px;" fill="#57606F" x="125" y="85" text-anchor="middle">{val}</text>';
    // OrgChart.templates.pending.field_4 =
    //   '<text class="field_4"  style="font-size: 16px;" fill="#57606F" x="185" y="85" text-anchor="middle">{val}</text>';
    // OrgChart.templates.pending.field_5 =
    //   '<text class="field_5"  style="font-size: 16px;" fill="#57606F" x="225" y="85" text-anchor="middle">{val}</text>';

    // // Icons

    // OrgChart.templates.pending.img_0 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image preserveAspectRatio="xMidYMid slice"  xlink:href="{val}" x="16" y="18" width="22" height="20" >' +
    //   '</image>';
    // OrgChart.templates.pending.img_1 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="50" y="70" width="16" height="18" >' +
    //   '</image>';
    // OrgChart.templates.pending.img_2 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="100" y="70" width="16" height="18" >' +
    //   '</image>';
    // OrgChart.templates.pending.img_3 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="150" y="70" width="16" height="18" >' +
    //   '</image>';
    // OrgChart.templates.pending.img_4 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="200" y="70" width="16" height="18" >' +
    //   '</image>';

    // OrgChart.templates.myTemplate.node =
    //   '<rect x="0" y="0" rx="1" ry="10" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#00000029"></rect>' +
    //   '<line rx="1" ry="10" x1="0" y1="0" x2="250" y2="0" stroke-width="5" stroke="#FFA369"></line>';

    // OrgChart.templates.myTemplate.nodeMenuButton =
    //   '<g style="cursor:pointer;" transform="matrix(0, 1, 1, 0, 238, 21)" control-node-menu-id="{id}">' +
    //   '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">' +
    //   '</rect>' +
    //   '<circle cx="0" cy="0" r="2" fill="#AEAEAE">' +
    //   '</circle><circle cx="7" cy="0" r="2" fill="#AEAEAE">' +
    //   '</circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle>' +
    //   '</g>';
    // // link line

    // OrgChart.templates.myTemplate.link =
    //   '<path stroke-dasharray="6, 4" stroke-linejoin="round" stroke="grey" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';

    // //  Box name or field Name

    // OrgChart.templates.myTemplate.title =
    //   '<text class="field_0"  style="font-size: 20px;" font-weight: 600;" fill="#1C1EC8" x="115" y="30" text-anchor="middle">{val}</text>';
    // OrgChart.templates.myTemplate.partner_id =
    //   '<text class="field_1"  style="font-size: 16px;" fill="#57606F" x="120" y="50" text-anchor="middle">{val}</text>';
    // OrgChart.templates.myTemplate.field_2 =
    //   '<text class="field_2"  style="font-size: 16px;" fill="#57606F" x="75" y="85" text-anchor="middle">{val}</text>';

    // OrgChart.templates.myTemplate.field_3 =
    //   '<text class="field_3"  style="font-size: 16px;" fill="#57606F" x="125" y="85" text-anchor="middle">{val}</text>';
    // OrgChart.templates.myTemplate.field_4 =
    //   '<text class="field_4"  style="font-size: 16px;" fill="#57606F" x="185" y="85" text-anchor="middle">{val}</text>';
    // OrgChart.templates.myTemplate.field_5 =
    //   '<text class="field_5"  style="font-size: 16px;" fill="#57606F" x="225" y="85" text-anchor="middle">{val}</text>';

    // // Icons

    // OrgChart.templates.myTemplate.img_0 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image preserveAspectRatio="xMidYMid slice"  xlink:href="{val}" x="16" y="18" width="22" height="20" >' +
    //   '</image>';
    // OrgChart.templates.myTemplate.img_1 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="50" y="70" width="16" height="18" >' +
    //   '</image>';
    // OrgChart.templates.myTemplate.img_2 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="100" y="70" width="16" height="18" >' +
    //   '</image>';
    // OrgChart.templates.myTemplate.img_3 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="150" y="70" width="16" height="18" >' +
    //   '</image>';
    // OrgChart.templates.myTemplate.img_4 =
    //   '<clipPath id="ulaImg">' +
    //   '<circle cx="50" cy="50" r="100"></circle>' +
    //   '</clipPath>' +
    //   '<image   xlink:href="{val}" x="200" y="70" width="16" height="18" >' +
    //   '</image>';

    function filterByPid(selectedNode) {
      let filteredData = [];
      for (let i = 0; i < selectedNode.length; i++) {
        for (let j = 0; j < details.length; j++) {
          if (selectedNode[i].pid === details[j].id) {
            filteredData.push(...selectedNode, details[j]);
          }
        }
      }
      return filteredData;
    }
    const filterByMaster = (nodeData) => {
      let selectedNode = [nodeData];
      if (nodeData.pid !== '') {
        return filterByPid(selectedNode);
      } else {
        return nodeData;
      }
    };

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
    // Add Product function

    const navigatetoAddProduct = (nodeId) => {
      setOpenDealer(true)
        setFormIdentitySubDealerShop(masterdata.formStepIdentity?.subDealerShop.formIdentity);
      var nodeData = chart.get(nodeId);
      console.log(nodeData, "nodedaaaaa")
      setAgentID(nodeData.userName)
      setNodeId(nodeId)
      setDealerType("subDealerEmployee")
      const relatedNode = filterByMaster(nodeData);
      setSelectedNodeData(relatedNode);
      // setDrawer(true);
       
      // if (nodeData.isPartnerActive && !nodeData.isPartnerSuspended) {
      //   dispatch(
      //     Modal.open({
      //       id: 'FormsCreation',
      //       context: {
      //         formIdentity: masterdata.formStepIdentity?.subDealerEmployee.formIdentity,
      //         header: 'Add Sub Dealer Employee',
      //         nodeDetails: filterByMaster(nodeData),
      //         user: user,
      //         message: 'Sub-Dealer_Employee Added successfully',
      //         partnerlist: props.partnerlist,
      //         formType: masterdata.formStepIdentity?.subDealerEmployee.formIdentity,
      //         pid: nodeData.id
      //       }
      //     })
      //   );
      // } else if (nodeData.isPartnerSuspended) {
      //   dispatch(
      //     AlertActions.open({
      //       type: 'error',
      //       message:
      //         'Partner is Suspended, please wait until partner becomes active!'
      //     })
      //   );
      // } else {
      //   dispatch(
      //     AlertActions.open({
      //       type: 'error',
      //       message:
      //         'Partner Onboard is pending, Complete the onboard and proceed with product journey!'
      //     })
      //   );
      // }
    };

    // Add contract function
    const navigatetoAddContract = (nodeId) => {
      setFormIdentity('Add_Contract');
      var nodeData = chart.get(nodeId);

      const relatedNode = filterByMaster(nodeData);
      setSelectedNodeData(relatedNode);
      setDrawer(true);
      // setDialogOpen(true);
      if (!nodeData.isPartnerSuspended) {
        dispatch(
          Modal.open({
            id: 'ProductList',
            context: {
              formIdentity: 'Add_Contract',
              contractType: 'ProductContract',
              details: nodeData,
              message: 'Product contract created successfully, Approval pending'
            }
          })
        );
      } else if (nodeData.isPartnerSuspended) {
        dispatch(
          AlertActions.open({
            type: 'error',
            message:
              'Partner is Suspended, please wait until partner becomes active!'
          })
        );
        // localStorage.setItem('merchantId', nodeData.id);

        // dispatch(
        //   Modal.open({
        //     id: 'FormsCreation',
        //     context: {
        //       formIdentity: 'Add_Contract',
        //       header: 'Add Contract',
        //       nodeDetails: filterByMaster(nodeData),
        //       user: user
        //     }
        //   })
        // );
      }
    };

    // Add Tenant function

    const handleRightBar = (nodeId)=> {
      var nodeData = chart.get(nodeId);
      setCurrentNode(nodeData)
      setVisible(true)
    }
    const navigatetoAddTenant = (nodeId) => {
      setFormIdentitySubDealerShop(masterdata.formStepIdentity?.subDealerShop.formIdentity);
      var nodeData = chart.get(nodeId);
      console.log(nodeData, "nodedaaaaa")
      setAgentID(nodeData.userName)
      setOpenDealer(true)
      setNodeId(nodeId)
      setDealerType("subDealer")
      const relatedNode = filterByMaster(nodeData);
      setSelectedNodeData(relatedNode);
      // setDrawer(true);

      // if (nodeData.isPartnerActive && !nodeData.isPartnerSuspended) {
      //   dispatch(
      //     Modal.open({
      //       id: 'FormsCreation',
      //       context: {
      //         formIdentity: masterdata.formStepIdentity?.subDealerShop.formIdentity,
      //         header: 'Add Sub Dealer Shop',
      //         nodeDetails: filterByMaster(nodeData),
      //         user: user,
      //         message: 'Sub-Dealer_Shop Added successfully',
      //         partnerlist: props.partnerlist,
      //         formType: masterdata.formStepIdentity?.subDealerShop.formIdentity,
      //         pid: nodeData.id
      //       }
      //     })
      //   );
      // } else if (nodeData.isPartnerSuspended) {
      //   dispatch(
      //     AlertActions.open({
      //       type: 'error',
      //       message:
      //         'Partner is Suspended, please wait until partner becomes active!'
      //     })
      //   );
      // } else {
      //   dispatch(
      //     AlertActions.open({
      //       type: 'error',
      //       message:
      //         'Partner Onboard is pending, Complete the onboard and proceed with product journey!'
      //     })
      //   );
      // }
    };
    const navigatetoSignOffContract = (nodeId) => {
      var nodeData = chart.get(nodeId);
      if (!nodeData.isPartnerSuspended) {
        dispatch(
          Modal.open({
            id: 'contracts',
            context: {
              contractrow: {
                formIdentity: 'Tenant_Partner_Profile',
                // details: nodeData,
                details: nodeData,
                message: 'Contract-signoff Added successfully'
              }
            }
          })
        );
      } else if (nodeData.isPartnerSuspended) {
        dispatch(
          AlertActions.open({
            type: 'error',
            message:
              'Partner is Suspended, please wait until partner becomes active!'
          })
        );
        // history.push({
        //   pathname: '/digital-prm-web-ui/contracts',
        //   state: {
        //     // formIdentity: "Tenant_Partner_Profile",
        //     // details: nodeData,
        //     details: filterByMaster(nodeData)
        //   }
        // });
      }
    };

    const navigateMainForm = (nodeId)=> {
      
      var nodeData = chart.get(nodeId);

 
   [
        {
            name: "FIRST_NAME",
            value: nodeData.firstName,
            editable: false
        },
        {
            name: "LAST_NAME",
            value: nodeData.lastName,
            editable: false
        },
        {
            name: "MOBILE_NO",
            value: nodeData.mobile,
            "editable": false
        },
        {
            name: "EMAIL",
            value: nodeData.email,
            "editable": false
        },
        {
            name: "CATEGORY",
            value:  nodeData.agentCat,
            "editable": false
        },
         {
            name: "SUB_CATEGORY",
            value: nodeData?.agentSubCat,
            "editable": false
        }
    ]
    
      history.push({
        pathname: '/digital-prm-web-ui/forms',
        state: {
          // formIdentity: 'Partner_Profile',
          // fields: fields,
          // stepId: 'PartnerProfileCreation',
          // isFields: true

          formIdentity: nodeData.formIdentity,
          fields: 
          [
               {
                   name: "FIRST_NAME",
                   value: nodeData.firstName,
                   editable: false
               },
               {
                   name: "LAST_NAME",
                   value: nodeData.lastName,
                   editable: false
               },
               {
                   name: "MOBILE_NO",
                   value: nodeData.mobile,
                   "editable": false
               },
               {
                   name: "EMAIL",
                   value: nodeData.email,
                   "editable": false
               },
               {
                   name: "CATEGORY",
                   value:  nodeData.agentCat,
                   "editable": false
               },
                {
                   name: "SUB_CATEGORY",
                   value: nodeData?.agentSubCat,
                   "editable": false
               }
           ],
          stepId: nodeData.stepIdentity,
          isFields: true,
          agentUserId: nodeData.id,
          agentId: nodeData.userName,
        }
      });

      
      console.log(nodeId, "fmfmfmfmf", nodeData)
    }
    const navigatetoAddPartnerContract = (nodeId) => {
      setFormIdentity('Add_Contract');
      var nodeData = chart.get(nodeId);
      const isParnterContract = () => {
        if (nodeData.isPartnerContractAdded) {
          if (nodeData.isPartnerContractAdded === 'yes') {
            // open a info dialog here
            dispatch(
              AlertActions.open({
                type: 'error',
                message: 'Parnter Contract Already Exist!'
              })
            );
          } else {
            const relatedNode = filterByMaster(nodeData);
            setSelectedNodeData(relatedNode);

            dispatch(
              Modal.open({
                id: 'FormsCreation',
                context: {
                  formIdentity: 'Add_Contract',
                  header:
                    nodeData.tags[2] === 'masterPartner'
                      ? 'Add Contract For Partner'
                      : 'Add Contract For Tenent Partner',
                  nodeDetails: filterByMaster(nodeData),
                  user: user,
                  contractType: 'PartnerContract',
                  message:
                    'Partner contract created successfully, Approval pending'
                }
              })
            );
          }
        } else {
          const relatedNode = filterByMaster(nodeData);
          setSelectedNodeData(relatedNode);
          // setDrawer(true);

          dispatch(
            Modal.open({
              id: 'FormsCreation',
              context: {
                formIdentity: 'Add_Contract',
                header: 'Add Contract',
                nodeDetails: filterByMaster(nodeData),
                user: user,
                message: 'contract created successfully, Approval pending'
              }
            })
          );
        }
      };
      isParnterContract();

      // setDialogOpen(true);
      localStorage.setItem('merchantId', nodeData.id);
    };

    var Notes =
      '<svg width="24" display="none" height="24" viewBox="0 0 300 400"><g transform="matrix(1,0,0,1,40,40)"><path fill="#5DB1FF" d="M260.423,0H77.431c-5.522,0-10,4.477-10,10v317.854c0,5.522,4.478,10,10,10h182.992c5.522,0,10-4.478,10-10V10 C270.423,4.477,265.945,0,260.423,0z M178.927,302.594c0,5.522-4.478,10-10,10c-5.523,0-10-4.478-10-10v-3.364h20V302.594z M250.423,279.229H87.431V58.624h162.992V279.229z" /><path fill="#5DB1FF" d="M118.5,229.156c4.042,4.044,9.415,6.271,15.132,6.271c5.715,0,11.089-2.227,15.133-6.269l29.664-29.662 c4.09-4.093,6.162-9.442,6.24-14.816c5.601-0.078,10.857-2.283,14.829-6.253l29.66-29.662c4.042-4.043,6.269-9.417,6.269-15.133 c0-5.716-2.227-11.09-6.269-15.13l-9.806-9.806c-4.041-4.043-9.415-6.27-15.132-6.27c-5.716,0-11.09,2.227-15.132,6.269 l-29.663,29.662c-4.092,4.092-6.164,9.443-6.242,14.817c-5.601,0.078-10.857,2.283-14.828,6.252l-29.661,29.662 c-4.042,4.043-6.269,9.418-6.268,15.136c0,5.716,2.227,11.089,6.269,15.129L118.5,229.156z M168.618,147.548l29.662-29.661 c1.587-1.587,3.696-2.461,5.94-2.461c2.243,0,4.353,0.874,5.938,2.461l9.808,9.808c1.586,1.586,2.46,3.694,2.46,5.937 c0,2.244-0.874,4.354-2.462,5.941l-29.658,29.661c-1.588,1.587-3.697,2.46-5.941,2.46c-2.243,0-4.353-0.874-5.938-2.46 l-0.309-0.309l19.598-19.598c2.539-2.539,2.539-6.654,0-9.192c-2.537-2.538-6.654-2.538-9.191,0l-19.599,19.598l-0.308-0.308 C165.344,156.152,165.345,150.823,168.618,147.548z M117.888,198.28l29.66-29.661c1.587-1.586,3.695-2.46,5.939-2.46 c2.242,0,4.349,0.872,5.934,2.455c0.002,0.001,0.004,0.003,0.005,0.005l0.309,0.309l-19.598,19.598 c-2.539,2.538-2.539,6.653,0,9.191c1.269,1.27,2.933,1.904,4.596,1.904s3.327-0.635,4.596-1.904l19.599-19.598l0.309,0.309 c3.273,3.273,3.273,8.603,0,11.877l-29.662,29.66c-1.588,1.588-3.698,2.462-5.941,2.462c-2.243,0-4.352-0.874-5.938-2.462 l-9.807-9.806c-1.586-1.586-2.46-3.694-2.46-5.938C115.426,201.978,116.3,199.868,117.888,198.28z" /></g></svg>';
    var chart = new OrgChart(document.getElementById('tree'), {
      
      template: 'myTemplate',
      // siblingSeparation: 50,
      nodeMouseClick: OrgChart.action.edit,
      mouseScrool: OrgChart.action.none,
      enableSearch: true,
      nodeBinding: {
         title: 'name',
        field_0: 'nametitle',
        partner_id: 'desp',
        field_2: 'tenantCount',
        field_3: 'contractCount',
        field_4: 'partnerType',
        // field_5: 'num4',
        img_0: 'img0',
        img_1: 'img1',
        img_2: 'img2',
        img_3: 'img3'
        // partnerIcon: 'img3'
        // img_4: "img4",
      },

      // nodeBinding: {
      //   title: 'name',
      //   partner_id: 'desp',
      //   field_2: 'num1',
      //   field_3: 'num2',
      //   field_4: 'num3',
      //   field_5: 'num4',
      //   img_0: NotesIcon,
      //   // img_1: 'img1',
      //   // img_2: 'img2',
      //   // img_3: 'img3',
      //   // img_4: 'img4'
      // },

      nodeMenu: {
        
        // call_0: {
        //   icon: Notes,
        //   text: '<span style="font-size:15px;padding: 10px;">Add Sub Dealer Employee</span>',
        //   onClick: navigatetoAddProduct
        // },
        // call_1: {
        //   icon: Notes,
        //   text: '<span style="font-size:15px;padding: 10px;">Edit</span>',
        //   onClick: navigateMainForm
        // },
        // call_2: {
        //   icon: Notes,
        //   text: '<span style="font-size:15px;padding: 10px;">Details</span>',
        //   onClick: navigatetoAddProduct
        // },
      },
      tags: {
        completed: {
          template: 'completed'
        },
        masterPartner: {
          nodeMenu: {
            call_0: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Add Sub Dealer<span>',
              onClick: navigatetoAddTenant
            },
            call_2: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Details</span>',
              onClick: handleRightBar
            },

            // call_1: {
            //   icon: Notes,
            //   text: '<span style="font-size:15px;padding: 10px;">Edit</span>',
            //   onClick: navigateMainForm
            // },
            // call_2: {
            //   icon: Notes,
            //   text: '<span style="font-size:15px;padding: 10px;">Details</span>',
            //   onClick: navigatetoAddProduct
            // },
          
          }
        },
        pending: {
          template: 'pending',
          nodeMenu: {
            call_0: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Add Sub Dealer<span>',
              onClick: navigatetoAddTenant
            },
            call_1: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Edit</span>',
              onClick: navigateMainForm,

            },
            call_2: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Details</span>',
              onClick: handleRightBar
            },
           
          }
        },
      
        inprogress: {
          template: 'inprogress'
        },
     
        tenantPartner: {
          nodeMenu: {
            call_0: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Add Sub Dealer Employee</span>',
              onClick: navigatetoAddProduct
            },
         
          },
          call_1: {
            icon: Notes,
            text: '<span style="font-size:15px;padding: 10px;">Details</span>',
            onClick: handleRightBar
          },
       
        },

        showedit: {
         
          nodeMenu: {
            call_0: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Add Sub Dealer Employee</span>',
              onClick: navigatetoAddProduct
            },
            call_1: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Edit</span>',
              onClick: navigateMainForm,

            },
            call_2: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Details</span>',
              onClick: handleRightBar
            },
           
          }
        },
        subTenantPartner: {
          nodeMenu: {
            // call_0: {
            //   icon: Notes,
            //   text: '<span style="font-size:15px;padding: 10px;">Edit</span>',
            //   onClick: navigateMainForm
            // },
            call_1: {
              icon: Notes,
              text: '<span style="font-size:15px;padding: 10px;">Details</span>',
              onClick: handleRightBar
            },
          
          }
        },
        smartLocationMasterPartner: {
          nodeMenu: {
            call_0: {
              icon: Notes,
              text: '<span>Add Tenant<span>',
              onClick: navigatetoAddTenant
            },

            call_1: {
              icon: Notes,
              text: '<span>Add Partner Contract<span>',
              onClick: navigatetoAddPartnerContract
            },
            call_2: {
              icon: Notes,
              text: '<span>Contract Share & Signoff<span>',
              onClick: navigatetoSignOffContract
            }
          }
        }
      },

      nodes: props.hierarchy
      // node: [
      //   {
      //     id: 1,
      //     name: 'Master Partner',
      //     title: 'Tytle1',
      //     desp: 'Partner ID - 123456',
      //     tags: ['overrideMenu'],
      //     num1: '2',
      //     num2: '3',
      //     num3: 4,
      //     num4: 4,
      //     img0: BuildingIcon,
      //     img1: NotesIcon,
      //     img2: ColoredNotesIcon,
      //     img3: ColoredNotesIcon,
      //     img4: PartnerIcon
      //   }
      // ]
      // nodes: [
      //   {
      //     pid: 'USER65',
      //     title: 'Swathy',
      //     productCount: '0',
      //     masterIcon: '',
      //     num4: 4,
      //     num3: 4,
      //     email: 'swa@gmail.com',
      //     img4: 'PartnerIcon',
      //     img3: 'ColoredNotesIcon',
      //     contractCountIcon: '',
      //     mobile: '736792',
      //     name: 'Swathy',
      //     userId: 'USER21',
      //     tags: ['approved', '', 'tenantPartner'],
      //     desp: 'Partner ID - null',
      //     contractCount: '0',
      //     isPartnerContractAdded: '',
      //     img0: "NotesIcon",
      //     tenantIcon: '',
      //     // img2: 'NotesIcon',
      //     // productCountIcon: '',
      //     // img1: 'NotesIcon'
      //   }
      // ]
    });

    chart.on('click', function (sender, args) {
      // to open right side drawer
      // setVisible(true);
      
    });

    // for node menu customization
    // OrgChart.menuUI.prototype._show = function (
    //   x,
    //   y,
    //   firstNodeId,
    //   secondNodeId,
    //   menu
    // ) {
    //   var that = this;
    //   this.hide();
    //   var html = '';

    //   if (!menu) {
    //     menu = this.menu;
    //   }

    //   var args = {
    //     firstNodeId: firstNodeId,
    //     secondNodeId: secondNodeId,
    //     menu: menu
    //   };

    //   var result = OrgChart.events.publish('show', [this, args]);

    //   if (result === false) {
    //     return false;
    //   }

    //   menu = args.menu;

    //   for (var item in menu) {
    //     var icon = menu[item].icon;
    //     var text = menu[item].text;

    //     if (icon === undefined) {
    //       icon = OrgChart.icon[item](24, 24, '#7A7A7A');
    //     }

    //     if (typeof text == 'function') {
    //       text = text();
    //     }

    //     if (typeof icon == 'function') {
    //       icon = icon();
    //     }

    //     html +=
    //       '<div data-item="' +
    //       item +
    //       '" style="border-bottom: 1px solid #D7D7D7; padding: 7px 10px;color: #7A7A7A;">' +
    //       icon +
    //       '<span>&nbsp;&nbsp;' +
    //       text +
    //       '</span></div>';
    //   }

    //   if (html != '') {
    //     this.wrapper = document.createElement('div');
    //     Object.assign(this.wrapper.style, {
    //       opacity: 0,
    //       'background-color': '#FFFEFF',
    //       'box-shadow': '#DCDCDC 0px 1px 2px 0px',
    //       display: 'inline-block',
    //       border: '1px solid #D7D7D7;border-radius:5px',
    //       'z-index': 1000,
    //       position: 'absolute',
    //       'text-align': 'left',
    //       'user-select': 'none'
    //     });

    //     this.wrapper.className = 'chart-menu';

    //     this.wrapper.style.left = '-99999px';
    //     this.wrapper.style.top = '-99999px';

    //     this.wrapper.innerHTML = html;
    //     this.obj.element.appendChild(this.wrapper);

    //     if (y == undefined) {
    //       var position = OrgChart._menuPosition(
    //         x,
    //         this.wrapper,
    //         this.obj.getSvg()
    //       );
    //       x = position.x + 140;
    //       y = position.y;
    //     }

    //     var startLeft = x - 45;

    //     this.wrapper.style.left = startLeft + 'px';
    //     this.wrapper.style.top = y + 'px';

    //     this.wrapper.style.left = startLeft - this.wrapper.offsetWidth + 'px';
    //     var endLeft = x - this.wrapper.offsetWidth;

    //     OrgChart.anim(
    //       this.wrapper,
    //       { opacity: 0, left: startLeft - this.wrapper.offsetWidth },
    //       { opacity: 1, left: endLeft },
    //       300,
    //       OrgChart.anim.inOutPow
    //     );

    //     var items = this.wrapper.getElementsByTagName('div');

    //     for (var i = 0; i < items.length; i++) {
    //       var item = items[i];
    //       item.addEventListener('mouseover', function () {
    //         this.style.backgroundColor = '#F0F0F0';
    //       });
    //       item.addEventListener('mouseleave', function () {
    //         this.style.backgroundColor = '#FFFFFF';
    //       });
    //       item.addEventListener('click', function (e) {
    //         var item = this.getAttribute('data-item');
    //         var onClick = menu[item].onClick;
    //         var result;
    //         if (onClick === undefined) {
    //           if (item === 'add') {
    //             var data = { id: that.obj.generateId(), pid: firstNodeId };
    //             that.obj.addNode(data, null, true);
    //           } else if (item === 'edit') {
    //             var node = that.obj.getNode(firstNodeId);
    //             that.obj.editUI.show(node.id);
    //           } else if (item === 'details') {
    //             var node = that.obj.getNode(firstNodeId);
    //             that.obj.editUI.show(node.id, true);
    //           } else if (item === 'remove') {
    //             that.obj.removeNode(firstNodeId, null, true);
    //           } else if (item === 'svg') {
    //             that.obj.exportSVG({
    //               filename: 'OrgChart.svg',
    //               expandChildren: false,
    //               nodeId: firstNodeId
    //             });
    //           }
    //         } else {
    //           result = menu[item].onClick.call(
    //             that.obj,
    //             firstNodeId,
    //             secondNodeId
    //           );
    //         }
    //         if (result != false) {
    //           that.hide();
    //         }
    //       });
    //     }
    //   }
    // };
  }, [props.hierarchy]);
  const onClose = () => {
    setVisible(false);
    setDrawer(false);
    setDialogOpen(false);
    setPartnerExistDialog(false);
  };
  // filterByMasterPartner();

  return (
    <Paper elevation={0}>
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
    
        <Box style={{ padding: '0px 15px 0px 0px', display: 'flex' }}>
          <img
            src={TenantPartner}
            alt="Tenent logo"
            width="20px"
            height="20px"
            style={{ marginRight: '5px' }}
          />
          <Typography variant="h5">Sub Dealer</Typography>
        </Box>
      </Box>
      {/* <div id="legend">
        <div id="legend-content">
          <div>
            <Box style={{ padding: '0px 15px 0px 0px', display: 'flex' }}>
              <img
                src={MasterPartner}
                alt="partner logo"
                width="20px"
                height="20px"
                style={{ marginRight: '5px' }}
              />
              <Typography variant="h6">Partner Profile </Typography>
            </Box>
          </div>
          <div>
            <Box style={{ padding: '0px 15px 0px 0px', display: 'flex' }}>
              <img
                src={TenantPartner}
                alt="Tenent logo"
                width="20px"
                height="20px"
                style={{ marginRight: '5px' }}
              />
              <Typography variant="h6">Tenant</Typography>
            </Box>
          </div>
        </div>
      </div> */}
      <Box m={2} pt={3} style={{ position: 'relative' }}>
        <div id="tree" className="user-hierarchy" ref={divRef}></div>
      </Box>

      {/* Forms */}
      {/* <BottomSheetForms
        open={drawer}
        formIdentity={formIdentity}
        onClose={onClose}
        nodeDetails={selectedNodeData}
        setUserHierarchy={setUserHierarchy}
        user={user}
      /> */}
      {/* for contract list */}

      {/* <ContractDialog
       open={drawer}
       formIdentity={formIdentity}
       onClose={onClose}
       nodeDetails={selectedNodeData}
      /> */}
      <ContractDialog
        nodeDetails={selectedNodeData}
        open={dialogOpen}
        onClose={onClose}
        formIdentity={formIdentitySubDealerShop}
      />

      <ExistPartnerContract open={partnerExistDialog} onClose={onClose} />
 
      {/* <ContractBottomSheetForm
        open={partnterContractDialog}
        formIdentity={formIdentity}
        onClose={onClose}
        masterData={selectedNodeData}
      /> */}
      {/* right side drawer onclick of node */}
      <Drawer
        className="node-menu-container"
        anchor={'right'}
        open={visible}
        onClose={onClose}
        style={{overflowY: "none !important"}}
      >
        <NodeData onClose={onClose} currentNode={currentNode}/>
      </Drawer>
      <DealerDialog open={openDealer} setOpen={setOpenDealer} nodeId={nodeId} agentID={agentID} dealerType={dealerType} getHierarchy={getHierarchy}/>
    </Paper>
  );
};
export default DealerChart;
