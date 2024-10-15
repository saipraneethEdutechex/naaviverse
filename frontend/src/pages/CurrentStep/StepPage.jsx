import React, { useEffect, useState } from "react";
import "./currentstep.scss";
import { useCoinContextData } from "../../context/CoinContext";
import { useStore } from "../../components/store/store.ts";
import axios from "axios";
import Step4 from "../dashboard/MallProduct/Step4.jsx";
import CoinComponent from "../dashboard/MallProduct/CoinComponent.jsx";
import logout from "../../static/images/dashboard/logout.svg";
import profilea from "../../static/images/dashboard/profilea.svg";
import sidearrow from "../../static/images/dashboard/sidearrow.svg";
//images
import dummy from "../JourneyPage/dummy.svg";
import edutech from "./edutech.svg";
import resory from "./resory.svg";
import lek from "./lek.svg";
import logo from "../../static/images/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Dashsidebar from "../../components/dashsidebar/dashsidebar.jsx";
import searchIcon from "../../static/images/icons/search.svg";
import profile from '../../static/images/dashboard/profile.svg';
import downarrow from '../../static/images/dashboard/downarrow.svg';
import AccDashsidebar from "../../components/accDashsidebar/accDashsidebar.jsx";
import AdminAccDashsidebar from "../../components/AdminAccDashsidebar/index.jsx";
import MenuNav from "../../components/MenuNav/index.jsx";

