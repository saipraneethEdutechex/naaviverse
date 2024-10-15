import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";
import Appnavbar from "../../components/appnavbar/appnavbar";
import Dashsidebar from "../../components/dashsidebar/dashsidebar";
import searchic from "../../static/images/dashboard/searchic.svg";
import downarrow from "../../static/images/dashboard/downarrow.svg";
import darrow from "../../static/images/dashboard/darrow.svg";
import clickarrow from "../../static/images/dashboard/clickarrow.svg";
import nvest from "../../static/images/dashboard/nvest.svg";
import profile from "../../static/images/dashboard/profile.svg";
import correct from "../../static/images/dashboard/correct.svg";
import gx from "../../static/images/dashboard/gx.svg";
import accounts from "../../static/images/dashboard/accounts.svg";
import vaults from "../../static/images/dashboard/vaults.svg";
import profilea from "../../static/images/dashboard/profilea.svg";
import support from "../../static/images/dashboard/support.svg";
import settings from "../../static/images/dashboard/settings.svg";
import sidearrow from "../../static/images/dashboard/sidearrow.svg";
import logout from "../../static/images/dashboard/logout.svg";
import { useStore } from "../../components/store/store.ts";
import {
  GetAllSpecialties,
  GetAllAccountants,
  GetAllAccountantsForOneSpecialty,
  FollowBrand,
  GetAutomatedServices,
  GetFollowList,
  UnfollowBrand,
} from "../../services/accountant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import closepop from "../../static/images/dashboard/closepop.svg";
import { formatDate } from "../../utils/time";
import EarningCalendar from "./EarningCalendar/index";
import Vaults from "../Vaults";
import Toggle from "../../components/Toggle";
import Tasks from "../Tasks";
import WalletScan from "./WalletScan";
import MapsPage from "../MapsPage";
import PathComponent from "../../components/PathComponent";
import JourneyPage from "../JourneyPage";
import CurrentStep from "../CurrentStep";
import { useCoinContextData } from "../../context/CoinContext";
import axios from "axios";
import VaultTransactions from "../VaultTransactions/index.jsx";
import TransactionPage from "./TransactionPage/index.jsx";
import MenuNav from "../../components/MenuNav/index.jsx";

