import React from 'react'
import './intractionhistory.css'
import { Row, Image } from 'antd'
import interactionHistory from '../../Assets/Icons/intractionhistory.svg'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';


// import { Step, StepContent, StepLabel, Stepper } from '@material-ui/core'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

 import Transferblock from './transfer_block/transferblock'
import InfiniteScroll from 'react-infinite-scroll-component'

// import ScrollToBottom  from 'react-scroll-to-bottom'
// import { makeStyles} from '@material-ui/core'
// const classes = styles();


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }));

  



  function getSteps() {
    return ['', '', ];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }
  

const Intractionhistory = ({bulkList}) => {

    console.log(bulkList, "candaana")

      const getSteps = ()=> {
        let d = [""]
        
        if(bulkList?.length > 0 ) {
            bulkList?.forEach((el) => {
              d.push("")
                })

                return d
        }
        else {
         
            return []
        }
   
      }

      console.log(getSteps(), "definittt", bulkList)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };
    const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(null);
   const steps = getSteps()
    let array = [1, 2, 3, 4, 5, 6]
    return (
        <div className='box'>
            <div className='intraction_nav'>
                <Row>
                    <Image src={interactionHistory} alt="clock icon" />
                    <p className='title'>Interaction History</p>
                </Row>
            </div>

            {/* <Avatar shape="square" size="large" /> */}
           
            <InfiniteScroll
                dataLength={array.length}
                hasMore={true}
            >
               
                {/* <Stepper activeStep={0} orientation="vertical">
                    {array.map((i, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={AccountCircleIcon}></StepLabel>
                            <StepContent>
                                <Transferblock />
                            </StepContent>
                        </Step>
                    ))}
                </Stepper> */}
              
                <div className={classes.root}>
                    
      <Stepper  orientation="vertical">
        {bulkList?.length > 0 && bulkList?.map((el, index) => (
          <Step key={""}>
            <StepLabel >{""}</StepLabel>
            <StepContent active = {true} >
            <p className='date'>{el.date}</p>

            <Transferblock label={el.data}/> 
          
            </StepContent>
            
          </Step>
          
        ))}
        
      </Stepper>
     
    </div>
            </InfiniteScroll>
            <br />
        </div>
    )


}
// const styles = makeStyles((theme) => ({
//     test:{color:'#fff'}

// }))

export default Intractionhistory