const StepPage = ({ productDataArray, selectedPathId, showSelectedPath, selectedPath }) => {

    const navigate = useNavigate()
    const loc = useLocation()
  console.log(productDataArray, "lkwehflkwheflwef")
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const {
    currentStepData,
    setCurrentStepData,
    currentStepDataLength,
    setCurrentStepDataLength,
    currentStepdataPathId,
    setCurrentStepDataPathId,stepServices, setStepServices
  } = useCoinContextData();
  const {
    sideNav,
    setsideNav,
    buy,
    setBuy,
    mallCoindata,
    setfilteredcoins,
    index,
    setIndex,
  } = useStore();
  const [showNewDiv, setShowNewDiv] = useState(null);
  const [position1, setPosition1] = useState();
  const [position2, setPosition2] = useState();
  const [position3, setPosition3] = useState();
  const [currentStepPageData, setCurrentStepPageData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("default");
  const [popupDetails, setPopupDetails] = useState("");
  const [currentStepPagePathId, setCurrentStepPagePathId] = useState("");
  const [selectedCard, setSelectedCard] = useState(1);


  useEffect(() => {
    console.log(loc?.pathname?.split("/").pop(), "lwefjkwebfjerwf")
    const stepId = loc?.pathname?.split("/").pop();
    if(stepId){
      axios.get(`https://careers.marketsverse.com/steps/get?step_id=${stepId}`).then(({data}) => {
        if(data.status){
          console.log(data, "lkwehfkjewhfkejrf")
          setCurrentStepData(data?.data[0])
        }
      })
    }
  }, [])


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
 

  // useEffect(() => {

  //   axios.get(`https://careers.marketsverse.com/attachservice/get?step_id=${currentStepPageData?._id}`).then(({data}) => {
  //       if(data.status){
  //         setCurrentStepData(data?.data[0])
  //         console.log(data, "lwehkjlwehfkwe")
  //       }
  //   })

  //   // console.log(currentStepData?._id, "=>", currentStepPageData?._id, "kjwefkjwefkwjef")
  // }, [currentStepPageData])

  const handleRejectClick = () => {
    if (position1 === 1) {
      setPosition1(3);
    } else if (position1 === 2) {
      setPosition1(1);
    } else {
      setPosition1(2);
    }

    if (position2 === 2) {
      setPosition2(1);
    } else if (position2 === 3) {
      setPosition2(2);
    } else {
      setPosition2(3);
    }

    if (position3 === 3) {
      setPosition3(2);
    } else if (position3 === 2) {
      setPosition3(1);
    } else {
      setPosition3(3);
    }
  };

  const [cards, setCards] = useState(productDataArray);
  const [centerIndex, setCenterIndex] = useState(0);
  const [acceptOffer, setAcceptOffer] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showGradeDesc, setShowGradeDesc] = useState(false);
  const [showStreamDesc, setShowStreamDesc] = useState(false);
  const [showCurriculumDesc, setShowCurriculumDesc] = useState(false);
  const [showGradePointDesc, setShowGradePointDesc] = useState(false);
  const [showFinancialDesc, setShowFinancialDesc] = useState(false);
  const [showPersonalityDesc, setShowPersonalityDesc] = useState(false);
  const [gradeDescription, setGradeDescription] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [curriculumDescription, setCurriculumDescription] = useState("");
  const [gradePointDescription, setGradePointDescription] = useState("");
  const [financialDescription, setFinancialDescription] = useState("");
  const [personalityDescription, setPersonalityDescription] = useState("");
  const [showDrop, setShowDrop] = useState(false)
  
  
  function filterItem(text) {
    let filterItem = mallCoindata?.filter((eachitem) => {
      return eachitem?.coinSymbol?.toLowerCase()?.includes(text?.toLowerCase());
    });
    setfilteredcoins(filterItem);
  }





  return (
    <>
      <div className="dashboard-main">
        <div className="dashboard-body">
          <div 
            // onClick={() => setShowDrop(false)}
          >
           {localStorage.getItem('userType') === 'partner' ? 
            <AccDashsidebar/> : localStorage.getItem('userType') === 'user' ? 
            <Dashsidebar /> : <AdminAccDashsidebar/>}
          </div>
          <div className="dashboard-screens">
          <MenuNav 
              showDrop={showDrop}
              setShowDrop={setShowDrop}
              // searchTerm={search}
              // setSearchterm={setSearch}
              searchPlaceholder="Search..."
            />
      <div className="currentstep" style={{height:"90vh", overflow:"hidden"}}>

          {/* <h1>Hello</h1> */}

        <div className="cs-top-area" style={{height:'13rem'}}>
          <div className="cs-text1">
            <div>Your Current Step</div>
            <div
              className="back-Btn"
              onClick={() => {
                // setCurrentStepData("");
                // setCurrentStepDataLength("");
                // setCurrentStepDataPathId("");
                // setsideNav("My Journey");
                navigate(-1)
              }}
              style={{
                display: currentStepData ? "flex" : "none",
              }}
            >
              Back To Path
            </div>
          </div>
          <div className="bold-text">
            <div>
              {currentStepData?.name}
            </div>
            <div>
              Apx Takes{" "}
              {currentStepDataLength
                ? currentStepDataLength
                : currentStepPageData?.length}{" "}
              Days
            </div>
          </div>
          <div style={{fontSize:'16px', fontWeight:300, lineHeight:'30px'}}>
            {currentStepData?.description}
          </div>
        </div>
        <div className="cs-content" style={{height:'67vh'}}>
          <div className="overall-cs-content">
            <div className="macro-view-box">
              <div className="macro-text">Macro View:</div>
              <div className="macro-content">
                <div className="step-text">
                  {currentStepData?.name
                    ? currentStepData?.name
                    : currentStepPageData?.name}
                </div>
                <div className="macro-text-div">
                  {currentStepData?.description
                    ? currentStepData?.description
                    : currentStepPageData?.description}
                </div>
              </div>
            </div>
            <div className="micro-view-box">
              <div className="micro-text">Micro View:</div>
              <div className="micro-content">
                <div className="step-text">
                  <span>
                    {currentStepData?.name
                      ? currentStepData?.name
                      : currentStepPageData?.name}
                  </span>{" "}
                  For You
                </div>
                <div className="micro-text-div-container">
                  <div className="micro-text-div">
                    <div className="bold-text-div">
                      <div className="bold-text">Based On You’re Grade</div>
                      <div
                        className="unlock-Btn"
                        onClick={() => {
                          setShowGradeDesc(!showGradeDesc);
                        }}
                      >
                        {showGradeDesc ? "Close" : "Open"}
                      </div>
                    </div>
                    <div
                      className="sub-text"
                      style={{ display: showGradeDesc ? "flex" : "none" }}
                    >
                      {gradeDescription}
                    </div>
                  </div>
                  <div className="micro-text-div">
                    <div className="bold-text-div">
                      <div className="bold-text">Based On You’re Stream</div>
                      <div
                        className="unlock-Btn"
                        onClick={() => {
                          setShowStreamDesc(!showStreamDesc);
                        }}
                      >
                        {showStreamDesc ? "Close" : "Open"}
                      </div>
                    </div>
                    <div
                      className="sub-text"
                      style={{ display: showStreamDesc ? "flex" : "none" }}
                    >
                      {streamDescription}
                    </div>
                  </div>
                  <div className="micro-text-div">
                    <div className="bold-text-div">
                      <div className="bold-text">Based On You’re Curriculum</div>
                      <div
                        className="unlock-Btn"
                        onClick={() => {
                          setShowCurriculumDesc(!showCurriculumDesc);
                        }}
                      >
                        {showCurriculumDesc ? "Close" : "Open"}
                      </div>
                    </div>
                    <div
                      className="sub-text"
                      style={{ display: showCurriculumDesc ? "flex" : "none" }}
                    >
                      {curriculumDescription}
                    </div>
                  </div>
                  <div className="micro-text-div">
                    <div className="bold-text-div">
                      <div className="bold-text">
                        Based On You’re Grade Point Avg
                      </div>
                      <div
                        className="unlock-Btn"
                        onClick={() => {
                          setShowGradePointDesc(!showGradePointDesc);
                        }}
                      >
                        {showGradePointDesc ? "Close" : "Open"}
                      </div>
                    </div>
                    <div
                      className="sub-text"
                      style={{ display: showGradePointDesc ? "flex" : "none" }}
                    >
                      {gradePointDescription}
                    </div>
                  </div>
                  <div className="micro-text-div">
                    <div className="bold-text-div">
                      <div className="bold-text">
                        Based On You’re Financial Position
                      </div>
                      <div
                        className="unlock-Btn"
                        onClick={() => {
                          setShowFinancialDesc(!showFinancialDesc);
                        }}
                      >
                        {showFinancialDesc ? "Close" : "Open"}
                      </div>
                    </div>
                    <div
                      className="sub-text"
                      style={{ display: showFinancialDesc ? "flex" : "none" }}
                    >
                      {financialDescription}
                    </div>
                  </div>
                  <div className="micro-text-div">
                    <div className="bold-text-div">
                      <div className="bold-text">Based On You’re Personality</div>
                      <div
                        className="unlock-Btn"
                        onClick={() => {
                          setShowPersonalityDesc(!showPersonalityDesc);
                        }}
                      >
                        {showPersonalityDesc ? "Close" : "Open"}
                      </div>
                    </div>
                    <div
                      className="sub-text"
                      style={{ display: showPersonalityDesc ? "flex" : "none" }}
                    >
                      {personalityDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nano-view-box">
              <div className="nano-text">Nano View:</div>
              <div className="nano-content">
                <div className="step-text">
                  Get A Naavi Certified Vendor To Assist You In Choosing{" "}
                  <span>
                    {currentStepData?.name
                      ? currentStepData?.name
                      : currentStepPageData?.name}
                  </span>
                </div>
                <div className="nano-overall-div">
                  {currentStepData?.ConnectedServices?.length > 0
                    ? currentStepData?.ConnectedServices
                        .slice(0, 3)
                        .map((item, index) => (
                          <Carousel1
                            item={item}
                            showNewDiv={showNewDiv}
                            handleRejectClick={handleRejectClick}
                            position={index}
                            // image={item?.product_icon}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                            setIndex={setIndex}
                            setAcceptOffer={setAcceptOffer}
                            userDetails={userDetails}
                          />
                        ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* <center>
          <div className="cs-footer1">
            <div onClick={() => {
              setPopup(true);
              setPopupDetails("no");
            }}>Failed</div>
            <div>Did you complete this step?</div>
            <div onClick={() => {
              setPopup(true);
              setPopupDetails("yes");
            }}>Yes</div>
          </div>
        </center> */}
        {acceptOffer && (
          <div
            className="accept-offer-overlay"
            onClick={() => {
              setAcceptOffer(false);
              setBuy("step1");
              setIndex([]);
            }}
          >
            <div
              style={{ right: acceptOffer ? "0" : "-100%" }}
              className="right-divv-cs"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {buy === "step1" ? (
                <>
                  <div className="amount-details-cs">
                    <div
                      className="left-amnt-cs"
                      style={{ borderRight: "1px solid #E7E7E7" }}
                    >
                      <p className="amnt-font-cs">
                        {index?.first_purchase && index?.first_purchase?.price
                          ? index?.first_purchase?.price?.toFixed(2)
                          : "0.00"}
                        &nbsp;
                        {index?.first_purchase && index?.first_purchase?.coin
                          ? index?.first_purchase?.coin
                          : ""}
                      </p>
                      <p className="text-font-cs">
                        {index?.first_purchase && index?.first_purchase?.coin
                          ? "First Purchase"
                          : "Monthly"}
                      </p>
                    </div>
                    <div className="left-amnt1-cs">
                      <p className="amnt-font-cs">
                        {index?.monthly && index?.billing_cycle?.monthly?.price
                          ? index?.billing_cycle?.monthly?.price?.toFixed(2)
                          : "0.00"}
                        &nbsp;
                        {index?.monthly && index?.billing_cycle?.monthly?.coin
                          ? index?.billing_cycle?.monthly?.coin
                          : ""}
                      </p>
                      <p className="text-font-cs">
                        {index?.monthly && index?.billing_cycle?.monthly?.coin
                          ? "Monthly"
                          : "Monthly"}
                      </p>
                    </div>
                  </div>
                  <div className="buttonss-cs">
                    <button
                      className="buy-btn-cs"
                      onClick={() => {
                        setBuy("step2");
                      }}
                    >
                      Buy Now
                    </button>
                  
                  </div>
                </>
              ) : buy === "step2" ? (
                <div className="buy-step1-cs">
                  <div
                    style={{
                      width: "100%",
                      height: "20%",
                      height: "17%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "500",
                        color: "#1F304F",
                      }}
                    >
                      Select Currency To Pay With?
                    </div>
                    <div className="searchh-cs">
                      <input
                        type="text"
                        placeholder="Search Vaults.."
                        onChange={(event) => filterItem(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="coin-options-cs">
                    <CoinComponent />
                  </div>
                  <div className="buttonss-cs">
                    <div
                      className="share-btn-cs"
                      onClick={() => {
                        setBuy("step1");
                      }}
                    >
                      Close
                    </div>
                  </div>
                </div>
              ) : buy === "step3" ? (
                <div className="buy-step1-cs">
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      color: "#1F304F",
                    }}
                  >
                    Are You Sure You Want To Subscribe To {index?.product_name}?
                  </div>
                  <div className="boxx-cs" onClick={() => setBuy("step4")}>
                    Confirm Purchase
                  </div>
                  <div
                    className="boxx-cs"
                    style={{
                      marginTop: "1.5rem",
                    }}
                    onClick={() => {
                      setBuy("step1");
                    }}
                  >
                    Go Back
                  </div>
                  <div
                    className="boxx-cs"
                    style={{
                      marginTop: "1.5rem",
                    }}
                    onClick={() => {
                      setBuy("step1");
                      setAcceptOffer(false);
                      setIndex([]);
                    }}
                  >
                    Cancel Order
                  </div>
                </div>
              ) : buy === "step4" ? (
                <div className="buy-step1-cs">
                  <Step4 setAcceptOffer={setAcceptOffer} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

      
      </div>
      </div>
      </div>
      </div>
 

    </>
    
  );
};

export default StepPage;

const Carousel1 = ({
  item,
  showNewDiv,
  handleRejectClick,
  position,
  position1,
  position2,
  position3,
  image,
  setSelectedCard,
  selectedCard,
  setIndex,
  setAcceptOffer,userDetails
}) => {
  const initiatePurchase = (sService) => {
  //   console.log({
  //     userId: userDetails?.user?._id,
  //     service_id: sService?._id,
  //     purchaseStatus: "pending"
  // },sService,userDetails,  "lwelkfjweflwjekhflew")
    axios.post(`https://careers.marketsverse.com/userpurchase/add`, {
      userId: userDetails?.user?._id,
      service_id: sService?._id,
      purchaseStatus: "pending"
  }).then(({data}) => {
    if(data.status){
      console.log(data, "lwedlwehlwe")
    }
  })
  }
  // Razorpay starts
  const [razorpayOptions, setRazorpayOptions,] = useState(null)

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay failed to load!!');
      return;
    }

    const response = await fetch('https://careers.marketsverse.com/api/paymentGateway/razorpay/initialize-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // app_code: 'sharan',
            // owner_id: 'jhwegjhwef',
            // amount: 300,
            // user_email: userDetails?.user?.email,
            user_mobile_number: '9599677424',
            "amount":amount,
            "user_email":userDetails?.user?.email,
          }),
        });

        const data = await response.json();

        console.log(data, "kjgkf3k4jf3l4")

        if (data && data.status) {
          const {
            order_id,
            amount,
            currency,
            name,
            email,
            contact,
            callbackUrl,
            cancelUrl,
          } = data.data[1];

          const options = {
            key: 'rzp_test_pIO7ySTH850hhP', // Replace with your Razorpay key
            amount: amount.toString(),
            currency,
            name,
            description: 'Test Transaction',
            order_id,
            callback_url: callbackUrl,
            prefill: {
              name,
              email,
              contact,
            },
            theme: {
              color: '#3399cc',
            },
          };

          setRazorpayOptions(options);
        }
  };

  useEffect(() => {
    if(razorpayOptions){
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    }
  }, [razorpayOptions])
// Razorpay Ends


  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedCard(position);
      }}
      className={`nano-div2 ${
        showNewDiv === true
          ? "slide-in"
          : showNewDiv === false
          ? "fade-out"
          : ""
      }`}
      style={{
        left: position === 0 ? "0" : position === 1 ? "25%" : "50%",
        zIndex: position === selectedCard ? "3" : "2",
        height: position === selectedCard ? "100%" : "85%",
        opacity: position === selectedCard ? "1" : "0.5",
      }}
    >
      {/* <div className="nano-img">
        <img
          // src={item?.banker_metadata?.profilePicURL}
          src={require("./naaviLogo.png")}
          alt=""
          style={{
            borderRadius: "50%",
            width: "73px",
            height: "73px",
            background: "#e7e7e7",
          }}
        />
      </div> */}
      <div style={{ textAlign: "center", fontSize: "12px", fontWeight: 600 }}>
        {item?.ServiceDetails[0]?.name}
      </div>
      <div className="nano-speed-container">
        <div className="speed-div">
          <span>Offered By: </span>
            <div style={{ marginLeft: "10px" }}>
              {item?.ServiceDetails[0]?.productcreatoremail?.substring(0, 10)}
            </div>
        </div>
        <div className="speed-div">
          <span>Billing Type:</span>
          <span>{item?.ServiceDetails[0]?.chargingtype}</span>
        </div>
        <div className="speed-div">
            <span>Cost:</span>
            <span>
            {item?.ServiceDetails[0]?.billing_cycle?.lifetime?.price || item?.ServiceDetails[0]?.billing_cycle?.monthly?.price || item?.ServiceDetails[0]?.billing_cycle?.annual?.price} {item?.ServiceDetails[0]?.billing_cycle?.lifetime?.coin || item?.ServiceDetails[0]?.billing_cycle?.monthly?.coin || item?.ServiceDetails[0]?.billing_cycle?.annual?.coin}
            </span>
          </div>
        {/* {Object.entries(item?.ServiceDetails[0]?.billing_cycle).map(([key, value]) => (
          <div className="speed-div" key={key}>
            <span>Cost:</span>
            <span>
              {value.price}&nbsp;{value.coin}
            </span>
          </div>
        ))} */}
        <div style={{ textAlign: "center", fontSize: "12px", fontWeight: 300 }}>
          {item?.ServiceDetails[0]?.description}
        </div>
      </div>
      <div className="nano-btns">
        <div
          className="accept-btn"
          onClick={() => {
            // console.log(item, "item");
            // setIndex(item);
            // setAcceptOffer(true);
            initiatePurchase(item?.ServiceDetails[0])
            displayRazorpay(Number(item?.ServiceDetails[0]?.billing_cycle?.lifetime?.price || item?.ServiceDetails[0]?.billing_cycle?.monthly?.price || item?.ServiceDetails[0]?.billing_cycle?.annual?.price))
          }}
        >
         Buy Now
        </div>
        
      </div>
    </div>
  );
};