const accountantsData = [
  {
    id: 0,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
  {
    id: 1,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India", "United States"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
  {
    id: 2,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
  {
    id: 3,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India", "United States"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
];

const servicesBy = [
  {
    id: 0,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 1,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 2,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 3,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 4,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
];

const Dashboard = () => {
  const {
    sideNav,
    setsideNav,
    isLoading,
    setisLoading,
    coinType,
    setCoinType,
    balanceToggle,
    setBalanceToggle,
  } = useStore();
  const {
    searchTerm,
    setSearchterm,
    checkForHistory,
    setCheckForHistory,
    preLoginHistoryData,
    setPreLoginHistoryData,

    //vault action
    transactionSelected,
    setTransactionSelected,
    setTransactionData,
    setSelectedCoin,
    coinActionEnabled,
    setCoinActionEnabled,
    coinAction,
    setCoinAction,
    selectedCoin,

    // Forex Currency Add Action
    addActionStep,
    setAddActionStep,
    paymentMethodData,
    setPaymentMethodData,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    addForexAmount,
    setAddForexAmount,
    forexPathId,
    setForexPathId,
    forexQuote,
    setForexQuote,
  } = useCoinContextData();
  const [search, setSearch] = useState("");
  const [searchservice, setSearchservice] = useState("");
  const [countriesChecked, setCountriesChecked] = useState([]);
  const [specalitiesChecked, setSpecalitiesChecked] = useState([]);
  const [automatedservices, setautomatedservices] = useState([]);
  const [servicesByList, setServicesByList] = useState([]);
  const [Speaclities, setSpeaclities] = useState(null);
  const [accountantsList, setAccountantsList] = useState(null);
  const [submit, setsubmit] = useState(false);
  const [follow, setFollow] = useState({});
  const [followList, setFollowList] = useState([]);
  const [serviceby, setServiceby] = useState({});
  const [openRight, setOpenRight] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [currentFollow, setcurrentFollow] = useState({});
  const [isServiceByLoading, setIsServiceByLoading] = useState(false);
  const [choice, setChoice] = useState("");
  const [searchVault, setSearchVault] = useState("");
  const [selectedDropDown, setSelectedDropDown] = useState("Type Of Node");
  const [selectedNode, setSelectedNode] = useState("");

  const [productKeys, setProductKeys] = useState(null);
  const [profileId, setProfileId] = useState("");

  const userDetails = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      axios
        .get(
          `https://careers.marketsverse.com/userpaths/getCurrentStep?email=${userDetails?.user?.email}`
        )
        .then(({ data }) => {
          if (data.status) {
            // console.log(data.data[0].StepDetails[0].other_data, "ProductKeys");
            setProductKeys(data.data[0].StepDetails[0].product_ids);
          }
        });
    }
  }, []);

  const [productDataArray, setProductDataArray] = useState([]);

  // const fetchData = async () => {
  //   setProductDataArray([]);
  //   if (productKeys) {
  //     const apiKeys = Object.values(productKeys);
  //     // console.log(apiKeys, "apiKeys");

  //     // Use Promise.all to wait for all asynchronous calls to complete
  //     const fetchDataPromises = apiKeys.map((item) => fetchProductData(item));

  //     try {
  //       const results = await Promise.all(fetchDataPromises);

  //       // results is an array containing the product data for each key
  //       const updatedProductDataArray = results.filter(Boolean);
  //       setProductDataArray([...updatedProductDataArray]);
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     }
  //   }
  // };

  const fetchData = async () => {
    setProductDataArray([]);
    console.log(productKeys, "ewlkhflkwheflwerf");
    if (productKeys && Array.isArray(productKeys)) { // Check if productKeys exists and is an array
      const fetchDataPromises = productKeys.map((id) => fetchProductData(id)); // Map over the IDs directly

      try {
        const results = await Promise.all(fetchDataPromises);
        const updatedProductDataArray = results.filter(Boolean);
        setProductDataArray([...updatedProductDataArray]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    } else {
      console.warn("Product keys is not a valid array:", productKeys);
    }
  };

  // useEffect(() => {
  //   // Fetch initial product data when component mounts
  //   if (productKeys) {
  //     fetchData();
  //   }
  // }, []);

  useEffect(() => {
    // Fetch updated product data when productKeys change
    fetchData();
  }, [productKeys]);

  const fetchProductData = async (apiKey) => {
    try {
      const apiUrl = `https://comms.globalxchange.io/gxb/product/get?product_id=${apiKey}`;
      const response = await axios.get(apiUrl);
      const productData = response.data.products[0];
      // console.log(productData, "productData");

      // Check if the item already exists in the array
      // const existingItem = productDataArray.find(
      //   (item) => item._id === productData._id
      // );

      // if (!existingItem) {
      //   return productData;
      // }
      return productData;

      return null; // Return null for items that already exist in the array
    } catch (error) {
      console.error(`Error fetching productt data for key ${apiKey}:`, error);
      return null;
    }
  };

  // useEffect(() => {
  //   // console.log(productKeys, "productKeys");
  //   setProductDataArray([]);
  //   if (productKeys) {
  //     const apiKeys = Object.values(productKeys);
  //     console.log(apiKeys, "apiKeys");
  //     // Fetch product data for each key in otherData
  //     apiKeys.map((item) => {
  //       fetchProductData(item);
  //     });
  //   }
  // }, [productKeys]);

  // const fetchProductData = async (apiKey) => {
  //   const apiUrl = `https://comms.globalxchange.io/gxb/product/get?product_id=${apiKey}`;
  //   const response = await axios.get(apiUrl);
  //   const productData = response.data.products[0];
  //   console.log(productData, "productData");
  //   const existingItem = productDataArray.find(
  //     (item) => item._id === productData._id
  //   );
  //   if (!existingItem) {
  //     setProductDataArray((prevArray) => [...prevArray, productData]);
  //   }

  //   // setProductDataArray((prevArray) => [...prevArray, productData]);
  //   // } catch (error) {
  //   //   // Handle error as needed, e.g., log it or skip the entry
  //   //   console.error(`Error fetching product data for key ${apiKey}:`, error);
  //   // }
  // };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails === null || userDetails === undefined) {
      navigate("/login");
    }
    handleFollowList();
  }, []);

  useEffect(() => {
    setShowDrop(false);
    if (sideNav === "Partners") {
      handleSpecalities();
      handleAccountant();
    } else if (sideNav === "Services") {
      // handleFollowList();
      handleAutomatedServices();
    }
  }, [sideNav]);

  const handleAutomatedServices = () => {
    setisLoading(true);
    let obj = {
      app_code: "naavi",
      product_creator: "ramkaluru@edutechex.com",
    };
    GetAutomatedServices(obj)
      .then((res) => {
        if (res.data.status) {
          setautomatedservices(res.data.products);
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const handleServicesBy = () => {
    if (currentFollow?.bankerDetails?.displayName !== undefined) {
      setIsServiceByLoading(true);
      let obj = {
        // app_code: "naavi",
        product_creator: currentFollow.bankerEmail,
      };
      // console.log(obj);
      GetAutomatedServices(obj)
        .then((res) => {
          if (res.data.status) {
            setServicesByList(res.data.products);
            setIsServiceByLoading(false);
          }
        })
        .catch((err) => {
          setIsServiceByLoading(false);
        });
    }
  };

  const handleSpecalities = () => {
    GetAllSpecialties().then((res) => {
      if (res.data.status) {
        setSpeaclities(res.data);
      }
    });
  };

  const handleAccountant = () => {
    let userEmail = userDetails?.user?.email;
    GetAllAccountants(userEmail).then((res) => {
      if (res.data.status) {
        // console.log(res?.data, 'res.data');
        setAccountantsList(res.data);
      }
    });
  };

  const handleAccountantSpecalities = (each) => {
    let obj = {
      category: "education consultants",
      subCategory: each.subCategory,
    };
    GetAllAccountantsForOneSpecialty(obj).then((res) => {
      if (res.data.status) {
        setAccountantsList(res.data);
      }
    });
  };

  const handleFollowBrand = (each) => {
    let obj = {
      appCode: "naavi",
      bankerEmail: each?.email,
    };
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let data = {
      email: userDetails.user.email,
      idToken: userDetails.idToken,
    };
    FollowBrand(obj, data).then((res) => {
      if (res?.data?.status) {
        // console.log(res?.data, 'followbrand res?.data')
        // setAccountantsList(res?.data);
        handleAccountant();
        setsubmit(true);
        setFollow(each);
      } else {
        setsubmit(true);
        setFollow(each);
        handleCloseFollow();
      }
    });
  };

  const handleUnFollowBrand = (each) => {
    let obj = {
      appCode: "naavi",
      bankerEmail: each?.email,
    };
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let data = {
      email: userDetails.user.email,
      idToken: userDetails.idToken,
    };
    UnfollowBrand(obj, data).then((res) => {
      if (res?.data?.status) {
        // console.log(res?.data, 'Unfollowbrand res?.data')
        // setAccountantsList(res?.data);
        handleAccountant();
        setsubmit(true);
        setFollow(each);
      } else {
        setsubmit(true);
        setFollow(each);
        handleCloseFollow();
      }
    });
  };

  const handleCountryChange = (name) => {
    let data = countriesChecked;
    let indexVal = data.indexOf(name);
    if (indexVal !== -1) {
      setCountriesChecked([...data, name]);
    } else {
      data.splice(indexVal, 1);
      setCountriesChecked(data);
    }
  };

  const handleSpecalityChange = (each) => {
    let data = specalitiesChecked;
    let indexVal = data.indexOf(each.subCategory);
    if (indexVal === -1) {
      setSpecalitiesChecked([each.subCategory]);
      handleAccountantSpecalities(each);
    } else {
      setSpecalitiesChecked([]);
      handleAccountant();
    }
  };

  const handleCloseFollow = () => {
    setTimeout(() => {
      setsubmit(false);
      setFollow("");
      setChoice("");
    }, "4000");
  };

  const handleFollowList = () => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    GetFollowList(userDetails?.user?.email).then((res) => {
      let result = res?.data;
      if (result?.status) {
        // console.log(res.data, "follo");
        setFollowList(result?.data?.bankers);
        setcurrentFollow(result?.data?.bankers[0]);
        handleServicesBy();
      }
    });
  };

  useEffect(() => {
    if (currentFollow && Object.keys(currentFollow).length > 0) {
      handleServicesBy();
    }
  }, [currentFollow]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getPathDetails = (id) => {
    axios
      .get(`https://careers.marketsverse.com/paths/get?path_id=${id}`)
      .then((response) => {
        let result = response?.data?.data[0];
        // console.log(result, "preLoginHistoryData result");
        setPreLoginHistoryData(result);
      })
      .catch((error) => {
        console.log(error, "error in preLoginHistoryData");
      });
  };

  //Check if logged in user has a outstanding path to view
  useEffect(() => {
    let userEmail = userDetails?.user?.email;
    axios
      .get(
        `https://careers.marketsverse.com/pre_login/get_path?email=${userEmail}`
      )
      .then((response) => {
        let result = response?.data;
        // console.log(result, "check for preLogin result");
        if (result?.status) {
          setCheckForHistory(true);
          getPathDetails(result?.data[0]?.pathId);
        } else {
          setCheckForHistory(false);
        }
      })
      .catch((error) => {
        console.log(error, "error in check for preLogin result");
      });
  }, []);

  // coin action
  const resetCoinAction = () => {
    setCoinActionEnabled(false);
    setCoinAction(["Menu"]);
    setAddActionStep(1);
    setSelectedCoin({});
    setProfileId("");
    setPaymentMethodData([]);
    setSelectedPaymentMethod('');
    setForexPathId("");
    setAddForexAmount("");
    setForexQuote([]);
  };

  // get profile id
  useEffect(() => {
    let email = userDetails?.user?.email;
    if (coinAction?.includes("Add") && addActionStep === 1) {
      axios
        .get(`https://comms.globalxchange.io/user/details/get?email=${email}`)
        .then((res) => {
          const { data } = res;
          if (data?.status) {
            // console.log(data?.user["naavi_profile_id"], "profile id");
            setProfileId(data?.user["naavi_profile_id"]);
          }
        });
    }
  }, [coinAction, addActionStep]);

  // get payment methods for forex add action
  useEffect(() => {
    if (coinAction?.includes("Add") && selectedCoin?.coinSymbol) {
      axios
        .get(
          `https://comms.globalxchange.io/coin/vault/service/payment/stats/get?select_type=fund&to_currency=${selectedCoin?.coinSymbol}&from_currency=${selectedCoin?.coinSymbol}&country=India&banker=shorupan@indianotc.com`
        )
        .then((response) => {
          let result = response?.data?.pathData?.paymentMethod;
          // console.log(result, "payment methods result");
          setPaymentMethodData(result);
        })
        .catch((error) => {
          console.log(error, "error in fetching payment methods");
        });
    }
  }, [coinAction, selectedCoin]);

  const getPathId = () => {
    axios
      .get(
        `https://comms.globalxchange.io/coin/vault/service/payment/paths/get?from_currency=${selectedCoin?.coinSymbol}&to_currency=${selectedCoin?.coinSymbol}&select_type=fund&banker=shorupan@indianotc.com&paymentMethod=${selectedPaymentMethod}`
      )
      .then((response) => {
        let result = response?.data?.paths;
        // console.log(result, "getPathId result");
        if (result?.length > 0) {
          setForexPathId(result[0]?.path_id);
          // console.log(result[0]?.path_id, "pathId");
        }
      })
      .catch((error) => {
        console.log(error, "error in getPathId");
      });
  };

  const onBlur = (e) => {
    const float = parseFloat(e.target.value);
    setAddForexAmount(float.toFixed(2));
  };

  const getQuote = () => {
    let obj = {
      token: userDetails?.idToken,
      email: userDetails?.user?.email,
      app_code: "naavi",
      profile_id: profileId,
      coin_purchased: selectedCoin?.coinSymbol,
      purchased_from: selectedCoin?.coinSymbol,
      from_amount: addForexAmount,
      stats: true,
      identifier: `Add ${addForexAmount} ${selectedCoin?.coinSymbol} Via ${selectedPaymentMethod}`,
      path_id: forexPathId,
    };

    axios
      .post(
        `https://comms.globalxchange.io/coin/vault/service/trade/execute`,
        obj
      )
      .then((response) => {
        let result = response?.data;
        // console.log(result, "getQuote result");
        if (result?.status) {
          setForexQuote(result);
          setAddActionStep(3);
        }
      })
      .catch((error) => {
        console.log(error, "error in getQuote");
      });
  };

  return (
    <div>
      <div className="dashboard-main">
        <div className="dashboard-body">
          <div onClick={() => setShowDrop(false)}>
            <Dashsidebar />
          </div>
          <div className="dashboard-screens">
            <div style={{ height: "100%" }}>
              {sideNav === "Partners" ? (
                <>
                  <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={search}
                      setSearchterm={setSearch}
                      searchPlaceholder="Search for Partners..."
                   />
                  <div
                    className="account-container"
                    onClick={() => setShowDrop(false)}
                  >
                    <div
                      className="account-left"
                      style={{ paddingBottom: "0" }}
                    >
                      <div className="filter-actions-box">
                        {/* <div className="filter-action1">Add A Filter</div>
                        <div className="filter-action2">Add A Filter</div> */}
                      </div>
                      <div className="all-account">
                        {accountantsList != null &&
                        accountantsList != undefined &&
                        accountantsList?.data != null &&
                        accountantsList?.data != undefined ? (
                          <>
                            {accountantsList?.data
                              ?.filter((element) => {
                                return element.displayName
                                  .toLowerCase()
                                  .startsWith(search.toLowerCase());
                              })
                              ?.map((each, i) => (
                                <div className="each-account" key={i}>
                                  <div className="account-img-box">
                                    <img
                                      className="account-img"
                                      src={each?.profilePicURL}
                                      alt=""
                                    />
                                  </div>
                                  <div className="account-name">
                                    {each?.displayName}
                                  </div>
                                  <div className="account-work">
                                    {each?.description}
                                  </div>
                                  <div className="account-country">
                                    Countries
                                  </div>
                                  <div>
                                    {typeof each.country === "object" ? (
                                      <div className="account-countries-all">
                                        <div className="account-countries-each">
                                          {each?.country[0]}
                                        </div>
                                        <div className="account-countries-each1">
                                          {each?.country[1]}
                                        </div>
                                        <div
                                          className="account-countries-more"
                                          style={{
                                            display:
                                              each?.country?.length > 2
                                                ? ""
                                                : "none",
                                          }}
                                        >
                                          More
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="account-countries-all">
                                        <div className="account-countries-each">
                                          {each?.country}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="account-speaclities">
                                    Specialty
                                  </div>
                                  {typeof each?.subCategory === "object" ? (
                                    <div className="account-speaclities-all">
                                      <div className="account-speaclities-each">
                                        {each?.subCategory[0]}
                                      </div>
                                      <div className="account-speaclities-each1">
                                        {each?.subCategory[1]}
                                      </div>
                                      <div className="account-speaclities-each2">
                                        {each?.subCategory[2]}
                                      </div>
                                      <div className="account-speaclities-each3">
                                        {each?.subCategory[3]}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="account-speaclities-all">
                                      <div className="account-speaclities-each">
                                        {each?.subCategory}
                                      </div>
                                    </div>
                                  )}
                                  <div
                                    className="account-see-more"
                                    onClick={() => {
                                      if (!each?.userFollow) {
                                        handleFollowBrand(each);
                                        setChoice("Follow");
                                      } else {
                                        handleUnFollowBrand(each);
                                        setChoice("Unfollow");
                                      }
                                    }}
                                    style={{
                                      background: each?.userFollow
                                        ? "#FE2C55"
                                        : "#59A2DD",
                                    }}
                                  >
                                    {each?.userFollow ? "Unfollow" : "Follow"}
                                  </div>
                                </div>
                              ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="account-right">
                      {/* <div className="account-right-box1">
                        <div className="account-right-title">Country</div>
                        <div style={{ overflowY: "scroll", height: "73%" }}>
                          <div className="check-div">
                            <div className="check">
                              <img
                                className=""
                                src={correct}
                                alt=""
                                style={{
                                  visibility:
                                    countriesChecked.length === 0
                                      ? "visible"
                                      : "hidden",
                                }}
                              />
                            </div>
                            <div className="check-label">All Countries</div>
                          </div>
                        </div>
                        <div className="account-right-btn">See All</div>
                      </div> */}
                      {/* <div className="account-right-box2">
                        <div className="account-right-title">Specialty</div>
                        {Speaclities != null &&
                        Speaclities != undefined &&
                        Speaclities.data != null &&
                        Speaclities.data != undefined ? (
                          <div style={{ overflowY: "scroll", height: "76%" }}>
                            {Speaclities.data.map((each, i) => (
                              <div className="check-div">
                                <div
                                  className="check"
                                  onClick={() => handleSpecalityChange(each)}
                                >
                                  <img
                                    className=""
                                    src={correct}
                                    alt=""
                                    style={{
                                      visibility: specalitiesChecked.includes(
                                        each.subCategory
                                      )
                                        ? "visible"
                                        : "hidden",
                                    }}
                                  />
                                </div>
                                <div className="check-label">
                                  {each.subCategory}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="account-right-btn">See All</div>
                      </div> */}

                      {/* TODO: Check if the right side should be removed or not */}

                      {/* <div className="account-right-box1-d">
                        <div className="each-dd-option">
                          <div
                            className="each-dd-option-div"
                            onClick={() => {
                              setSelectedDropDown("Type Of Node");
                            }}
                          >
                            <div
                              style={{
                                fontWeight:
                                  selectedDropDown === "Type Of Node"
                                    ? "600"
                                    : "",
                              }}
                            >
                              Type Of Node
                            </div>
                            <div className="each-down-arrow">
                              <img
                                src={downarrow}
                                alt=""
                                style={{
                                  transform:
                                    selectedDropDown === "Type Of Node"
                                      ? "rotate(180deg)"
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="hidden-nodes-div"
                            style={{
                              display:
                                selectedDropDown === "Type Of Node"
                                  ? "flex"
                                  : "none",
                            }}
                          >
                            <div className="each-hidden-node">
                              <div
                                className="check-boxx"
                                onClick={() => {
                                  if (selectedNode === "Distributor") {
                                    setSelectedNode("");
                                  } else {
                                    setSelectedNode("Distributor");
                                  }
                                }}
                              >
                                <img
                                  className=""
                                  src={correct}
                                  alt=""
                                  style={{
                                    visibility:
                                      selectedNode === "Distributor"
                                        ? "visible"
                                        : "hidden",
                                  }}
                                />
                              </div>
                              <div>Distributor</div>
                            </div>
                            <div className="each-hidden-node">
                              <div
                                className="check-boxx"
                                onClick={() => {
                                  if (selectedNode === "Vendor") {
                                    setSelectedNode("");
                                  } else {
                                    setSelectedNode("Vendor");
                                  }
                                }}
                              >
                                <img
                                  className=""
                                  src={correct}
                                  alt=""
                                  style={{
                                    visibility:
                                      selectedNode === "Vendor"
                                        ? "visible"
                                        : "hidden",
                                  }}
                                />
                              </div>
                              <div>Vendor</div>
                            </div>
                            <div className="each-hidden-node">
                              <div
                                className="check-boxx"
                                onClick={() => {
                                  if (selectedNode === "Mentor") {
                                    setSelectedNode("");
                                  } else {
                                    setSelectedNode("Mentor");
                                  }
                                }}
                              >
                                <img
                                  className=""
                                  src={correct}
                                  alt=""
                                  style={{
                                    visibility:
                                      selectedNode === "Mentor"
                                        ? "visible"
                                        : "hidden",
                                  }}
                                />
                              </div>
                              <div>Mentor</div>
                            </div>
                          </div>
                        </div>
                        <div className="each-dd-option">
                          <div
                            className="each-dd-option-div"
                            onClick={() => {
                              setSelectedDropDown("Category");
                            }}
                          >
                            <div
                              style={{
                                fontWeight:
                                  selectedDropDown === "Category" ? "600" : "",
                              }}
                            >
                              Category
                            </div>
                            <div className="each-down-arrow">
                              <img
                                src={downarrow}
                                alt=""
                                style={{
                                  transform:
                                    selectedDropDown === "Category"
                                      ? "rotate(180deg)"
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="hidden-nodes-div"
                            style={{
                              display:
                                selectedDropDown === "Category"
                                  ? "flex"
                                  : "none",
                            }}
                          >
                            {Speaclities != null &&
                            Speaclities != undefined &&
                            Speaclities.data != null &&
                            Speaclities.data != undefined ? (
                              <>
                                {Speaclities.data.map((each, i) => (
                                  <div className="each-hidden-node" key={i}>
                                    <div
                                      className="check-boxx"
                                      onClick={() =>
                                        handleSpecalityChange(each)
                                      }
                                    >
                                      <img
                                        className=""
                                        src={correct}
                                        alt=""
                                        style={{
                                          visibility:
                                            specalitiesChecked.includes(
                                              each.subCategory
                                            )
                                              ? "visible"
                                              : "hidden",
                                        }}
                                      />
                                    </div>
                                    <div>{each.subCategory}</div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className="each-dd-option">
                          <div
                            className="each-dd-option-div"
                            onClick={() => {
                              setSelectedDropDown("Country");
                            }}
                          >
                            <div
                              style={{
                                fontWeight:
                                  selectedDropDown === "Country" ? "600" : "",
                              }}
                            >
                              Country
                            </div>
                            <div className="each-down-arrow">
                              <img
                                src={downarrow}
                                alt=""
                                style={{
                                  transform:
                                    selectedDropDown === "Country"
                                      ? "rotate(180deg)"
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="each-dd-option">
                          <div
                            className="each-dd-option-div"
                            onClick={() => {
                              setSelectedDropDown("Price Range");
                            }}
                          >
                            <div
                              style={{
                                fontWeight:
                                  selectedDropDown === "Price Range"
                                    ? "600"
                                    : "",
                              }}
                            >
                              Price Range
                            </div>
                            <div className="each-down-arrow">
                              <img
                                src={downarrow}
                                alt=""
                                style={{
                                  transform:
                                    selectedDropDown === "Price Range"
                                      ? "rotate(180deg)"
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="each-dd-option">
                          <div
                            className="each-dd-option-div"
                            onClick={() => {
                              setSelectedDropDown("Pre-Requisites");
                            }}
                          >
                            <div
                              style={{
                                fontWeight:
                                  selectedDropDown === "Pre-Requisites"
                                    ? "600"
                                    : "",
                              }}
                            >
                              Pre-Requisites
                            </div>
                            <div className="each-down-arrow">
                              <img
                                src={downarrow}
                                alt=""
                                style={{
                                  transform:
                                    selectedDropDown === "Pre-Requisites"
                                      ? "rotate(180deg)"
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="each-dd-option">
                          <div
                            className="each-dd-option-div"
                            onClick={() => {
                              setSelectedDropDown("Rating");
                            }}
                          >
                            <div
                              style={{
                                fontWeight:
                                  selectedDropDown === "Rating" ? "600" : "",
                              }}
                            >
                              Rating
                            </div>
                            <div className="each-down-arrow">
                              <img
                                src={downarrow}
                                alt=""
                                style={{
                                  transform:
                                    selectedDropDown === "Rating"
                                      ? "rotate(180deg)"
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </>
              ) : sideNav === "Services" ? (
                <>
                  <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={search}
                      setSearchterm={setSearch}
                      searchPlaceholder="Search for Services..."
                   />
                  <div
                    className="service-container"
                    onClick={() => setShowDrop(false)}
                  >
                    <div className="service-main">
                      <div
                        className="serviceby-box"
                        onClick={() => {
                          setOpenRight(true);
                          setShowDrop(false);
                        }}
                      >
                        <div className="serviceby-title">Services Used By</div>
                        <div className="serciceby-option-box">
                          <div className="serviceby-imgbox">
                            <img
                              className="serviceby-img"
                              src={currentFollow?.bankerDetails?.profilePicURL}
                              alt=""
                            />
                          </div>
                          <div className="serviceby-name">
                            {currentFollow?.bankerDetails?.displayName}
                          </div>
                          <div className="serviceby-arrowbox">
                            <img
                              className="serviceby-arrow"
                              src={darrow}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="serviceby-allbox"
                        onClick={() => setShowDrop(false)}
                      >
                        {isServiceByLoading ? (
                          <div className="each-service">
                            <Skeleton className="each-service-img" />
                            <Skeleton className="each-service-title" />
                            <Skeleton className="each-service-desc" />
                            <div className="each-service-bottom">
                              <Skeleton className="each-service-price" />
                              <Skeleton className="zoom1" />
                            </div>
                          </div>
                        ) : (
                          <>
                            {servicesByList != null &&
                            servicesByList != undefined ? (
                              <>
                                {servicesByList
                                  ?.filter((item) =>
                                    item.product.product_name
                                      .toLowerCase()
                                      .startsWith(searchservice.toLowerCase())
                                  )
                                  ?.map((each, i) => (
                                    <div
                                      className="each-service"
                                      onClick={() => {
                                        // console.log(each, 'each product1')
                                        localStorage.setItem(
                                          "product",
                                          JSON.stringify(each)
                                        );
                                        navigate(
                                          `/dashboard/users/${each?.product?.product_code}`
                                        );
                                      }}
                                    >
                                      <div>
                                        <img
                                          className="each-service-img"
                                          src={each?.product?.product_icon}
                                          alt=""
                                        />
                                      </div>
                                      <div className="each-service-title">
                                        {each.product.product_name}
                                      </div>
                                      <div className="each-service-desc">
                                        {each.product.sub_text}
                                      </div>
                                      <div className="each-service-bottom">
                                        <div className="each-service-price">
                                          $
                                          {`${parseFloat(
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].price
                                          ).toFixed(2)}/${
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].billing_method
                                          }`}
                                        </div>
                                        <div
                                          className="zoom1"
                                          style={{ cursor: "not-allowed" }}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                              alignItems: "center",
                                              height: "40px",
                                            }}
                                          >
                                            <div className="check1-text">
                                              CHECK
                                            </div>
                                            <img
                                              className="clickarrow-img"
                                              src={clickarrow}
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className="serviceby-title1"
                        onClick={() => setShowDrop(false)}
                      >
                        Naavi Recommended Services
                      </div>
                      <div
                        className="serviceby-allbox"
                        onClick={() => setShowDrop(false)}
                      >
                        {isLoading ? (
                          <div className="each-service">
                            <Skeleton className="each-service-img" />
                            <Skeleton className="each-service-title" />
                            <Skeleton className="each-service-desc" />
                            <div className="each-service-bottom">
                              <Skeleton className="each-service-price" />
                              <Skeleton className="zoom1" />
                            </div>
                          </div>
                        ) : (
                          <>
                            {automatedservices != null &&
                            automatedservices != undefined ? (
                              <>
                                {automatedservices
                                  ?.filter((item) =>
                                    item.product.product_name
                                      .toLowerCase()
                                      .startsWith(searchservice.toLowerCase())
                                  )
                                  ?.map((each, i) => (
                                    <div
                                      className="each-service"
                                      onClick={() => {
                                        // console.log(each, 'each product2')
                                        localStorage.setItem(
                                          "product",
                                          JSON.stringify(each)
                                        );
                                        navigate(
                                          `/dashboard/users/${each?.product?.product_code}`
                                        );
                                      }}
                                    >
                                      <div>
                                        <img
                                          className="each-service-img"
                                          src={each.product.product_icon}
                                          alt=""
                                        />
                                      </div>
                                      <div className="each-service-title">
                                        {each.product.product_name}
                                      </div>
                                      <div className="each-service-desc">
                                        {each.product.sub_text}
                                      </div>
                                      <div className="each-service-bottom">
                                        <div className="each-service-price">
                                          $
                                          {`${parseFloat(
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].price
                                          ).toFixed(2)}/${
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].billing_method
                                          }`}
                                        </div>
                                        <div
                                          className="zoom1"
                                          style={{ cursor: "not-allowed" }}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                              alignItems: "center",
                                              height: "40px",
                                            }}
                                          >
                                            <div className="check1-text">
                                              CHECK
                                            </div>
                                            <img
                                              className="clickarrow-img"
                                              src={clickarrow}
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : sideNav === "Calendar" ? (
                <>
                  <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={search}
                      setSearchterm={setSearch}
                      searchPlaceholder="Search Events..."
                   />
                  <div onClick={() => setShowDrop(false)}>
                    <EarningCalendar />
                  </div>
                </>
              ) : sideNav === "Wallet" ? (
                transactionSelected ? (
                  <>
                   <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchMenu={searchVault}
                      setSearchMenu={setSearchVault}
                   />
                    <div
                      className="services-main"
                      style={{ height: "calc(100% - 70px)" }}
                      onClick={() => setShowDrop(false)}
                    >
                      <div
                        className="services-all-menu"
                        style={{ borderBottom: "0.5px solid #E5E5E5" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "calc(100% - 110px)",
                          }}
                        >
                          <div
                            className="services-each-menu"
                            style={{
                              background:
                                coinType === "fiat"
                                  ? "rgba(241, 241, 241, 0.5)"
                                  : "",
                              fontWeight: coinType === "fiat" ? "700" : "",
                            }}
                            onClick={() => {
                              setCoinType("fiat");
                              setSearch("");
                            }}
                          >
                            Forex
                          </div>

                          {/* <div
                          className="services-each-menu"
                          style={{
                            background:
                              coinType === "crypto"
                                ? "rgba(241, 241, 241, 0.5)"
                                : "",
                            fontWeight: coinType === "crypto" ? "700" : "",
                          }}
                          onClick={() => {
                            setCoinType("crypto");
                            setSearch("");
                          }}
                        >
                          Crypto
                        </div> */}
                        </div>

                        <div
                          style={{
                            fontWeight: "600",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                          }}
                          onClick={() => {
                            setTransactionSelected(false);
                            setTransactionData([]);
                            setSelectedCoin({});
                          }}
                        >
                          Back
                        </div>
                      </div>
                      <VaultTransactions />
                    </div>
                  </>
                ) : (
                  <>
                   <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={searchVault}
                      setSearchterm={setSearchVault}
                      searchPlaceholder="Search Wallet..."
                   />
                    <div
                      className="services-main"
                      style={{ height: "calc(100% - 70px)" }}
                      onClick={() => setShowDrop(false)}
                    >
                      <div
                        className="services-all-menu"
                        style={{ borderBottom: "0.5px solid #E5E5E5" }}
                      >
                        <div style={{ display: "flex", width: "83%" }}>
                          <div
                            className="services-each-menu"
                            style={{
                              background:
                                coinType === "fiat"
                                  ? "rgba(241, 241, 241, 0.5)"
                                  : "",
                              fontWeight: coinType === "fiat" ? "700" : "",
                            }}
                            onClick={() => {
                              setCoinType("fiat");
                              setSearch("");
                            }}
                          >
                            Forex
                          </div>

                          {/* <div
                          className="services-each-menu"
                          style={{
                            background:
                              coinType === "crypto"
                                ? "rgba(241, 241, 241, 0.5)"
                                : "",
                            fontWeight: coinType === "crypto" ? "700" : "",
                          }}
                          onClick={() => {
                            setCoinType("crypto");
                            setSearch("");
                          }}
                        >
                          Crypto
                        </div> */}
                        </div>

                        <div style={{ display: "flex" }}>
                          <Toggle
                            toggle={balanceToggle}
                            setToggle={setBalanceToggle}
                            coinType={coinType}
                          />
                        </div>
                      </div>
                      <Vaults searchedValue={searchVault} />
                    </div>
                  </>
                )
              ) : sideNav === "Task Manager" ? (
                <>
                 <MenuNav 
                    showDrop={showDrop}
                    setShowDrop={setShowDrop}
                    // searchTerm={search}
                    // setSearchterm={setSearch}
                    searchPlaceholder="Search..."
                   />
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <Tasks />
                  </div>
                </>
              ) : sideNav === "Scanner" ? (
                <>
                <MenuNav 
                  showDrop={showDrop}
                  setShowDrop={setShowDrop}
                  // searchTerm={search}
                  // setSearchterm={setSearch}
                  searchPlaceholder="Search..."
                   />
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <WalletScan />
                  </div>
                </>
              ) : sideNav === "Paths" ? (
                <>
                 <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={searchTerm}
                      setSearchterm={setSearchterm}
                      searchPlaceholder="Find The School Or Program You Want To Attend..."
                   />
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <PathComponent />
                  </div>
                </>
              ) : sideNav === "My Journey" ? (
                <>
                  <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={searchTerm}
                      setSearchterm={setSearchterm}
                      searchPlaceholder="Search..."
                   />
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <JourneyPage />
                  </div>
                </>
              ) : sideNav === "Current Step" ? (
                <>
                   <MenuNav 
                      showDrop={showDrop}
                      setShowDrop={setShowDrop}
                      searchTerm={searchTerm}
                      setSearchterm={setSearchterm}
                      searchPlaceholder="Search..."
                   />
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <CurrentStep productDataArray={productDataArray} />
                  </div>
                </>
              ): sideNav === "Transactions" ? (
                <TransactionPage 
                  showDrop={showDrop}
                  setShowDrop={setShowDrop} 
                  search={search} 
                  setSearch={setSearch}
                  searchic={searchic}
                  profile={profile}
                  downarrow={downarrow}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <>
        {submit ? (
          <div
            className="pagemask"
            onMouseDown={() => {
              setsubmit(false);
              setFollow("");
              setChoice("");
            }}
            onClick={() => setShowDrop(false)}
          >
            <div className="full-box">
              <div className="endbox" onMouseDown={(e) => e.stopPropagation()}>
                <>{console.log(follow)}</>
                <div className="account-img-box">
                  <img
                    className="account-img"
                    src={follow.profilePicURL}
                    alt=""
                  />
                </div>
                <div className="follow-text">
                  {choice === "Follow"
                    ? "You Are Now Following"
                    : "You Have Now Unfollowed"}
                  <br />
                  {follow?.displayName}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>


      <>
        {coinActionEnabled && (
          <div className="acc-popular" onMouseDown={(e) => e.stopPropagation()}>
            <div
              className="acc-popular-top"
              style={{ height: "3rem", marginBottom: "0" }}
            >
              <div className="acc-popular-head">
                {selectedCoin?.coinName} Actions
              </div>
              <div
                className="acc-popular-img-box"
                onClick={() => resetCoinAction()}
                style={{ cursor: "pointer" }}
              >
                <img className="acc-popular-img" src={closepop} alt="" />
              </div>
            </div>
            <>
              {coinAction.includes("Menu") ? (
                <div>
                  <div className="acc-step-text1">
                    What would you like to do?
                  </div>
                  <div
                    className="acc-step-box2"
                    onClick={() => {
                      setCoinAction(["Add"]);
                    }}
                  >
                    Add
                  </div>
                  <div
                    className="acc-step-box2"
                    // onClick={() => {
                    //   setCoinAction(["Withdraw"]);
                    // }}
                  >
                    Withdraw
                  </div>
                  <div
                    className="acc-step-box2"
                    // onClick={() => {
                    //   setCoinAction(["Transfer"]);
                    // }}
                  >
                    Transfer
                  </div>
                </div>
              ) : coinAction.includes("Add") ? (
                <div
                  style={{
                    height: "calc(100% - 3rem)",
                  }}
                >
                  {addActionStep === 1 ? (
                    <>
                      <div className="acc-step-text1">
                        How do you want to add money?
                      </div>
                      <div className="scroll-box">
                        {paymentMethodData?.map((e, i) => {
                          return (
                            <div
                              className="acc-step-box2"
                              key={e?._id}
                              onClick={() => {
                                setSelectedPaymentMethod(e?.metadata?.name);
                              }}
                              style={{
                                borderColor:
                                  selectedPaymentMethod === e?.metadata?.name
                                    ? "#182542"
                                    : "#e7e7e7",
                              }}
                            >
                              <div>
                                <img src={e?.metadata?.icon} alt="" />
                              </div>
                              <div>{e?.metadata?.name}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="back-next-btns">
                        <div
                          className="back-Btn"
                          onClick={() => {
                            setCoinAction(["Menu"]);
                            setForexPathId("");
                            setSelectedPaymentMethod('');
                          }}
                        >
                          Go Back
                        </div>
                        <div
                          className="next-Btn"
                          onClick={() => {
                            if (selectedPaymentMethod?.length > 0) {
                              setAddActionStep(2);
                              getPathId();
                            }
                          }}
                          style={{
                            opacity:
                              selectedPaymentMethod?.length > 0 ? "1" : "0.5",
                          }}
                        >
                          Next Step
                        </div>
                      </div>
                    </>
                  ) : addActionStep === 2 ? (
                    <>
                      <div className="acc-step-text1">
                        How much do you want to add?
                      </div>
                      <div className="scroll-box">
                        <div className="acc-step-box3">
                          <div className="coin-details-div">
                            <div>
                              <img src={selectedCoin?.coinImage} alt="" />
                            </div>
                            <div>{selectedCoin?.coinSymbol}</div>
                          </div>
                          <div className="amount-details-div">
                            <input
                              type="number"
                              placeholder="0.00"
                              onChange={(e) => {
                                setAddForexAmount(e.target.value);
                              }}
                              value={addForexAmount}
                              onBlur={onBlur}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="back-next-btns">
                        <div
                          className="back-Btn"
                          onClick={() => {
                            setAddActionStep(1);
                            setAddForexAmount("");
                          }}
                        >
                          Go Back
                        </div>
                        <div
                          className="next-Btn"
                          style={{ opacity: addForexAmount ? "1" : "0.5" }}
                          onClick={() => {
                            if (addForexAmount) {
                              getQuote();
                            }
                          }}
                        >
                          Next Step
                        </div>
                      </div>
                    </>
                  ) : addActionStep === 3 ? (
                    <>
                      <div className="acc-step-text1">
                        You will be depositing
                      </div>
                      <div className="scroll-box">
                        <div className="acc-step-box3">
                          <div className="coin-details-div">
                            <div>
                              <img src={selectedCoin?.coinImage} alt="" />
                            </div>
                            <div>{selectedCoin?.coinSymbol}</div>
                          </div>
                          <div className="amount-details-div">
                            {forexQuote?.finalFromAmount
                              ? forexQuote?.finalFromAmount?.toFixed(2)
                              : "0.00"}
                          </div>
                        </div>
                        <div
                          className="acc-step-text1"
                          style={{ marginTop: "4rem" }}
                        >
                          You will be recieving
                        </div>
                        <div className="acc-step-box3">
                          <div className="coin-details-div">
                            <div>
                              <img src={selectedCoin?.coinImage} alt="" />
                            </div>
                            <div>{selectedCoin?.coinSymbol}</div>
                          </div>
                          <div className="amount-details-div">
                            {forexQuote?.finalToAmount
                              ? forexQuote?.finalToAmount?.toFixed(2)
                              : "0.00"}
                          </div>
                        </div>
                      </div>
                      <div className="back-next-btns">
                        <div
                          className="back-Btn"
                          onClick={() => {
                            setAddActionStep(2);
                          }}
                        >
                          Go Back
                        </div>
                        <div className="next-Btn">Next Step</div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        )}
      </>

      <>
        {openRight && sideNav === "Services" ? (
          <div className="all-follow" onClick={() => setShowDrop(false)}>
            <div className="all-follow-head-box">
              <div className="all-follow-head-title">Partners You Follow</div>
              <div
                className="all-follow-head-box-img-box"
                onClick={() => setOpenRight(false)}
                style={{ cursor: "pointer" }}
              >
                <img className="all-follow-head-img" src={closepop} alt="" />
              </div>
            </div>
            <div className="scrollable-follow">
              <div className="follow-current">
                <div className="follow-current-head">Currently Selected</div>
                <div
                  className="each-follow"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="follow-details">
                    <div className="follow-icon-box">
                      <img
                        className="follow-icon"
                        src={currentFollow.bankerDetails.profilePicURL}
                        alt=""
                      />
                    </div>
                    <div className="follow-name-box">
                      <div className="follow-pop-name">
                        {currentFollow.bankerDetails.displayName}
                      </div>
                      <div className="follow-pop-time">
                        Following&nbsp;Since&nbsp;
                        <span>{formatDate(currentFollow.timeStamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="follow-button-box">
                    <div className="unfollow-btn">Unfollow</div>
                    <div className="profilebtn">Profile</div>
                  </div>
                </div>
              </div>
              <div className="follow-current">
                <div className="follow-current-head">Other</div>
                <div>
                  {followList
                    ?.filter((item) => item !== currentFollow)
                    ?.map((each, i) => (
                      <div
                        className="each-follow"
                        onClick={() => setcurrentFollow(each)}
                      >
                        <div className="follow-details">
                          <div className="follow-icon-box">
                            <img
                              className="follow-icon"
                              src={each.bankerDetails.profilePicURL}
                              alt=""
                            />
                          </div>
                          <div className="follow-name-box">
                            <div className="follow-pop-name">
                              {each.bankerDetails.displayName}
                            </div>
                            <div className="follow-pop-time">
                              Following&nbsp;Since&nbsp;
                              <span>{formatDate(each.timeStamp)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="follow-button-box">
                          <div className="unfollow-btn">Unfollow</div>
                          <div className="profilebtn">Profile</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