const Carousel2 = ({
  showNewDiv,
  handleRejectClick,
  // position1,
  position2,
  // position3,
  image,
  originalprice,
  discountprice,
}) => {
  return (
    <div
      className={`nano-div2 ${
        showNewDiv === true
          ? "slide-in"
          : showNewDiv === false
          ? "fade-out"
          : ""
      }`}
      style={{
        left: position2 === 1 ? "0" : position2 === 2 ? "25%" : "50%",
        zIndex: position2 === 2 ? "3" : "2",
        height: position2 === 2 ? "100%" : "75%",
      }}
    >
      <div className="nano-img">
        <img src={image} alt="" />
      </div>
      <div className="nano-price">
        <div className="disount-price">₹{discountprice}</div>
        <div className="original-price">₹{originalprice}</div>
      </div>
      <div className="nano-speed-container">
        <div className="speed-div">
          <span>Speed: </span>
          <span>14 Days</span>
        </div>
        <div className="speed-div">
          <span>Success Rate:</span>
          <span>525/622</span>
        </div>
      </div>
      <div className="nano-btns">
        <div className="accept-btn">Accept Offer</div>
        <div
          className="reject-btn"
          onClick={() => {
            handleRejectClick();
          }}
        >
          Reject Offer
        </div>
      </div>
    </div>
  );
};

const Carousel3 = ({
  showNewDiv,
  handleRejectClick,
  // position1,
  // position2,
  position3,
  image,
  originalprice,
  discountprice,
}) => {
  return (
    <div
      className={`nano-div2 ${
        showNewDiv === true
          ? "slide-in"
          : showNewDiv === false
          ? "fade-out"
          : ""
      }`}
      style={{
        left:
          // position1 === 1
          //   ? "0"
          //   : position1 === 2
          //   ? "25%"
          //   : position1 === 3
          //   ? "50%"
          //   : position2 === 1
          //   ? "0"
          //   : position2 === 2
          //   ? "25%"
          //   : position2 === 3
          //   ? "50%"
          //   :
          position3 === 1 ? "0" : position3 === 2 ? "25%" : "50%",
        zIndex: position3 === 2 ? "3" : "2",
        height: position3 === 2 ? "100%" : "75%",
      }}
    >
      <div className="nano-img">
        <img src={image} alt="" />
      </div>
      <div className="nano-price">
        <div className="disount-price">₹{discountprice}</div>
        <div className="original-price">₹{originalprice}</div>
      </div>
      <div className="nano-speed-container">
        <div className="speed-div">
          <span>Speed: </span>
          <span>14 Days</span>
        </div>
        <div className="speed-div">
          <span>Success Rate:</span>
          <span>525/622</span>
        </div>
      </div>
      <div className="nano-btns">
        <div className="accept-btn">Accept Offer</div>
        <div
          className="reject-btn"
          onClick={() => {
            handleRejectClick();
          }}
        >
          Reject Offer
        </div>
      </div>
    </div>
  );
};
